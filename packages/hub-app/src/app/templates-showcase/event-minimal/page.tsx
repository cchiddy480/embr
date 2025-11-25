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
  {
    time: '08:30',
    title: 'Registration & Welcome',
    location: 'Main Lobby',
    description: 'Check-in opens. Collect badge and conference materials.',
    speaker: null
  },
  {
    time: '09:30',
    title: 'Opening Keynote: Design at Scale',
    location: 'Grand Auditorium',
    highlight: true,
    description: 'How enterprise teams build and maintain design systems that serve millions of users.',
    speaker: 'Jessica Wu, VP Design at Figma'
  },
  {
    time: '10:45',
    title: 'Workshop: Advanced Prototyping Techniques',
    location: 'Workshop Room A',
    description: 'Hands-on session covering interactive prototyping with real-world constraints.',
    speaker: 'Marcus Johnson, Lead Product Designer at Stripe'
  },
  {
    time: '12:00',
    title: 'Networking Lunch',
    location: 'Garden Terrace',
    description: 'Catered lunch with time to connect with speakers and attendees.',
    speaker: null
  },
  {
    time: '13:30',
    title: 'Panel: The Future of Digital Product Design',
    location: 'Grand Auditorium',
    highlight: true,
    description: 'Industry leaders discuss emerging trends, AI tools, and the evolving role of designers.',
    speaker: 'Panel: Sarah Lee (Adobe), David Chen (Airbnb), Rachel Park (Google)'
  },
  {
    time: '15:00',
    title: 'Coffee Break & Networking',
    location: 'Exhibition Hall',
    description: 'Refreshments and sponsor demos.',
    speaker: null
  },
  {
    time: '15:30',
    title: 'Workshop: Accessibility Best Practices',
    location: 'Workshop Room B',
    description: 'Building inclusive digital experiences with practical guidelines and tools.',
    speaker: 'Nina Patel, Accessibility Lead at Microsoft'
  },
  {
    time: '17:00',
    title: 'Closing Keynote & Awards',
    location: 'Grand Auditorium',
    highlight: true,
    description: 'Celebrating innovation and announcing the Design Excellence Award winners.',
    speaker: 'Conference Organizers'
  },
  {
    time: '18:00',
    title: 'After Party',
    location: 'Rooftop Lounge',
    description: 'Drinks and music to close out the day.',
    speaker: null
  }
]

export default function EventMinimal() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        <header className="border-b border-slate-200 sticky top-0 bg-white z-50">
          <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">DESIGN CONFERENCE 2025</h1>
              <p className="text-sm text-slate-600 mt-1 font-medium">Saturday, March 15 • San Francisco</p>
            </div>
            <Link href="/templates-showcase" className="text-sm px-5 py-2 border border-slate-300 hover:bg-slate-50 font-medium">
              Back
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-20">
          {/* Event Header */}
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">Schedule</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              A full day of talks, workshops, and networking for design professionals building the future of digital products.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-0 border-l-2 border-slate-200 ml-6">
            {schedule.map((item, idx) => (
              <div key={idx} className="relative pl-10 pb-16 last:pb-0">
                <div className={`absolute left-0 w-4 h-4 transform -translate-x-[9px] border-2 border-white ${
                  item.highlight ? 'bg-slate-900 scale-125' : 'bg-slate-400'
                }`} />

                <div className="text-sm font-mono text-slate-500 mb-2 tracking-wide">{item.time}</div>

                <h3 className={`text-2xl mb-2 ${item.highlight ? 'font-bold' : 'font-semibold'}`}>
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  {item.location}
                </div>

                <p className="text-slate-700 mb-3 leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {item.speaker && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="text-slate-500">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>
                    <span className="font-medium text-slate-900">{item.speaker}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Event Details */}
          <div className="mt-24 pt-16 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">Venue</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Design Center SF<br />
                  123 Market Street<br />
                  San Francisco, CA 94103
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">Date & Time</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Saturday, March 15, 2025<br />
                  8:30 AM - 8:00 PM<br />
                  Doors open at 8:00 AM
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">Contact</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  hello@designconf.com<br />
                  (415) 555-0123<br />
                  <span className="font-semibold text-slate-900">Limited seats available</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-12 mt-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-xl font-bold mb-1">DESIGN CONFERENCE 2025</h2>
                <p className="text-sm text-slate-600">Building better digital experiences together</p>
              </div>
              <div className="flex gap-8 text-sm text-slate-600">
                <a href="#" className="hover:text-slate-900">Schedule</a>
                <a href="#" className="hover:text-slate-900">Speakers</a>
                <a href="#" className="hover:text-slate-900">Venue</a>
                <a href="#" className="hover:text-slate-900">Tickets</a>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-8 text-center">© 2025 Design Conference. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
