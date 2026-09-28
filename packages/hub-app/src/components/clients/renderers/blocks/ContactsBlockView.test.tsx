import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactsBlockView } from './ContactsBlockView';
import type { ContactsBlock, Theme } from '../../../../types/blocks-schema';

const theme: Theme = {
  colors: { primary: '#0F766E', secondary: '#22C55E', background: '#fff', surface: '#f9fafb', text: '#1A1A1A', textSecondary: '#6B7280' },
  fonts: { heading: 'Inter', body: 'Inter' },
};

describe('ContactsBlockView', () => {
  it('renders an empty state when there are no contacts', () => {
    const block: ContactsBlock = { type: 'contacts', id: 'contacts', title: 'Contacts', contacts: [] };
    render(<ContactsBlockView block={block} theme={theme} />);
    expect(screen.getByText(/no contacts added yet/i)).toBeInTheDocument();
  });

  it('renders name, role, and correct tel:/mailto:/wa.me links per method', () => {
    const block: ContactsBlock = {
      type: 'contacts',
      id: 'contacts',
      title: 'Contacts',
      contacts: [
        { id: 'jane', name: 'Jane Smith', role: 'Organiser', phone: '+441234567890', whatsapp: '441234567891', email: 'jane@example.com' },
      ],
    };
    render(<ContactsBlockView block={block} theme={theme} />);
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Organiser/)).toBeInTheDocument();
    const phoneLink = screen.getByRole('link', { name: /\+441234567890/ });
    expect(phoneLink).toHaveAttribute('href', 'tel:+441234567890');
    const emailLink = screen.getByRole('link', { name: /jane@example\.com/ });
    expect(emailLink).toHaveAttribute('href', 'mailto:jane@example.com');
    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/441234567891');
  });

  it('omits a method entirely when the contact has no value for it', () => {
    const block: ContactsBlock = {
      type: 'contacts',
      id: 'contacts',
      title: 'Contacts',
      contacts: [{ id: 'venue', name: 'Venue Reception', phone: '+440000000000' }],
    };
    render(<ContactsBlockView block={block} theme={theme} />);
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });
});
