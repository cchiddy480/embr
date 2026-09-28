import { describe, it, expect, vi, beforeEach } from 'vitest';

// Controllable mock of the Anthropic client: each test pushes canned
// responses (or an error) onto `nextResponses`, consumed in order by
// successive `messages.create` calls — this is how the retry-loop tests
// simulate a first attempt failing validation and a second succeeding.
const nextResponses: Array<{ content: unknown[] } | { __throw: Error }> = [];
const createMock = vi.fn(async () => {
  const next = nextResponses.shift();
  if (!next) throw new Error('No mock response queued');
  if ('__throw' in next) throw next.__throw;
  return next;
});

vi.mock('@anthropic-ai/sdk', () => ({
  default: class MockAnthropic {
    messages = { create: createMock };
  },
}));

function toolUseResponse(input: Record<string, unknown>) {
  return { content: [{ type: 'tool_use', name: 'emit_trip_guide', input }] };
}

import { importItinerary } from './import';

describe('importItinerary', () => {
  beforeEach(() => {
    nextResponses.length = 0;
    createMock.mockClear();
  });

  it('rejects input that is too short without calling the API', async () => {
    const result = await importItinerary({ type: 'text', content: 'hi' }, { apiKey: 'test-key' });
    expect('error' in result && result.error.code).toBe('INPUT_TOO_SHORT');
    expect(createMock).not.toHaveBeenCalled();
  });

  it('returns NOT_AN_ITINERARY when the model says isValidItinerary: false', async () => {
    nextResponses.push(toolUseResponse({ isValidItinerary: false, confidence: 'high' }));
    const result = await importItinerary(
      { type: 'text', content: 'This is definitely not an itinerary, just some unrelated filler text.' },
      { apiKey: 'test-key' }
    );
    expect('error' in result && result.error.code).toBe('NOT_AN_ITINERARY');
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it('returns REFUSED when no matching tool_use block comes back', async () => {
    nextResponses.push({ content: [{ type: 'text', text: 'I cannot help with that.' }] });
    const result = await importItinerary(
      { type: 'text', content: 'Some perfectly reasonable itinerary text goes here for testing.' },
      { apiKey: 'test-key' }
    );
    expect('error' in result && result.error.code).toBe('REFUSED');
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it('assembles a valid TripConfig from a clean extraction, with confidence and warnings passed through', async () => {
    nextResponses.push(
      toolUseResponse({
        isValidItinerary: true,
        confidence: 'high',
        name: 'Smith Wedding',
        expiry: '2026-12-01T00:00:00Z',
        events: [{ day: 'Saturday', time: '2pm', title: 'Ceremony', location: 'The Barn' }],
        contacts: [{ name: 'Jane', phone: '+441234567890' }],
        warnings: ['double check the venue spelling'],
      })
    );
    const result = await importItinerary(
      { type: 'text', content: 'Smith Wedding, Saturday 2pm ceremony at The Barn. Contact Jane +441234567890.' },
      { apiKey: 'test-key' }
    );
    expect('config' in result).toBe(true);
    if ('config' in result) {
      expect(result.config.name).toBe('Smith Wedding');
      expect(result.confidence).toBe('high');
      expect(result.warnings).toContain('double check the venue spelling');
      const schedule = result.config.blocks.find((b) => b.type === 'schedule');
      expect(schedule?.type === 'schedule' && schedule.events[0].title).toBe('Ceremony');
      const contacts = result.config.blocks.find((b) => b.type === 'contacts');
      expect(contacts?.type === 'contacts' && contacts.contacts[0].name).toBe('Jane');
    }
  });

  it('defaults a missing expiry to +30 days and adds a warning, rather than failing', async () => {
    nextResponses.push(
      toolUseResponse({
        isValidItinerary: true,
        confidence: 'medium',
        name: 'Untitled Trip',
        expiry: null,
        events: [{ day: 'Day 1', title: 'Arrival' }],
      })
    );
    const result = await importItinerary({ type: 'text', content: 'Day 1: arrival, no other details given at all really.' }, { apiKey: 'test-key' });
    expect('config' in result).toBe(true);
    if ('config' in result) {
      expect(new Date(result.config.expiry).getTime()).toBeGreaterThan(Date.now());
      expect(result.warnings.some((w) => w.includes('end date'))).toBe(true);
    }
  });

  it('retries once with zod issues on validation failure, then succeeds', async () => {
    nextResponses.push(
      toolUseResponse({
        isValidItinerary: true,
        confidence: 'medium',
        name: 'Trip',
        expiry: 'not-a-real-date', // fails TripConfigSchema's ISO datetime check
        events: [{ day: 'Day 1', title: 'Thing' }],
      })
    );
    nextResponses.push(
      toolUseResponse({
        isValidItinerary: true,
        confidence: 'medium',
        name: 'Trip',
        expiry: '2026-12-01T00:00:00Z',
        events: [{ day: 'Day 1', title: 'Thing' }],
      })
    );
    const result = await importItinerary({ type: 'text', content: 'Day 1: thing happens, some more filler text here.' }, { apiKey: 'test-key' });
    expect(createMock).toHaveBeenCalledTimes(2);
    expect('config' in result).toBe(true);
    // second call's messages should include the retry feedback
    const secondCallArgs = createMock.mock.calls[1][0];
    const secondUserMessage = JSON.stringify(secondCallArgs.messages);
    expect(secondUserMessage).toContain('failed validation');
  });

  it('returns VALIDATION_FAILED after exhausting all retries', async () => {
    for (let i = 0; i < 3; i++) {
      nextResponses.push(
        toolUseResponse({
          isValidItinerary: true,
          confidence: 'low',
          name: 'Trip',
          expiry: 'still-not-a-date',
          events: [{ day: 'Day 1', title: 'Thing' }],
        })
      );
    }
    const result = await importItinerary({ type: 'text', content: 'Day 1: thing happens, some more filler text here.' }, { apiKey: 'test-key' });
    expect(createMock).toHaveBeenCalledTimes(3);
    expect('error' in result && result.error.code).toBe('VALIDATION_FAILED');
  });

  it('returns API_ERROR without an API key and never calls the SDK', async () => {
    const prevKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    try {
      const result = await importItinerary({ type: 'text', content: 'A perfectly normal itinerary with enough text in it.' }, {});
      expect('error' in result && result.error.code).toBe('API_ERROR');
      expect(createMock).not.toHaveBeenCalled();
    } finally {
      if (prevKey !== undefined) process.env.ANTHROPIC_API_KEY = prevKey;
    }
  });
});
