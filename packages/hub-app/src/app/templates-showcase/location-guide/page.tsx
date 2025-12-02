'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitButton,
  EmbrKitInput
} from '@embr/ui'

const theme = {
  primaryColor: '#0891B2',
  secondaryColor: '#06B6D4',
  backgroundColor: '#ecfeff',
  surfaceColor: '#cffafe',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'glass' as const
}

const locationCategories = [
  { id: 'all', name: 'All Locations' },
  { id: 'dining', name: 'Dining' },
  { id: 'amenities', name: 'Amenities' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'activities', name: 'Activities' }
]

const getCategoryIcon = (categoryId: string) => {
  const icons: Record<string, JSX.Element> = {
    all: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    dining: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
      </svg>
    ),
    amenities: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zm0-4.5c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zM8.67 12c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v-2c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64V12c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36z"/>
      </svg>
    ),
    wellness: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    ),
    activities: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
      </svg>
    )
  }
  return icons[categoryId] || icons.all
}

const locations = [
  { id: 1, name: 'Main Restaurant', type: 'dining', distance: '0.1 mi', description: 'Fine dining with ocean views', floor: 'Ground Floor', hours: '6 AM - 11 PM' },
  { id: 2, name: 'Beach Bar', type: 'dining', distance: '0.2 mi', description: 'Casual beachside dining and drinks', floor: 'Beach Level', hours: '11 AM - 10 PM' },
  { id: 3, name: 'Pool Complex', type: 'amenities', distance: '0.15 mi', description: 'Three heated pools and hot tubs', floor: 'Level 2', hours: '6 AM - 10 PM' },
  { id: 4, name: 'Fitness Center', type: 'wellness', distance: '0.1 mi', description: 'State-of-the-art equipment and classes', floor: 'Ground Floor', hours: '24 Hours' },
  { id: 5, name: 'Spa & Wellness', type: 'wellness', distance: '0.2 mi', description: 'Full-service spa and relaxation', floor: 'Level 3', hours: '8 AM - 8 PM' },
  { id: 6, name: 'Tennis Courts', type: 'activities', distance: '0.3 mi', description: 'Four professional tennis courts', floor: 'Outdoor', hours: '7 AM - 9 PM' },
  { id: 7, name: 'Golf Course', type: 'activities', distance: '0.5 mi', description: '18-hole championship course', floor: 'Outdoor', hours: '6 AM - 7 PM' },
  { id: 8, name: 'Kids Club', type: 'activities', distance: '0.2 mi', description: 'Supervised activities for children', floor: 'Ground Floor', hours: '9 AM - 6 PM' }
]

const mapMarkers = [
  { id: 'lobby', x: 50, y: 30, label: 'Lobby', active: true },
  { id: 'restaurant', x: 35, y: 45, label: 'Restaurant' },
  { id: 'pool', x: 65, y: 50, label: 'Pool' },
  { id: 'spa', x: 45, y: 65, label: 'Spa' },
  { id: 'beach', x: 50, y: 85, label: 'Beach' }
]

export default function LocationGuideTemplate() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLocations = locations.filter(loc => {
    const matchesCategory = selectedCategory === 'all' || loc.type === selectedCategory
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-cyan-50">
        {/* Header */}
        <header className="bg-white border-b border-cyan-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.5" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Azure Bay Resort</h1>
                  <p className="text-sm text-gray-600 font-medium">Property Map & Directory</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Interactive Map */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Map</h2>
            <EmbrKitCard variant="elevated" className="overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-100">
                {/* Map Visual Representation */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-600">
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                  </svg>
                </div>

                {/* Map Markers */}
                {mapMarkers.map((marker) => (
                  <div
                    key={marker.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      marker.active ? 'z-10' : 'z-0'
                    }`}
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform ${
                        marker.active
                          ? 'bg-cyan-600 text-white ring-4 ring-cyan-300 animate-pulse'
                          : 'bg-white text-cyan-600 border-2 border-cyan-600'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="px-3 py-1 bg-white shadow-lg rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                        {marker.label}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
                    <span className="text-gray-700 font-medium">You are here</span>
                  </div>
                </div>
              </div>
            </EmbrKitCard>
          </div>

          {/* Search */}
          <div className="mb-8">
            <EmbrKitInput
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex gap-3 flex-wrap">
              {locationCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                      : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                  }`}
                >
                  {getCategoryIcon(category.id)}
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Location Grid */}
          <EmbrKitGrid cols={1} gap={4} className="md:grid-cols-2">
            {filteredLocations.map((location) => (
              <EmbrKitCard
                key={location.id}
                variant="elevated"
                className="hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-600"
              >
                <EmbrKitCardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {location.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-cyan-600 font-semibold">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>{location.distance} away</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-full">
                      {locationCategories.find(c => c.id === location.type)?.name}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{location.description}</p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                      </svg>
                      <span>{location.floor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>{location.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <EmbrKitButton variant="primary" className="flex-1">
                      Get Directions
                    </EmbrKitButton>
                    <EmbrKitButton variant="secondary" className="flex-1">
                      More Info
                    </EmbrKitButton>
                  </div>
                </EmbrKitCardContent>
              </EmbrKitCard>
            ))}
          </EmbrKitGrid>

          {/* Info Banner */}
          <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Need Assistance?</h3>
                <p className="text-cyan-100">
                  Our concierge team is available 24/7 to help you navigate the property and make reservations.
                </p>
              </div>
              <EmbrKitButton variant="secondary" className="bg-white text-cyan-600 hover:bg-cyan-50 whitespace-nowrap px-8 py-3 font-semibold">
                Contact Concierge
              </EmbrKitButton>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
