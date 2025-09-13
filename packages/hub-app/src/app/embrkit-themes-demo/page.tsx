'use client'

import React from 'react'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitButton, EmbrKitCard, EmbrKitBadge, EmbrKitGrid, EmbrKitInput } from '@embr/ui'

const themes = [
  {
    name: 'Light Green',
    colors: { primary: '#3B6A4C', secondary: '#D98C65', background: '#FDF9F0', surface: '#F8F4E9', text: '#2D3748', textSecondary: '#4A5568' }
  },
  {
    name: 'Dark Teal',
    colors: { primary: '#0F766E', secondary: '#38F9E4', background: '#101926', surface: '#22304a', text: '#ffffff', textSecondary: '#D1D5DB' }
  },
  {
    name: 'High Contrast',
    colors: { primary: '#111111', secondary: '#555555', background: '#ffffff', surface: '#ffffff', text: '#111111', textSecondary: '#333333' }
  }
]

export default function Page() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {themes.map((t) => (
          <section key={t.name} className="rounded-xl border border-gray-200/20 p-6">
            <h2 className="text-xl font-semibold mb-4">{t.name}</h2>
            <EmbrKitProvider initialTheme={{
              primaryColor: t.colors.primary,
              secondaryColor: t.colors.secondary,
              backgroundColor: t.colors.background,
              surfaceColor: t.colors.surface,
              textColor: t.colors.text,
              textSecondaryColor: t.colors.textSecondary,
              headingFontFamily: 'Inter',
              fontFamily: 'Inter'
            }}>
              <EmbrKitContainer size="lg">
                <EmbrKitGrid cols={2} gap={4} className="md:grid-cols-4">
                  <EmbrKitButton>Primary</EmbrKitButton>
                  <EmbrKitButton variant="secondary">Secondary</EmbrKitButton>
                  <EmbrKitBadge>Badge</EmbrKitBadge>
                  <EmbrKitCard>Card</EmbrKitCard>
                </EmbrKitGrid>
                <div className="mt-6">
                  <EmbrKitInput label="Input" placeholder="Type here..." />
                </div>
              </EmbrKitContainer>
            </EmbrKitProvider>
          </section>
        ))}
      </div>
    </div>
  )
}



