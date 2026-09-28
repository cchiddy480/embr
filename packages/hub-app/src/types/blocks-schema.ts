import { z } from 'zod';

/**
 * The single source of truth for a guide's shape. Every guide is a
 * TripConfig — validated here, not hand-rolled elsewhere.
 */

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'must be a 6-digit hex color, e.g. #0F766E');

export const ThemeSchema = z.object({
  colors: z.object({
    primary: hexColor,
    secondary: hexColor,
    background: hexColor,
    surface: hexColor,
    text: hexColor,
    textSecondary: hexColor,
    border: hexColor.optional(),
  }),
  fonts: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
  }),
});
export type Theme = z.infer<typeof ThemeSchema>;

export const ScheduleEventSchema = z.object({
  id: z.string().min(1),
  day: z.string().min(1),
  time: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  mapUrl: z.string().url().optional(),
  timeApprox: z.boolean().optional(),
  timezoneNote: z.string().optional(),
});
export type ScheduleEvent = z.infer<typeof ScheduleEventSchema>;

export const ScheduleBlockSchema = z.object({
  type: z.literal('schedule'),
  id: z.string().min(1),
  title: z.string().min(1),
  events: z.array(ScheduleEventSchema),
});

export const VenueSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

export const InfoBlockSchema = z.object({
  type: z.literal('info'),
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  venue: VenueSchema.optional(),
});

export const ContactSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional(),
});
export type Contact = z.infer<typeof ContactSchema>;

export const ContactsBlockSchema = z.object({
  type: z.literal('contacts'),
  id: z.string().min(1),
  title: z.string().min(1),
  contacts: z.array(ContactSchema),
});

// Live content (the updates subcollection), never stored in the config doc.
export const UpdatesBlockSchema = z.object({
  type: z.literal('updates'),
  id: z.string().min(1),
  title: z.string().min(1),
});

export const BlockSchema = z.discriminatedUnion('type', [
  ScheduleBlockSchema,
  InfoBlockSchema,
  ContactsBlockSchema,
  UpdatesBlockSchema,
]);
export type Block = z.infer<typeof BlockSchema>;
export type ScheduleBlock = z.infer<typeof ScheduleBlockSchema>;
export type InfoBlock = z.infer<typeof InfoBlockSchema>;
export type ContactsBlock = z.infer<typeof ContactsBlockSchema>;
export type UpdatesBlock = z.infer<typeof UpdatesBlockSchema>;

export const TripConfigSchema = z.object({
  clientId: z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, numbers and hyphens only'),
  name: z.string().min(1).max(50),
  expiry: z.string().datetime({ message: 'must be an ISO 8601 datetime, e.g. 2026-10-01T00:00:00Z' }),
  status: z.enum(['preview', 'active', 'expired']).default('preview'),
  theme: ThemeSchema,
  blocks: z.array(BlockSchema).min(1, 'a guide needs at least one block'),
  // Set by scripts/prospect-demo.js on an AI-generated draft sent to a real
  // prospect before they've paid. BlockRenderer shows a small "Preview"
  // badge when true — not a full Phase D self-serve preview flow, just an
  // honest visual signal that this isn't the final paid guide.
  watermark: z.boolean().optional(),
});
export type TripConfig = z.infer<typeof TripConfigSchema>;

/** True if the parsed JSON looks like a Phase B TripConfig (has a `blocks` array) rather than a legacy template-based ClientConfig. */
export function isTripConfigShape(value: unknown): value is { blocks: unknown[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'blocks' in value &&
    Array.isArray((value as { blocks: unknown }).blocks)
  );
}
