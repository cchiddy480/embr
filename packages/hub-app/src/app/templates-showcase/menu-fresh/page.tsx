'use client'

import React from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid, EmbrKitCard, EmbrKitCardContent } from '@embr/ui'

const theme = {
  primaryColor: '#059669',
  secondaryColor: '#10B981',
  backgroundColor: '#f0fdf4',
  surfaceColor: '#dcfce7',
  textColor: '#064e3b',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const items = [
  { name: 'Green Goddess Bowl', price: '$14', tag: 'Vegan', emoji: '🥗' },
  { name: 'Açai Power Bowl', price: '$12', tag: 'Organic', emoji: '🍓' },
  { name: 'Fresh Pressed Juice', price: '$8', tag: 'Raw', emoji: '🥤' },
  { name: 'Avocado Toast', price: '$10', tag: 'Popular', emoji: '🥑' }
]

export default function MenuFresh() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-green-50">
        <header className="bg-white border-b border-green-200">
          <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-green-900">Fresh & Green</h1>
              <p className="text-sm text-green-700">Plant-Based Kitchen</p>
            </div>
            <Link href="/templates-showcase" className="text-sm px-4 py-2 border border-green-300 hover:bg-green-50 rounded-lg">
              Back
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">100% Plant-Based</h2>
            <p className="text-xl text-green-100">Fresh, organic, and locally sourced</p>
          </div>

          <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4">
            {items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4 text-center">{item.emoji}</div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
                  {item.tag}
                </span>
                <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-2xl font-bold text-green-600">{item.price}</p>
              </div>
            ))}
          </EmbrKitGrid>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
