import React from 'react';
import { GuideCard } from './GuideCard';
import type { ContactsBlock, Theme } from '../../../../types/blocks-schema';

interface ContactsBlockViewProps {
  block: ContactsBlock;
  theme: Theme;
}

export function ContactsBlockView({ block, theme }: ContactsBlockViewProps) {
  if (block.contacts.length === 0) {
    return (
      <GuideCard theme={theme} className="text-center">
        <p style={{ color: theme.colors.textSecondary }}>No contacts added yet.</p>
      </GuideCard>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {block.contacts.map((contact) => (
        <GuideCard key={contact.id} theme={theme} className="p-5">
          <p className="font-semibold" style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.heading}', serif` }}>
            {contact.name}
          </p>
          {contact.role && (
            <p className="text-sm mt-0.5" style={{ color: theme.colors.textSecondary }}>{contact.role}</p>
          )}
          {(contact.phone || contact.whatsapp || contact.email) && (
            <div className="flex flex-col gap-1 mt-3">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="min-h-[44px] flex items-center text-sm font-medium"
                  style={{ color: theme.colors.primary }}
                >
                  {contact.phone}
                </a>
              )}
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                  className="min-h-[44px] flex items-center text-sm font-medium"
                  style={{ color: theme.colors.primary }}
                >
                  WhatsApp
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="min-h-[44px] flex items-center text-sm font-medium"
                  style={{ color: theme.colors.primary }}
                >
                  {contact.email}
                </a>
              )}
            </div>
          )}
        </GuideCard>
      ))}
    </div>
  );
}
