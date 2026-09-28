import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { BlockRenderer } from './BlockRenderer';
import type { TripConfig } from '../../../types/blocks-schema';

const theme: TripConfig['theme'] = {
  colors: { primary: '#0F766E', secondary: '#22C55E', background: '#fff', surface: '#f9fafb', text: '#1A1A1A', textSecondary: '#6B7280' },
  fonts: { heading: 'Inter', body: 'Inter' },
};

const config: TripConfig = {
  clientId: 'test-trip',
  name: 'Orchard House Weekend',
  expiry: '2099-01-01T00:00:00Z',
  status: 'active',
  theme,
  blocks: [
    { type: 'schedule', id: 'schedule', title: 'Today', events: [{ id: 'a', day: 'Saturday', title: 'Welcome drinks' }] },
    { type: 'info', id: 'info', title: 'Info', body: 'Useful information for guests.' },
  ],
};

describe('BlockRenderer', () => {
  it('renders the guide name and the first block by default', () => {
    render(<BlockRenderer config={config} />);
    expect(screen.getByRole('heading', { name: 'Orchard House Weekend' })).toBeInTheDocument();
    expect(screen.getByText('Welcome drinks')).toBeInTheDocument();
  });

  it('switches blocks when a nav tab is clicked, in both the desktop and mobile nav', () => {
    render(<BlockRenderer config={config} />);

    const [desktopNav] = screen.getAllByRole('tablist', { name: /guide sections/i });
    fireEvent.click(within(desktopNav).getByRole('tab', { name: 'Info' }));

    expect(screen.getByText('Useful information for guests.')).toBeInTheDocument();
    expect(screen.queryByText('Welcome drinks')).not.toBeInTheDocument();

    const allInfoTabs = screen.getAllByRole('tab', { name: 'Info' });
    expect(allInfoTabs).toHaveLength(2); // one in the desktop header nav, one in the mobile bottom nav
    allInfoTabs.forEach((tab) => expect(tab).toHaveAttribute('aria-selected', 'true'));
  });

  it('shows the Preview badge only when the config is watermarked', () => {
    render(<BlockRenderer config={{ ...config, watermark: true }} />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('hides navigation entirely for a single-block guide', () => {
    const singleBlockConfig: TripConfig = { ...config, blocks: [config.blocks[0]] };
    render(<BlockRenderer config={singleBlockConfig} />);
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });
});
