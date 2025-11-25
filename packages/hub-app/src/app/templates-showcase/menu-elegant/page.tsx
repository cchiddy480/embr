'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid } from '@embr/ui'

const theme = {
  primaryColor: '#1F2937',
  secondaryColor: '#D4AF37',
  backgroundColor: '#0a0a0a',
  surfaceColor: '#1a1a1a',
  textColor: '#f5f5f5',
  textSecondaryColor: '#a3a3a3',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const menuItems = [
  { name: 'Filet Mignon', price: '$45', description: 'Prime cut, truffle butter, asparagus' },
  { name: 'Wild Salmon', price: '$38', description: 'Herb crust, lemon beurre blanc, vegetables' },
  { name: 'Lobster Risotto', price: '$42', description: 'Creamy arborio, fresh lobster, parmesan' },
  { name: 'Lamb Chops', price: '$48', description: 'Herb crusted, mint jus, roasted potatoes' }
]

export default function MenuElegant() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-serif mb-2" style={{ color: '#D4AF37' }}>LUMIÈRE</div>
                <p className="text-sm text-gray-400">Fine Dining Experience</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 border border-gray-700 hover:bg-gray-900">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif mb-4">Dinner Menu</h2>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: '#D4AF37' }} />
          </div>

          <div className="space-y-8">
            {menuItems.map((item, idx) => (
              <div key={idx} className="border-b border-gray-800 pb-8 last:border-0">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-2xl font-serif">{item.name}</h3>
                  <span className="text-xl" style={{ color: '#D4AF37' }}>{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-gray-800 pt-12">
            <p className="text-gray-500 text-sm mb-2">Reservations</p>
            <p className="text-xl">+1 (555) 123-4567</p>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
