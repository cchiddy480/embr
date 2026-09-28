import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { TripConfigSchema, type TripConfig } from '../types/blocks-schema';
import { DEFAULT_THEME } from '../presets/trip';
import { EMIT_TRIP_GUIDE_TOOL_NAME, TRIP_GUIDE_JSON_SCHEMA, IMPORT_SYSTEM_PROMPT } from './import-prompt';
import { safeFetchUrl, UnsafeUrlError } from './safeFetchUrl';

const MODEL = 'claude-sonnet-5';
const MAX_ATTEMPTS = 3;
const MIN_CHARS = 20;
const MAX_CHARS = 60_000; // ~15k tokens
const MAX_PDF_BYTES = 3 * 1024 * 1024; // 3 MB — base64 inflation + Vercel's ~4.5 MB body limit

export type ImportInput =
  | { type: 'text'; content: string }
  | { type: 'url'; url: string }
  | { type: 'pdf'; buffer: Buffer; filename?: string };

export type ImportErrorCode =
  | 'NOT_AN_ITINERARY'
  | 'REFUSED'
  | 'VALIDATION_FAILED'
  | 'INPUT_TOO_SHORT'
  | 'INPUT_TOO_LONG'
  | 'UNSAFE_URL'
  | 'FETCH_FAILED'
  | 'PDF_TOO_LARGE'
  | 'API_ERROR';

export interface ImportError {
  error: { code: ImportErrorCode; message: string };
}
export interface ImportSuccess {
  config: TripConfig;
  confidence: 'high' | 'medium' | 'low';
  warnings: string[];
}
export type ImportResult = ImportSuccess | ImportError;

// Loose runtime check on the model's tool input, before it's mapped into a
// TripConfig and validated against the real schema — defense in depth
// against a malformed tool call slipping past the JSON Schema Anthropic
// enforces server-side.
const ExtractionSchema = z.object({
  isValidItinerary: z.boolean(),
  confidence: z.enum(['high', 'medium', 'low']),
  name: z.string().optional(),
  expiry: z.string().nullable().optional(),
  events: z
    .array(
      z.object({
        day: z.string(),
        time: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        location: z.string().optional(),
        timeApprox: z.boolean().optional(),
        timezoneNote: z.string().optional(),
        inferred: z.boolean().optional(),
      })
    )
    .optional(),
  contacts: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .optional(),
  infoBody: z.string().nullable().optional(),
  venue: z.object({ name: z.string().optional(), address: z.string().optional() }).nullable().optional(),
  warnings: z.array(z.string()).optional(),
});
type Extraction = z.infer<typeof ExtractionSchema>;

function kebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripHtml(text: string): string {
  // Cheap best-effort strip for a raw HTML page fetched via the URL path —
  // not a full HTML parser, just enough to cut obvious boilerplate noise
  // (scripts/styles/tags) before handing text to Claude.
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function ingest(input: ImportInput): Promise<
  | { ok: true; text?: string; pdfBuffer?: Buffer }
  | { ok: false; error: ImportError }
> {
  if (input.type === 'text') {
    return { ok: true, text: input.content };
  }

  if (input.type === 'url') {
    try {
      const { text, contentType } = await safeFetchUrl(input.url);
      const looksHtml = contentType?.includes('html') ?? /<html/i.test(text.slice(0, 500));
      return { ok: true, text: looksHtml ? stripHtml(text) : text };
    } catch (e) {
      if (e instanceof UnsafeUrlError) {
        return { ok: false, error: { error: { code: 'UNSAFE_URL', message: e.message } } };
      }
      return { ok: false, error: { error: { code: 'FETCH_FAILED', message: e instanceof Error ? e.message : String(e) } } };
    }
  }

  // pdf
  if (input.buffer.byteLength > MAX_PDF_BYTES) {
    return { ok: false, error: { error: { code: 'PDF_TOO_LARGE', message: `PDF exceeds ${MAX_PDF_BYTES} byte cap` } } };
  }
  return { ok: true, pdfBuffer: input.buffer };
}

// The installed @anthropic-ai/sdk version's types don't export a dedicated
// document-block-param type, but the Messages API itself does support a
// `{ type: 'document', source: {...} }` content block for PDFs (see
// Anthropic's API docs) — hence the loose typing here rather than fighting
// the SDK's type surface for a real, documented API shape.
function buildUserContent(
  ingested: { text?: string; pdfBuffer?: Buffer },
  filename?: string
): string | Array<Record<string, unknown>> {
  if (ingested.pdfBuffer) {
    return [
      {
        type: 'document',
        source: { type: 'base64', media_type: 'application/pdf', data: ingested.pdfBuffer.toString('base64') },
        title: filename,
      },
      { type: 'text', text: 'Extract the itinerary from the attached PDF.' },
    ];
  }
  return ingested.text ?? '';
}

async function callExtraction(
  client: Anthropic,
  userContent: string | Array<Record<string, unknown>>,
  retryFeedback?: string
): Promise<{ ok: true; extraction: Extraction } | { ok: false; code: 'REFUSED' | 'API_ERROR'; message: string }> {
  const content = retryFeedback
    ? [
        ...(Array.isArray(userContent) ? userContent : [{ type: 'text' as const, text: userContent }]),
        { type: 'text' as const, text: `\n\n---\nYour previous extraction failed validation. Fix exactly these issues and resubmit the whole tool call:\n${retryFeedback}` },
      ]
    : userContent;

  let response: Anthropic.Message;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: IMPORT_SYSTEM_PROMPT,
      tools: [
        {
          name: EMIT_TRIP_GUIDE_TOOL_NAME,
          description: 'Emit the structured extraction of the itinerary.',
          input_schema: TRIP_GUIDE_JSON_SCHEMA as unknown as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: 'tool', name: EMIT_TRIP_GUIDE_TOOL_NAME },
      messages: [{ role: 'user', content: content as Anthropic.MessageParam['content'] }],
    });
  } catch (e) {
    return { ok: false, code: 'API_ERROR', message: e instanceof Error ? e.message : String(e) };
  }

  // Note: this SDK/API version's `stop_reason` union doesn't include a
  // documented "refusal" value, so the only reliable refusal signal is the
  // absence of the tool call we forced via tool_choice below.
  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use' && block.name === EMIT_TRIP_GUIDE_TOOL_NAME
  );
  if (!toolUse) {
    return { ok: false, code: 'REFUSED', message: 'The model did not return a structured extraction.' };
  }

  const parsed = ExtractionSchema.safeParse(toolUse.input);
  if (!parsed.success) {
    // A malformed tool call despite the JSON Schema constraint — treat as
    // an API-level failure, not something a same-input retry can fix.
    return { ok: false, code: 'API_ERROR', message: `Malformed tool input: ${parsed.error.message}` };
  }
  return { ok: true, extraction: parsed.data };
}

function assembleConfig(extraction: Extraction, clientIdHint?: string): { config: unknown; warnings: string[] } {
  const warnings = [...(extraction.warnings ?? [])];

  const name = extraction.name?.trim() || 'Untitled Guide';
  if (!extraction.name) warnings.push('No event name found in source — using a placeholder; set a real name before sending.');

  let expiry = extraction.expiry ?? null;
  if (!expiry) {
    expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    warnings.push('No end date found in source — defaulted to 30 days from now; set the real expiry before sending.');
  }

  const clientId = `${kebabCase(clientIdHint || name)}-${Date.now().toString(36)}`;

  const events = (extraction.events ?? []).map((e, i) => ({
    id: `event-${i}`,
    day: e.day,
    time: e.time,
    title: e.title,
    description: e.description,
    location: e.location,
    timeApprox: e.timeApprox,
    timezoneNote: e.timezoneNote,
  }));
  if ((extraction.events ?? []).some((e) => e.inferred)) {
    warnings.push('Some schedule entries were inferred rather than stated explicitly — review before sending.');
  }

  const contacts = (extraction.contacts ?? []).map((c, i) => ({
    id: `contact-${i}`,
    name: c.name,
    role: c.role,
    phone: c.phone,
    whatsapp: c.whatsapp,
    email: c.email && c.email.includes('@') ? c.email : undefined,
  }));

  const blocks: unknown[] = [{ type: 'schedule', id: 'schedule', title: 'Schedule', events }];

  if (extraction.infoBody || extraction.venue?.name) {
    blocks.push({
      type: 'info',
      id: 'info',
      title: 'Info',
      body: extraction.infoBody || 'See schedule for details.',
      venue: extraction.venue?.name && extraction.venue?.address ? extraction.venue : undefined,
    });
  }

  blocks.push({ type: 'contacts', id: 'contacts', title: 'Contacts', contacts });
  blocks.push({ type: 'updates', id: 'updates', title: 'Updates' });

  return {
    config: {
      clientId,
      name,
      expiry,
      status: 'preview',
      theme: DEFAULT_THEME,
      blocks,
    },
    warnings,
  };
}

function formatZodIssues(error: z.ZodError): string {
  return error.issues.map((i) => `- ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n');
}

/**
 * Turns a raw itinerary (pasted text, a URL, or a PDF) into a zod-valid
 * TripConfig draft. Never sends anything to a real prospect on its own —
 * the caller (scripts/prospect-demo.js) is expected to push the result as
 * a watermarked preview and have a human review it first, per the
 * production plan's mandatory-review rule.
 */
export async function importItinerary(
  input: ImportInput,
  options: { apiKey?: string; clientIdHint?: string } = {}
): Promise<ImportResult> {
  const ingested = await ingest(input);
  if (!ingested.ok) return ingested.error;

  if (ingested.text !== undefined) {
    const trimmed = ingested.text.trim();
    if (trimmed.length < MIN_CHARS) {
      return { error: { code: 'INPUT_TOO_SHORT', message: `Input is only ${trimmed.length} characters — too short to be a real itinerary.` } };
    }
    if (trimmed.length > MAX_CHARS) {
      ingested.text = trimmed.slice(0, MAX_CHARS);
    } else {
      ingested.text = trimmed;
    }
  }

  const apiKey = options.apiKey ?? process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { error: { code: 'API_ERROR', message: 'ANTHROPIC_API_KEY is not set' } };
  }
  const client = new Anthropic({ apiKey });

  const userContent = buildUserContent(ingested, input.type === 'pdf' ? input.filename : undefined);

  let retryFeedback: string | undefined;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const result = await callExtraction(client, userContent, retryFeedback);

    if (!result.ok) {
      // Refusal/API errors never retry — a same-input retry can't fix either.
      return { error: { code: result.code, message: result.message } };
    }

    if (!result.extraction.isValidItinerary) {
      return { error: { code: 'NOT_AN_ITINERARY', message: 'The input does not appear to be an itinerary or schedule.' } };
    }

    const { config, warnings } = assembleConfig(result.extraction, options.clientIdHint);
    const validated = TripConfigSchema.safeParse(config);

    if (validated.success) {
      return { config: validated.data, confidence: result.extraction.confidence, warnings };
    }

    retryFeedback = formatZodIssues(validated.error);
    if (attempt === MAX_ATTEMPTS - 1) {
      return { error: { code: 'VALIDATION_FAILED', message: `Extraction never passed schema validation after ${MAX_ATTEMPTS} attempts:\n${retryFeedback}` } };
    }
  }

  // Unreachable — the loop above always returns.
  return { error: { code: 'VALIDATION_FAILED', message: 'Exhausted retries.' } };
}
