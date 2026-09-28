import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import type { Theme, UpdatesBlock } from '../../../../types/blocks-schema';

const theme: Theme = {
  colors: { primary: '#0F766E', secondary: '#22C55E', background: '#fff', surface: '#f9fafb', text: '#1A1A1A', textSecondary: '#6B7280' },
  fonts: { heading: 'Inter', body: 'Inter' },
};

const block: UpdatesBlock = { type: 'updates', id: 'updates', title: 'Updates' };

// onSnapshot's success/error callback is swapped per test via this ref.
let snapshotHandlers: { onNext?: (snap: unknown) => void; onError?: (err: Error) => void } = {};

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn((_q, onNext, onError) => {
    snapshotHandlers = { onNext, onError };
    return vi.fn(); // unsubscribe
  }),
  Timestamp: class {
    constructor(public seconds: number) {}
    toDate() { return new Date(this.seconds * 1000); }
  },
}));

vi.mock('../../../../lib/firebase', () => ({ db: {} }));

describe('UpdatesBlockView', () => {
  beforeEach(() => {
    snapshotHandlers = {};
  });

  it('shows an empty state when there are zero updates', async () => {
    const { UpdatesBlockView } = await import('./UpdatesBlockView');
    render(<UpdatesBlockView block={block} theme={theme} clientId="test-trip" />);
    act(() => snapshotHandlers.onNext!({ docs: [] }));
    await waitFor(() => expect(screen.getByText(/no updates yet/i)).toBeInTheDocument());
  });

  it('renders real update messages from a snapshot', async () => {
    const { UpdatesBlockView } = await import('./UpdatesBlockView');
    render(<UpdatesBlockView block={block} theme={theme} clientId="test-trip" />);
    act(() =>
      snapshotHandlers.onNext!({
        docs: [{ id: '1', data: () => ({ message: 'Dinner moved to 8pm', postedAt: null }) }],
      })
    );
    await waitFor(() => expect(screen.getByText('Dinner moved to 8pm')).toBeInTheDocument());
  });

  it('shows a "last saved version" banner on a listener error, without going blank', async () => {
    const { UpdatesBlockView } = await import('./UpdatesBlockView');
    render(<UpdatesBlockView block={block} theme={theme} clientId="test-trip" />);
    act(() => snapshotHandlers.onError!(new Error('permission-denied')));
    await waitFor(() => expect(screen.getByText(/showing the last saved version/i)).toBeInTheDocument());
  });
});
