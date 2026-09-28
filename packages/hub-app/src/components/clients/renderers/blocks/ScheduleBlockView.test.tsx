import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScheduleBlockView } from './ScheduleBlockView';
import type { ScheduleBlock, Theme } from '../../../../types/blocks-schema';

const theme: Theme = {
  colors: { primary: '#0F766E', secondary: '#22C55E', background: '#fff', surface: '#f9fafb', text: '#1A1A1A', textSecondary: '#6B7280' },
  fonts: { heading: 'Inter', body: 'Inter' },
};

describe('ScheduleBlockView', () => {
  it('renders an empty state when there are no events', () => {
    const block: ScheduleBlock = { type: 'schedule', id: 'schedule', title: 'Schedule', events: [] };
    render(<ScheduleBlockView block={block} theme={theme} />);
    expect(screen.getByText(/no schedule added yet/i)).toBeInTheDocument();
  });

  it('renders real event content, grouped by day, in authored order', () => {
    const block: ScheduleBlock = {
      type: 'schedule',
      id: 'schedule',
      title: 'Schedule',
      events: [
        { id: 'a', day: 'Day 1', time: '9am', title: 'Arrival', location: 'Lobby' },
        { id: 'b', day: 'Day 1', time: '7pm', title: 'Dinner' },
        { id: 'c', day: 'Day 2', title: 'Departure' },
      ],
    };
    render(<ScheduleBlockView block={block} theme={theme} />);
    expect(screen.getByText('Arrival')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(screen.getByText('Departure')).toBeInTheDocument();
    expect(screen.getByText('Lobby', { exact: false })).toBeInTheDocument();
  });

  it('renders a Directions link when mapUrl is present', () => {
    const block: ScheduleBlock = {
      type: 'schedule',
      id: 'schedule',
      title: 'Schedule',
      events: [{ id: 'a', day: 'Day 1', title: 'Venue tour', mapUrl: 'https://maps.example/venue' }],
    };
    render(<ScheduleBlockView block={block} theme={theme} />);
    const link = screen.getByRole('link', { name: /directions/i });
    expect(link).toHaveAttribute('href', 'https://maps.example/venue');
  });
});
