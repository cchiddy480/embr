'use client'

import React from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid, EmbrKitCard, EmbrKitCardContent, EmbrKitBadge } from '@embr/ui'

const theme = {
  primaryColor: '#7C2D12',
  secondaryColor: '#EA580C',
  backgroundColor: '#fff7ed',
  surfaceColor: '#ffedd5',
  textColor: '#1a1a1a',
  textSecondaryColor: '#78350f',
  fontFamily: 'Georgia, serif',
  headingFontFamily: 'Georgia',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const schedule = [
  {
    time: '8:00 AM',
    title: 'Registration & Welcome Coffee',
    location: 'Grand Foyer',
    type: 'reception',
    description: 'Network with fellow attendees while enjoying refreshments'
  },
  {
    time: '9:00 AM',
    title: 'Opening Keynote: The Future of Innovation',
    speaker: 'Dr. Elizabeth Warren, Chief Innovation Officer',
    location: 'Main Auditorium',
    type: 'keynote',
    description: 'Discover emerging trends shaping the next decade of business'
  },
  {
    time: '10:30 AM',
    title: 'Break & Networking',
    location: 'Exhibition Hall',
    type: 'break'
  },
  {
    time: '11:00 AM',
    title: 'Panel: Leadership in Times of Change',
    speaker: 'Industry Leaders Panel',
    location: 'Conference Room A',
    type: 'panel',
    description: 'Expert perspectives on navigating disruption and building resilience'
  },
  {
    time: '12:30 PM',
    title: 'Lunch & Roundtables',
    location: 'Grand Ballroom',
    type: 'meal',
    description: 'Join topic-specific discussions over a curated lunch'
  },
  {
    time: '2:00 PM',
    title: 'Workshop: Strategic Planning for Growth',
    speaker: 'Michael Chen, Strategy Director',
    location: 'Workshop Studio',
    type: 'workshop',
    description: 'Hands-on session developing actionable growth strategies'
  },
  {
    time: '3:30 PM',
    title: 'Afternoon Break',
    location: 'Terrace Lounge',
    type: 'break'
  },
  {
    time: '4:00 PM',
    title: 'Fireside Chat: From Startup to Scale',
    speaker: 'Sarah Martinez, Founder & CEO',
    location: 'Innovation Theater',
    type: 'talk',
    description: 'An intimate conversation about building and scaling companies'
  },
  {
    time: '5:30 PM',
    title: 'Closing Remarks & Networking Reception',
    location: 'Rooftop Venue',
    type: 'reception',
    description: 'Celebrate insights gained and connections made'
  }
]

const speakers = [
  { name: 'Dr. Elizabeth Warren', title: 'Chief Innovation Officer', company: 'Global Tech Corp' },
  { name: 'Michael Chen', title: 'Strategy Director', company: 'Venture Partners' },
  { name: 'Sarah Martinez', title: 'Founder & CEO', company: 'Scale Dynamics' }
]

export default function EventClassicTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-orange-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-900 to-orange-800 text-white border-b-4 border-orange-700">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-700 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1">Leadership Summit 2025</h1>
                  <p className="text-orange-200 text-lg">Grand Convention Center • March 15, 2025</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-6 py-3 bg-orange-700 hover:bg-orange-600 font-semibold transition-colors">
                Back
              </Link>
            </div>

            <div className="flex gap-6 text-orange-100 text-sm border-t border-orange-700 pt-6">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Downtown Conference District</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                </svg>
                <span>Full Day Event • 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                <span>500+ Attendees Expected</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Event Description */}
          <section className="mb-16">
            <EmbrKitCard variant="elevated" className="bg-white border-2 border-orange-200">
              <EmbrKitCardContent className="p-10">
                <h2 className="text-3xl font-bold text-orange-900 mb-4">About the Summit</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Join us for a transformative day of learning, networking, and inspiration. The Leadership Summit 2025
                  brings together industry pioneers, innovative thinkers, and business leaders to explore the future of
                  organizational excellence.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Through keynotes, panels, and interactive workshops, you'll gain actionable insights, forge valuable
                  connections, and leave empowered to lead with confidence in an ever-changing landscape.
                </p>
              </EmbrKitCardContent>
            </EmbrKitCard>
          </section>

          {/* Schedule */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-8 border-b-2 border-orange-300 pb-3">
              Event Schedule
            </h2>

            <div className="space-y-6">
              {schedule.map((item, idx) => (
                <EmbrKitCard
                  key={idx}
                  variant="flat"
                  className={`border-l-4 hover:shadow-lg transition-all ${
                    item.type === 'keynote' ? 'border-orange-700 bg-orange-50' :
                    item.type === 'panel' ? 'border-orange-600 bg-orange-50' :
                    item.type === 'workshop' ? 'border-orange-500 bg-orange-50' :
                    item.type === 'break' ? 'border-gray-400 bg-gray-50' :
                    item.type === 'meal' ? 'border-orange-400 bg-amber-50' :
                    'border-orange-300 bg-white'
                  }`}
                >
                  <EmbrKitCardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-24">
                        <div className="text-2xl font-bold text-orange-900">{item.time}</div>
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                          <EmbrKitBadge
                            variant={item.type === 'keynote' || item.type === 'panel' ? 'primary' : 'secondary'}
                            className="ml-4"
                          >
                            {item.type}
                          </EmbrKitBadge>
                        </div>

                        {item.speaker && (
                          <p className="text-orange-800 font-semibold mb-2">{item.speaker}</p>
                        )}

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>{item.location}</span>
                        </div>

                        {item.description && (
                          <p className="text-gray-700 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </div>
          </section>

          {/* Featured Speakers */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-8 border-b-2 border-orange-300 pb-3">
              Featured Speakers
            </h2>

            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-3">
              {speakers.map((speaker, idx) => (
                <EmbrKitCard key={idx} variant="elevated" className="bg-white border-2 border-orange-200">
                  <EmbrKitCardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-800 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">{speaker.name}</h4>
                    <p className="text-orange-800 font-semibold text-sm mb-1">{speaker.title}</p>
                    <p className="text-gray-600 text-sm">{speaker.company}</p>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </section>

          {/* Registration CTA */}
          <section>
            <EmbrKitCard variant="flat" className="bg-gradient-to-r from-orange-800 to-orange-700 text-white border-none">
              <EmbrKitCardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Secure Your Spot</h2>
                <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                  Limited seats available. Register now to join 500+ leaders at this year's most anticipated summit.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button className="px-10 py-4 bg-white text-orange-800 text-lg font-bold hover:bg-orange-50 transition-colors">
                    Register Now
                  </button>
                  <button className="px-10 py-4 border-2 border-white text-white text-lg font-bold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </EmbrKitCardContent>
            </EmbrKitCard>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-orange-900 text-white py-12 mt-16 border-t-4 border-orange-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Leadership Summit 2025</h3>
            <p className="text-orange-200 mb-6">Empowering Leaders. Shaping the Future.</p>
            <div className="flex justify-center gap-8 text-sm text-orange-200">
              <a href="#" className="hover:text-white transition-colors">Agenda</a>
              <a href="#" className="hover:text-white transition-colors">Speakers</a>
              <a href="#" className="hover:text-white transition-colors">Venue</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-orange-400 text-sm mt-8">© 2025 Leadership Summit. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
