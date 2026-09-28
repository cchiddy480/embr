import { describe, it, expect } from 'vitest';
import { TripConfigSchema, isTripConfigShape } from './blocks-schema';

const validConfig = {
  clientId: 'smith-wedding-2026',
  name: 'Smith Wedding',
  expiry: '2026-12-01T00:00:00Z',
  status: 'preview',
  theme: {
    colors: {
      primary: '#0F766E',
      secondary: '#22C55E',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#1A1A1A',
      textSecondary: '#6B7280',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
  },
  blocks: [
    {
      type: 'schedule',
      id: 'schedule',
      title: 'Schedule',
      events: [
        { id: 'ceremony', day: 'Saturday', time: '2pm', title: 'Ceremony', location: 'The Barn' },
      ],
    },
    { type: 'contacts', id: 'contacts', title: 'Contacts', contacts: [] },
    { type: 'updates', id: 'updates', title: 'Updates' },
  ],
};

describe('isTripConfigShape', () => {
  it('is true for anything with a blocks array', () => {
    expect(isTripConfigShape({ blocks: [] })).toBe(true);
  });
  it('is false for a legacy config with no blocks field', () => {
    expect(isTripConfigShape({ clientId: 'x', navigation: [] })).toBe(false);
  });
  it('is false for non-objects', () => {
    expect(isTripConfigShape(null)).toBe(false);
    expect(isTripConfigShape('blocks')).toBe(false);
  });
});

describe('TripConfigSchema', () => {
  it('accepts a fully valid config', () => {
    const result = TripConfigSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid clientId (uppercase/spaces)', () => {
    const result = TripConfigSchema.safeParse({ ...validConfig, clientId: 'Smith Wedding' });
    expect(result.success).toBe(false);
  });

  it('rejects a non-hex color', () => {
    const bad = { ...validConfig, theme: { ...validConfig.theme, colors: { ...validConfig.theme.colors, primary: 'teal' } } };
    const result = TripConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it('rejects an empty blocks array', () => {
    const result = TripConfigSchema.safeParse({ ...validConfig, blocks: [] });
    expect(result.success).toBe(false);
  });

  it('rejects a block with an unknown type', () => {
    const bad = { ...validConfig, blocks: [{ type: 'faq', id: 'faq', title: 'FAQ' }] };
    const result = TripConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it('rejects a non-ISO expiry', () => {
    const result = TripConfigSchema.safeParse({ ...validConfig, expiry: '01/12/2026' });
    expect(result.success).toBe(false);
  });

  it('defaults status to preview when omitted', () => {
    const { status: _status, ...rest } = validConfig;
    const result = TripConfigSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.status).toBe('preview');
  });

  it('strips unknown fields (e.g. an authoring-time accessCode)', () => {
    const result = TripConfigSchema.safeParse({ ...validConfig, accessCode: 'SMITH2026' });
    expect(result.success).toBe(true);
    if (result.success) expect((result.data as Record<string, unknown>).accessCode).toBeUndefined();
  });

  it('rejects a contact with an invalid email', () => {
    const bad = {
      ...validConfig,
      blocks: [
        ...validConfig.blocks.slice(0, 1),
        { type: 'contacts', id: 'contacts', title: 'Contacts', contacts: [{ id: 'a', name: 'A', email: 'not-an-email' }] },
        ...validConfig.blocks.slice(2),
      ],
    };
    const result = TripConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });
});
