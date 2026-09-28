import type { Block, Theme } from '../types/blocks-schema';

/**
 * The starting point for a new hand-built or AI-imported trip guide: the
 * three blocks every guide needs, ready to be filled in. `status` defaults
 * to 'preview' so a freshly created config never accidentally goes live
 * before someone's actually reviewed it.
 */
export const tripPresetBlocks: Block[] = [
  { type: 'schedule', id: 'schedule', title: 'Schedule', events: [] },
  { type: 'contacts', id: 'contacts', title: 'Contacts', contacts: [] },
  { type: 'updates', id: 'updates', title: 'Updates' },
];

export const tripPresetStatus = 'preview' as const;

// Matches the default theme documented in CLAUDE.md's "Create Firestore
// Config" example — a sane, brand-neutral starting point, always meant to
// be overridden with the client's real colors before sending anything to
// a prospect. scripts/create-client.js keeps its own plain-JS copy of this
// (scripts can't import TS) — keep both in sync by hand.
export const DEFAULT_THEME: Theme = {
  colors: {
    primary: '#0F766E',
    secondary: '#22C55E',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  fonts: { heading: 'Inter', body: 'Inter' },
};
