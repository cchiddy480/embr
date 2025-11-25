'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitButton,
  EmbrKitBadge
} from '@embr/ui'

const theme = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#EC4899',
  backgroundColor: '#faf5ff',
  surfaceColor: '#f5f3ff',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'golden-ratio' as const,
  materialStyle: 'vibrant' as const
}

const eventDays = [
  { id: 'day1', label: 'Monday', date: 'March 15', fullDate: 'March 15, 2025' },
  { id: 'day2', label: 'Tuesday', date: 'March 16', fullDate: 'March 16, 2025' },
  { id: 'day3', label: 'Wednesday', date: 'March 17', fullDate: 'March 17, 2025' }
]

const categories = [
  { id: 'all', label: 'All Sessions', color: '#8B5CF6' },
  { id: 'keynote', label: 'Keynotes', color: '#EC4899' },
  { id: 'workshop', label: 'Workshops', color: '#F59E0B' },
  { id: 'panel', label: 'Panel Discussions', color: '#10B981' },
  { id: 'networking', label: 'Networking', color: '#3B82F6' }
]

const eventsData = {
  day1: [
    {
      time: '8:00 AM',
      title: 'Registration & Welcome Coffee',
      location: 'Main Lobby',
      category: 'networking',
      description: 'Check-in and network with fellow attendees',
      speakers: []
    },
    {
      time: '9:00 AM',
      title: 'Opening Keynote: The Future of Digital Innovation',
      location: 'Grand Ballroom',
      category: 'keynote',
      description: 'Explore emerging trends and technologies shaping the digital landscape',
      speakers: ['Dr. Sarah Chen, Chief Innovation Officer, TechVentures'],
      active: true
    },
    {
      time: '10:30 AM',
      title: 'Workshop: Design Thinking in Practice',
      location: 'Conference Room A',
      category: 'workshop',
      description: 'Hands-on workshop covering design thinking methodology and real-world applications',
      speakers: ['Michael Rodriguez, Design Director, CreativeLabs'],
      capacity: '30 seats'
    },
    {
      time: '10:30 AM',
      title: 'Panel: Building Sustainable Tech Products',
      location: 'Conference Room B',
      category: 'panel',
      description: 'Industry leaders discuss sustainability in technology product development',
      speakers: ['Panel of 4 sustainability experts'],
      capacity: '50 seats'
    },
    {
      time: '12:00 PM',
      title: 'Networking Lunch',
      location: 'Garden Terrace',
      category: 'networking',
      description: 'Connect with peers and industry leaders over lunch'
    },
    {
      time: '2:00 PM',
      title: 'Workshop: Advanced Data Analytics',
      location: 'Conference Room A',
      category: 'workshop',
      description: 'Deep dive into data analytics techniques and tools',
      speakers: ['Emily Watson, Lead Data Scientist, DataCorp'],
      capacity: '30 seats'
    },
    {
      time: '2:00 PM',
      title: 'Keynote: AI and Human Creativity',
      location: 'Grand Ballroom',
      category: 'keynote',
      description: 'Exploring the intersection of artificial intelligence and human creativity',
      speakers: ['Prof. James Liu, MIT AI Research Lab']
    },
    {
      time: '4:00 PM',
      title: 'Closing Networking Reception',
      location: 'Rooftop Lounge',
      category: 'networking',
      description: 'Wind down with drinks and conversations'
    }
  ],
  day2: [
    {
      time: '9:00 AM',
      title: 'Keynote: Scaling Your Business',
      location: 'Grand Ballroom',
      category: 'keynote',
      description: 'Strategies for sustainable business growth and scaling',
      speakers: ['Maria Garcia, CEO, GrowthPartners']
    },
    {
      time: '10:30 AM',
      title: 'Workshop: Product Management Essentials',
      location: 'Conference Room A',
      category: 'workshop',
      description: 'Core principles and practices for effective product management',
      speakers: ['David Kim, VP Product, TechStartup'],
      capacity: '30 seats'
    },
    {
      time: '12:00 PM',
      title: 'Executive Lunch',
      location: 'VIP Lounge',
      category: 'networking',
      description: 'Exclusive networking for C-level attendees'
    },
    {
      time: '2:00 PM',
      title: 'Panel: The Future of Work',
      location: 'Grand Ballroom',
      category: 'panel',
      description: 'Leaders discuss remote work, hybrid models, and workplace innovation',
      speakers: ['Panel of 5 industry executives']
    },
    {
      time: '4:00 PM',
      title: 'Workshop: Customer Success Strategies',
      location: 'Conference Room B',
      category: 'workshop',
      description: 'Building effective customer success programs',
      speakers: ['Rachel Thompson, Director of CS, SaaS Inc'],
      capacity: '25 seats'
    }
  ],
  day3: [
    {
      time: '9:00 AM',
      title: 'Keynote: Innovation in Healthcare Technology',
      location: 'Grand Ballroom',
      category: 'keynote',
      description: 'How technology is transforming healthcare delivery',
      speakers: ['Dr. Robert Anderson, Chief Medical Officer, HealthTech']
    },
    {
      time: '10:30 AM',
      title: 'Workshop: Leadership in Crisis',
      location: 'Conference Room A',
      category: 'workshop',
      description: 'Navigate uncertainty with confidence and resilience',
      speakers: ['Jennifer Lee, Executive Coach & Leadership Consultant'],
      capacity: '30 seats'
    },
    {
      time: '12:00 PM',
      title: 'Farewell Lunch & Awards',
      location: 'Grand Ballroom',
      category: 'networking',
      description: 'Celebrate achievements and network before departure'
    },
    {
      time: '2:00 PM',
      title: 'Closing Keynote: The Road Ahead',
      location: 'Grand Ballroom',
      category: 'keynote',
      description: 'Vision for the future and key takeaways from the conference',
      speakers: ['Conference Organizing Committee']
    }
  ]
}

export default function EventScheduleTemplate() {
  const [selectedDay, setSelectedDay] = useState('day1')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const currentEvents = eventsData[selectedDay as keyof typeof eventsData] || []
  const filteredEvents = selectedCategory === 'all'
    ? currentEvents
    : currentEvents.filter(e => e.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.id === category)?.color || '#8B5CF6'
  }

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #fce7f3 100%)' }}>
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Innovation Summit 2025
                  </h1>
                </div>
                <p className="text-sm text-gray-600 ml-13">March 15-17, 2025 • San Francisco Convention Center</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full font-medium transition-colors">
                ← Back
              </Link>
            </div>
          </div>
        </header>

        {/* Live Status Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-4">
          <EmbrKitContainer>
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="font-semibold">LIVE NOW: Opening Keynote in Grand Ballroom</span>
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-10">
          {/* Day Selector */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Select Day</h2>
            <div className="flex gap-4 flex-wrap">
              {eventDays.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-8 py-5 rounded-2xl font-bold transition-all duration-300 ${
                    selectedDay === day.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50 scale-105'
                      : 'bg-white text-gray-700 hover:bg-purple-50 shadow-sm border border-purple-100'
                  }`}
                >
                  <div className="text-lg">{day.label}</div>
                  <div className={`text-sm mt-1 ${selectedDay === day.id ? 'text-purple-100' : 'text-gray-500'}`}>
                    {day.date}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Filter by Type</h2>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  style={selectedCategory === category.id ? {
                    backgroundColor: category.color,
                    boxShadow: `0 10px 25px -5px ${category.color}40`
                  } : {}}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="relative pl-12 pb-4"
                >
                  {/* Timeline Line */}
                  {idx < filteredEvents.length - 1 && (
                    <div
                      className="absolute left-[19px] top-12 bottom-0 w-0.5"
                      style={{ backgroundColor: getCategoryColor(event.category), opacity: 0.2 }}
                    />
                  )}

                  {/* Timeline Dot */}
                  <div
                    className="absolute left-3 top-3 w-[18px] h-[18px] rounded-full shadow-lg"
                    style={{
                      backgroundColor: getCategoryColor(event.category),
                      boxShadow: `0 0 0 4px ${getCategoryColor(event.category)}20`
                    }}
                  />

                  {/* Event Card */}
                  <div
                    className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                      event.active ? 'border-2 border-purple-400 ring-4 ring-purple-100' : 'border border-gray-100'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                              {event.time}
                            </span>
                            {event.active && (
                              <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                LIVE NOW
                              </span>
                            )}
                            {event.capacity && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                {event.capacity}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white ml-4"
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        >
                          {categories.find(c => c.id === event.category)?.label}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3">{event.description}</p>

                      {event.speakers && event.speakers.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-gray-700 mb-1">Speakers:</p>
                          {event.speakers.map((speaker, sidx) => (
                            <p key={sidx} className="text-sm text-gray-600">{speaker}</p>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        <button className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                          Add to Schedule →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl">
                <p className="text-gray-500 text-lg">No sessions in this category</p>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Conference Information</h3>
                <div className="space-y-3 text-purple-100">
                  <p><strong className="text-white">Venue:</strong> San Francisco Convention Center</p>
                  <p><strong className="text-white">Address:</strong> 747 Howard Street, San Francisco, CA 94103</p>
                  <p><strong className="text-white">Dates:</strong> March 15-17, 2025</p>
                  <p><strong className="text-white">Registration:</strong> Daily from 8:00 AM</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="text-purple-100 mb-6">
                  Visit the Help Desk in the Main Lobby or use the conference app to navigate, add sessions to your personal schedule, and connect with other attendees.
                </p>
                <EmbrKitButton variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50">
                  Download Conference App
                </EmbrKitButton>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-purple-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-600 mb-2">© 2025 Innovation Summit. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-purple-600">Conference Guide</a>
              <a href="#" className="hover:text-purple-600">Sponsors</a>
              <a href="#" className="hover:text-purple-600">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
