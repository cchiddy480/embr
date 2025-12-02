'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitBadge
} from '@embr/ui'

const theme = {
  primaryColor: '#1F2937',
  secondaryColor: '#6B7280',
  backgroundColor: '#111827',
  surfaceColor: '#1F2937',
  textColor: '#F9FAFB',
  textSecondaryColor: '#D1D5DB',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'glass' as const
}

const locations = [
  {
    name: 'Metropolitan Tower',
    category: 'Main Building',
    address: '1000 Downtown Plaza',
    features: ['24/7 Security', 'Valet Parking', 'Rooftop Lounge'],
    hours: 'Always Open'
  },
  {
    name: 'Executive Offices',
    category: 'Business District',
    address: '500 Financial Avenue, Floor 42',
    features: ['Conference Rooms', 'Executive Lounge', 'Private Parking'],
    hours: 'Mon-Fri: 7AM-9PM'
  },
  {
    name: 'Urban Fitness Center',
    category: 'Amenities',
    address: '1000 Downtown Plaza, Level B1',
    features: ['State-of-the-Art Equipment', 'Personal Training', 'Spa Services'],
    hours: '5AM-11PM Daily'
  },
  {
    name: 'Sky Bar & Restaurant',
    category: 'Dining',
    address: '1000 Downtown Plaza, Floor 50',
    features: ['Fine Dining', 'Craft Cocktails', 'City Views'],
    hours: 'Dinner: 5PM-12AM'
  }
]

export default function LocationUrbanTemplate() {
  const [_selectedLocation, _setSelectedLocation] = useState(locations[0])

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-gray-600">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Skyline District</h1>
                  <p className="text-gray-400 font-medium">Premium Urban Living</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors border border-gray-600">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-12 border border-gray-600">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-5xl font-bold text-white mb-4">Experience Urban Excellence</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Discover world-class amenities and services in the heart of the city's most prestigious address
                </p>
              </div>
            </div>
          </section>

          {/* Map Placeholder */}
          <section className="mb-12">
            <div className="bg-gray-800 border border-gray-700 aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-gray-500 font-semibold">Interactive Map</p>
                <p className="text-gray-600 text-sm mt-2">Downtown District • Premium Location</p>
              </div>
            </div>
          </section>

          {/* Locations Grid */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Key Locations</h2>
            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {locations.map((location, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 border border-gray-700 p-8 hover:border-gray-500 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <EmbrKitBadge variant="secondary" className="mb-3">
                        {location.category}
                      </EmbrKitBadge>
                      <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {location.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {location.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-gray-500"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>{location.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </EmbrKitGrid>
          </section>

          {/* Contact CTA */}
          <section className="mt-16">
            <div className="bg-gray-800 border border-gray-700 p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Visit Skyline District</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Schedule a private tour of our facilities and experience urban living at its finest
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-3 bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors">
                  Schedule Tour
                </button>
                <button className="px-8 py-3 border-2 border-gray-600 text-gray-300 font-bold hover:bg-gray-700 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-950 text-gray-400 py-12 mt-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Skyline District</h3>
            <p className="text-gray-500 mb-6">1000 Downtown Plaza • Metropolitan City</p>
            <div className="flex justify-center gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Locations</a>
              <a href="#" className="hover:text-white transition-colors">Amenities</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>
            <p className="text-gray-600 text-sm mt-8">© 2025 Skyline District. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
