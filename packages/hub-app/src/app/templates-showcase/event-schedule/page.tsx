'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitButton,
  EmbrKitBadge,
  EmbrKitEventCard,
  EmbrKitLiveStatus
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
  { id: 'day1', label: 'Day 1', date: 'March 15, 2025' },
  { id: 'day2', label: 'Day 2', date: 'March 16, 2025' },
  { id: 'day3', label: 'Day 3', date: 'March 17, 2025' }
]

const categories = [
  { id: 'all', label: 'All Events', color: '#8B5CF6' },
  { id: 'keynote', label: 'Keynotes', color: '#EC4899' },
  { id: 'workshop', label: 'Workshops', color: '#F59E0B' },
  { id: 'networking', label: 'Networking', color: '#10B981' }
]

const eventsData = {
  day1: [
    { time: '9:00 AM', title: 'Opening Keynote: The Future of Innovation', location: 'Main Hall', category: 'keynote', description: 'Join our CEO for an inspiring look at what\'s next', active: true },
    { time: '10:30 AM', title: 'Workshop: Design Thinking Fundamentals', location: 'Room A', category: 'workshop', description: 'Hands-on session on design thinking methodology' },
    { time: '12:00 PM', title: 'Networking Lunch', location: 'Garden Terrace', category: 'networking', description: 'Connect with peers and industry leaders' },
    { time: '2:00 PM', title: 'Panel: Building Sustainable Products', location: 'Main Hall', category: 'keynote', description: 'Expert panel discussion on sustainability' },
    { time: '4:00 PM', title: 'Workshop: Advanced Prototyping', location: 'Room B', category: 'workshop', description: 'Learn rapid prototyping techniques' }
  ],
  day2: [
    { time: '9:00 AM', title: 'Keynote: AI and Human Creativity', location: 'Main Hall', category: 'keynote', description: 'Exploring the intersection of AI and creativity' },
    { time: '11:00 AM', title: 'Workshop: Data Storytelling', location: 'Room A', category: 'workshop', description: 'Transform data into compelling narratives' },
    { time: '1:00 PM', title: 'Executive Lunch', location: 'VIP Lounge', category: 'networking', description: 'Exclusive networking for C-level attendees' },
    { time: '3:00 PM', title: 'Lightning Talks: Innovation Showcase', location: 'Main Hall', category: 'keynote', description: 'Quick presentations from industry innovators' }
  ],
  day3: [
    { time: '9:00 AM', title: 'Keynote: The Road Ahead', location: 'Main Hall', category: 'keynote', description: 'Vision for the future of our industry' },
    { time: '11:00 AM', title: 'Workshop: Leadership in Crisis', location: 'Room A', category: 'workshop', description: 'Navigate challenges with confidence' },
    { time: '1:00 PM', title: 'Closing Reception', location: 'Garden Terrace', category: 'networking', description: 'Celebrate and network before departure' }
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
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Innovation Summit 2025
                </h1>
                <p className="text-sm text-gray-600 mt-1">March 15-17 • San Francisco, CA</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full font-medium transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        {/* Live Status Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-3">
          <EmbrKitContainer>
            <div className="flex items-center justify-center">
              <EmbrKitLiveStatus
                status="live"
                text="Currently happening: Opening Keynote"
                timestamp="Started 15 min ago"
              />
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
                  className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                    selectedDay === day.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50 scale-105'
                      : 'bg-white text-gray-700 hover:bg-purple-50 shadow-sm'
                  }`}
                >
                  <div className="text-lg">{day.label}</div>
                  <div className={`text-xs mt-1 ${selectedDay === day.id ? 'text-purple-100' : 'text-gray-500'}`}>
                    {day.date}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Filter by Category</h2>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
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
                    className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                      event.active ? 'border-purple-400 ring-4 ring-purple-100' : 'border-transparent'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="inline-flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                              {event.time}
                            </span>
                            {event.active && (
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full animate-pulse">
                                NOW
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        >
                          {categories.find(c => c.id === event.category)?.label}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3">{event.description}</p>

                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No events in this category</p>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">Need Help Finding Events?</h3>
            <p className="mb-6 text-purple-100">
              Use the filters above to find sessions that match your interests. Add favorites to your personal schedule.
            </p>
            <EmbrKitButton variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50">
              Download Full Schedule
            </EmbrKitButton>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
