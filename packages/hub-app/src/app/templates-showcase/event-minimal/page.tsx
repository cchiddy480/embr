'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer } from '@embr/ui'

const theme = {
  primaryColor: '#0F172A',
  secondaryColor: '#475569',
  backgroundColor: '#ffffff',
  surfaceColor: '#f8fafc',
  textColor: '#0f172a',
  textSecondaryColor: '#64748b',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'sharp' as const,
  materialStyle: 'flat' as const
}

const schedule = [
  { time: '09:00', title: 'Registration & Coffee', location: 'Lobby' },
  { time: '10:00', title: 'Opening Keynote', location: 'Main Hall', highlight: true },
  { time: '11:30', title: 'Workshop Session A', location: 'Room 201' },
  { time: '13:00', title: 'Lunch Break', location: 'Terrace' },
  { time: '14:30', title: 'Panel Discussion', location: 'Main Hall' },
  { time: '16:00', title: 'Closing Remarks', location: 'Main Hall' }
]

export default function EventMinimal() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        <header className="border-b border-slate-200 sticky top-0 bg-white z-50">
          <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">CONFERENCE</h1>
              <p className="text-sm text-slate-600">March 15, 2025</p>
            </div>
            <Link href="/templates-showcase" className="text-sm px-4 py-2 border border-slate-300 hover:bg-slate-50">
              Back
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-0 border-l-2 border-slate-200 ml-6">
            {schedule.map((item, idx) => (
              <div key={idx} className="relative pl-8 pb-12 last:pb-0">
                <div className={`absolute left-0 w-3 h-3 rounded-full transform -translate-x-[7px] ${
                  item.highlight ? 'bg-slate-900' : 'bg-slate-400'
                }`} />
                <div className="text-sm font-mono text-slate-500 mb-2">{item.time}</div>
                <h3 className={`text-xl mb-1 ${item.highlight ? 'font-bold' : 'font-semibold'}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.location}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
