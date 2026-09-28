import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoBlockView } from './InfoBlockView';
import type { InfoBlock, Theme } from '../../../../types/blocks-schema';

const theme: Theme = {
  colors: { primary: '#0F766E', secondary: '#22C55E', background: '#fff', surface: '#f9fafb', text: '#1A1A1A', textSecondary: '#6B7280' },
  fonts: { heading: 'Inter', body: 'Inter' },
};

describe('InfoBlockView', () => {
  it('renders the body text', () => {
    const block: InfoBlock = { type: 'info', id: 'info', title: 'About', body: 'Check in from 3pm.' };
    render(<InfoBlockView block={block} theme={theme} />);
    expect(screen.getByText('Check in from 3pm.')).toBeInTheDocument();
  });

  it('renders venue name, address and a maps link when a venue is present', () => {
    const block: InfoBlock = {
      type: 'info',
      id: 'info',
      title: 'About',
      body: 'Everything you need to know.',
      venue: { name: 'Willow Valley Lodge', address: '1 Valley Road, Somewhere' },
    };
    render(<InfoBlockView block={block} theme={theme} />);
    expect(screen.getByText('Willow Valley Lodge')).toBeInTheDocument();
    expect(screen.getByText('1 Valley Road, Somewhere')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /directions/i });
    expect(link.getAttribute('href')).toContain('google.com/maps/search');
    expect(link.getAttribute('href')).toContain(encodeURIComponent('1 Valley Road, Somewhere'));
  });

  it('renders no maps link when there is no venue', () => {
    const block: InfoBlock = { type: 'info', id: 'info', title: 'About', body: 'No venue here.' };
    render(<InfoBlockView block={block} theme={theme} />);
    expect(screen.queryByRole('link', { name: /directions/i })).not.toBeInTheDocument();
  });
});
