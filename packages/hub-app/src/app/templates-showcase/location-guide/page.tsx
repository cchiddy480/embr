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
  EmbrKitInput,
  EmbrKitLocationCard
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
  { id: 'all', name: 'All Locations', icon: '📍' },
  { id: 'dining', name: 'Dining', icon: '🍽️' },
  { id: 'amenities', name: 'Amenities', icon: '🏊' },
  { id: 'wellness', name: 'Wellness', icon: '💆' },
  { id: 'activities', name: 'Activities', icon: '⛳' }
]

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
                <div className="text-3xl">🏖️</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Coastal Resort</h1>
                  <p className="text-sm text-gray-600">Location Guide & Map</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
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
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  🗺️
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
                      📍
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
                  className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                      : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
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
                      <p className="text-sm text-cyan-600 font-semibold">
                        📍 {location.distance} away
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-full">
                      {locationCategories.find(c => c.id === location.type)?.name}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{location.description}</p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <span>🏢</span>
                      <span>{location.floor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
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
          <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">📱</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Need Assistance?</h3>
                <p className="text-cyan-100">
                  Our concierge team is available 24/7 to help you navigate the property and make reservations.
                </p>
              </div>
              <EmbrKitButton variant="secondary" className="bg-white text-cyan-600 hover:bg-cyan-50 whitespace-nowrap">
                Contact Concierge
              </EmbrKitButton>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
