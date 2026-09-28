import React from 'react';
import { EmbrKitCard, EmbrKitQuickContact } from '@embr/ui';
import type { ContactsBlock, Contact, Theme } from '../../../../types/blocks-schema';

interface ContactsBlockViewProps {
  block: ContactsBlock;
  theme: Theme;
}

function methodsFor(contact: Contact) {
  const methods: { id: string; type: 'phone' | 'email' | 'website' | 'social'; label: string; value: string }[] = [];
  if (contact.phone) methods.push({ id: `${contact.id}-phone`, type: 'phone', label: contact.phone, value: contact.phone });
  if (contact.whatsapp) methods.push({ id: `${contact.id}-whatsapp`, type: 'social', label: 'WhatsApp', value: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` });
  if (contact.email) methods.push({ id: `${contact.id}-email`, type: 'email', label: contact.email, value: contact.email });
  return methods;
}

export function ContactsBlockView({ block, theme }: ContactsBlockViewProps) {
  if (block.contacts.length === 0) {
    return (
      <EmbrKitCard className="p-8 text-center">
        <p style={{ color: theme.colors.textSecondary }}>No contacts added yet.</p>
      </EmbrKitCard>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {block.contacts.map((contact) => (
        <EmbrKitCard key={contact.id} className="p-5">
          <EmbrKitQuickContact
            title={contact.role ? `${contact.name} — ${contact.role}` : contact.name}
            methods={methodsFor(contact)}
          />
        </EmbrKitCard>
      ))}
    </div>
  );
}
