'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitButton,
  EmbrKitBadge
} from '@embr/ui'

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

const days = ['Day 1', 'Day 2', 'Day 3']

const schedule = {
  'Day 1': [
    {
      time: '8:30 AM',
      title: 'Registration & Welcome Coffee',
      location: 'Main Lobby',
      track: 'General',
      description: 'Check in and network with fellow attendees',
      speakers: []
    },
    {
      time: '9:30 AM',
      title: 'Opening Keynote: The Future of Technology',
      location: 'Grand Ballroom',
      track: 'Keynote',
      description: 'Join us for an inspiring vision of technology trends shaping the next decade',
      speakers: ['Dr. Elena Martinez - Chief Technology Officer, TechVentures Inc.'],
      featured: true
    },
    {
      time: '11:00 AM',
      title: 'Building Scalable AI Systems',
      location: 'Room A',
      track: 'AI & ML',
      description: 'Learn best practices for deploying machine learning models at scale',
      speakers: ['James Chen - ML Engineer, DataCorp']
    },
    {
      time: '11:00 AM',
      title: 'Modern Design Systems Workshop',
      location: 'Room B',
      track: 'Design',
      description: 'Hands-on session creating component libraries and design tokens',
      speakers: ['Sarah Johnson - Design Director, CreativeLabs']
    },
    {
      time: '12:30 PM',
      title: 'Networking Lunch',
      location: 'Terrace & Dining Hall',
      track: 'General',
      description: 'Enjoy lunch and connect with speakers and attendees',
      speakers: []
    },
    {
      time: '2:00 PM',
      title: 'Cloud Architecture Patterns',
      location: 'Room A',
      track: 'DevOps',
      description: 'Deep dive into microservices, serverless, and edge computing',
      speakers: ['Michael Roberts - Solutions Architect, CloudScale']
    },
    {
      time: '2:00 PM',
      title: 'Product Strategy & User Research',
      location: 'Room B',
      track: 'Product',
      description: 'Aligning product vision with customer needs through research',
      speakers: ['Amanda Lee - VP Product, InnovateCo']
    },
    {
      time: '3:30 PM',
      title: 'Coffee Break & Expo Hall',
      location: 'Expo Hall',
      track: 'General',
      description: 'Visit sponsor booths and demo latest technologies',
      speakers: []
    },
    {
      time: '4:00 PM',
      title: 'Panel: The State of Web Development',
      location: 'Grand Ballroom',
      track: 'Web Dev',
      description: 'Industry leaders discuss frameworks, tooling, and best practices',
      speakers: ['Lisa Wang, Tom Anderson, Raj Patel - Industry Experts'],
      featured: true
    }
  ],
  'Day 2': [
    {
      time: '9:00 AM',
      title: 'Day 2 Keynote: Innovation in Action',
      location: 'Grand Ballroom',
      track: 'Keynote',
      description: 'Real-world case studies of digital transformation success',
      speakers: ['Prof. David Kim - Stanford University'],
      featured: true
    },
    {
      time: '10:30 AM',
      title: 'Cybersecurity Best Practices',
      location: 'Room A',
      track: 'Security',
      description: 'Protecting systems from emerging threats and vulnerabilities',
      speakers: ['Rachel Green - CISO, SecureNet']
    },
    {
      time: '10:30 AM',
      title: 'Advanced React Patterns',
      location: 'Room B',
      track: 'Web Dev',
      description: 'Performance optimization and architectural patterns in React',
      speakers: ['Daniel Brown - Senior Engineer, WebCo']
    },
    {
      time: '12:00 PM',
      title: 'Networking Lunch',
      location: 'Terrace & Dining Hall',
      track: 'General',
      description: 'Continue conversations from morning sessions',
      speakers: []
    },
    {
      time: '1:30 PM',
      title: 'Data Engineering Workshop',
      location: 'Room A',
      track: 'Data',
      description: 'Building robust data pipelines and ETL processes',
      speakers: ['Maria Garcia - Data Engineer, DataFlow Inc.']
    },
    {
      time: '1:30 PM',
      title: 'Mobile Development Trends',
      location: 'Room B',
      track: 'Mobile',
      description: 'Cross-platform frameworks and native performance',
      speakers: ['Alex Turner - Mobile Lead, AppBuilder']
    },
    {
      time: '3:00 PM',
      title: 'Startup Pitch Competition',
      location: 'Grand Ballroom',
      track: 'Startups',
      description: '10 startups pitch their innovations to investor panel',
      speakers: ['Various Founders & Investors'],
      featured: true
    }
  ],
  'Day 3': [
    {
      time: '9:00 AM',
      title: 'Closing Keynote: Building the Future Together',
      location: 'Grand Ballroom',
      track: 'Keynote',
      description: 'Reflection on key learnings and vision for collaborative innovation',
      speakers: ['Jennifer Lopez - CEO, FutureTech Global'],
      featured: true
    },
    {
      time: '10:30 AM',
      title: 'Open Source Sustainability',
      location: 'Room A',
      track: 'Community',
      description: 'Funding models and governance for open source projects',
      speakers: ['Chris Wilson - Open Source Advocate']
    },
    {
      time: '10:30 AM',
      title: 'Accessibility in Digital Products',
      location: 'Room B',
      track: 'Design',
      description: 'Inclusive design practices and WCAG compliance',
      speakers: ['Nina Patel - Accessibility Lead, InclusiveDesign']
    },
    {
      time: '12:00 PM',
      title: 'Closing Remarks & Farewell',
      location: 'Grand Ballroom',
      track: 'General',
      description: 'Thank you and see you next year!',
      speakers: ['Event Organizers']
    }
  ]
}

export default function EventModern() {
  const [selectedDay, setSelectedDay] = useState('Day 1')

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-sky-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 12h6M8 16h4M18 12h6M18 16h6M18 20h6M6 8a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V8z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    TechSummit 2025
                  </h1>
                  <p className="text-sm text-sky-700 font-medium">March 15-17 • San Francisco Convention Center</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2.5 bg-white border border-sky-300 hover:bg-sky-50 rounded-xl font-semibold transition-colors shadow-sm">
                ← Back
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 text-white py-16 shadow-xl">
          <EmbrKitContainer>
            <div className="text-center max-w-3xl mx-auto">
              <EmbrKitBadge variant="default" className="mb-4 bg-white/20 text-white border-white/30">
                Virtual + In-Person
              </EmbrKitBadge>
              <h2 className="text-5xl font-bold mb-4">Join 5,000+ Innovators</h2>
              <p className="text-lg text-sky-50 mb-6">
                Three days of cutting-edge talks, workshops, and networking with the world's leading tech professionals
              </p>
              <div className="flex justify-center gap-4">
                <EmbrKitButton className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-3 font-semibold shadow-lg">
                  Register Now
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 font-semibold">
                  View Speakers
                </EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Day Tabs */}
          <div className="mb-10">
            <div className="flex gap-3 border-b border-sky-200">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-8 py-4 font-bold text-lg transition-all duration-300 border-b-4 ${
                    selectedDay === day
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-sky-600 hover:border-sky-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            {schedule[selectedDay as keyof typeof schedule].map((event, idx) => (
              <div
                key={idx}
                className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${
                  event.featured ? 'border-2 border-sky-400 shadow-lg' : 'border border-sky-100'
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* Time Badge */}
                  <div className="text-center min-w-[100px] bg-gradient-to-br from-sky-100 to-cyan-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-sky-600">
                      {event.time.split(' ')[0].split(':')[0]}
                    </div>
                    <div className="text-sm font-semibold text-sky-600">
                      {event.time.split(' ')[0].split(':')[1]} {event.time.split(' ')[1]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                      {event.featured && (
                        <EmbrKitBadge variant="error" className="ml-4">
                          FEATURED
                        </EmbrKitBadge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8zm6-3a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>
                        </svg>
                        {event.track}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        {event.location}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{event.description}</p>

                    {event.speakers.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-sky-600">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                        </svg>
                        <span className="text-gray-700 font-medium">
                          {event.speakers.join(' • ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Info Footer */}
          <div className="mt-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-sky-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-sky-600">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  Venue
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  San Francisco Convention Center<br />
                  747 Howard Street<br />
                  San Francisco, CA 94103
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-sky-600">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                  Dates & Times
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  March 15-17, 2025<br />
                  Daily: 8:30 AM - 6:00 PM<br />
                  Networking: 6:00 PM - 8:00 PM
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-sky-600">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                  </svg>
                  Contact
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Email: info@techsummit.com<br />
                  Phone: (555) 123-4567<br />
                  <span className="text-sky-600 font-semibold">Early Bird Pricing Ends March 1</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-2">TechSummit 2025</h2>
            <p className="text-gray-400 mb-6">Where Innovation Meets Opportunity</p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Schedule</a>
              <a href="#" className="hover:text-white transition-colors">Speakers</a>
              <a href="#" className="hover:text-white transition-colors">Sponsors</a>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 text-sm mt-8">© 2025 TechSummit. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
