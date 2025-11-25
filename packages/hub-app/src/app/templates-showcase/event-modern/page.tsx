'use client'

import React from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer } from '@embr/ui'

const theme = {
  primaryColor: '#0EA5E9',
  secondaryColor: '#06B6D4',
  backgroundColor: '#f0f9ff',
  surfaceColor: '#e0f2fe',
  textColor: '#0c4a6e',
  textSecondaryColor: '#64748b',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'glass' as const
}

const events = [
  { time: '09:00', title: 'Registration Opens', track: 'Main' },
  { time: '10:00', title: 'Keynote: Future of Tech', track: 'Main', featured: true },
  { time: '11:30', title: 'AI Workshop', track: 'Track A' },
  { time: '11:30', title: 'Design Systems', track: 'Track B' },
  { time: '13:00', title: 'Networking Lunch', track: 'Main' },
  { time: '14:30', title: 'Panel Discussion', track: 'Main' }
]

export default function EventModern() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
        <header className="bg-white/80 backdrop-blur border-b border-sky-200 sticky top-0">
          <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                TechSummit 2025
              </h1>
              <p className="text-sm text-sky-700">March 15-16 • Virtual Event</p>
            </div>
            <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-white border border-sky-300 hover:bg-sky-50 rounded-lg">
              Back
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12">
          <div className="space-y-4">
            {events.map((event, idx) => (
              <div key={idx} className={`bg-white/80 backdrop-blur rounded-2xl p-6 flex items-start gap-6 hover:shadow-lg transition-shadow ${
                event.featured ? 'border-2 border-sky-400' : ''
              }`}>
                <div className="text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-sky-600">{event.time.split(':')[0]}</div>
                  <div className="text-sm text-sky-600">{event.time.split(':')[1]}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                  <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
                    {event.track}
                  </span>
                </div>
                {event.featured && (
                  <span className="px-3 py-1 bg-sky-600 text-white text-xs font-bold rounded-full">
                    FEATURED
                  </span>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
