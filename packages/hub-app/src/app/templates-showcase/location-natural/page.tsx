'use client'

import React from 'react'
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
  primaryColor: '#059669',
  secondaryColor: '#10B981',
  backgroundColor: '#f0fdf4',
  surfaceColor: '#dcfce7',
  textColor: '#14532d',
  textSecondaryColor: '#166534',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const trailLocations = [
  {
    name: 'Redwood Grove Trail',
    category: 'Easy',
    distance: '2.5 miles',
    features: ['Shaded Path', 'Wildlife Viewing', 'Picnic Areas'],
    elevation: '+200 ft'
  },
  {
    name: 'Mountain Summit Path',
    category: 'Moderate',
    distance: '5.2 miles',
    features: ['Scenic Vista Points', 'Wildflower Meadows', 'Creek Crossings'],
    elevation: '+850 ft'
  },
  {
    name: 'Canyon Overlook Hike',
    category: 'Challenging',
    distance: '7.8 miles',
    features: ['Panoramic Views', 'Rock Formations', 'Photography Spots'],
    elevation: '+1,400 ft'
  },
  {
    name: 'Lakeside Loop',
    category: 'Easy',
    distance: '3.1 miles',
    features: ['Water Access', 'Bird Watching', 'Fishing Spots'],
    elevation: '+100 ft'
  }
]

export default function LocationNaturalTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-green-700 rounded-full flex items-center justify-center shadow-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Evergreen Nature Reserve</h1>
                  <p className="text-green-200 font-medium">Explore 5,000 Acres of Wilderness</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-green-700 hover:bg-green-600 font-semibold transition-colors rounded-lg">
                Back
              </Link>
            </div>

            <div className="flex gap-8 text-green-100 text-sm mt-6 border-t border-green-700 pt-6">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Northern California</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                </svg>
                <span>Open Daily • Sunrise to Sunset</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Family Friendly • Pet Friendly</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Map Placeholder */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-green-300 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-green-800 font-bold text-lg">Trail Map</p>
                <p className="text-green-600 text-sm mt-2">15+ Miles of Marked Trails</p>
              </div>
            </div>
          </section>

          {/* Trails */}
          <section>
            <h2 className="text-3xl font-bold text-green-900 mb-8">Featured Trails</h2>
            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {trailLocations.map((trail, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-green-200 p-8 hover:border-green-400 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <EmbrKitBadge
                        variant={trail.category === 'Easy' ? 'secondary' : trail.category === 'Moderate' ? 'primary' : 'primary'}
                        className="mb-3"
                      >
                        {trail.category}
                      </EmbrKitBadge>
                      <h3 className="text-2xl font-bold text-green-900 mb-2">{trail.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-green-700 mb-4">
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                          </svg>
                          <span>{trail.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                          </svg>
                          <span>{trail.elevation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {trail.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </EmbrKitGrid>
          </section>

          {/* Visitor Info */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-green-900 mb-8">Visitor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border-2 border-green-200 p-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-700">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-green-900 text-lg mb-2">Getting Here</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Located 45 minutes north of the city. Free parking available at all trailheads.
                </p>
              </div>
              <div className="bg-white rounded-2xl border-2 border-green-200 p-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-700">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-green-900 text-lg mb-2">What to Bring</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Water, sunscreen, sturdy shoes, and a trail map. Restrooms available at visitor center.
                </p>
              </div>
              <div className="bg-white rounded-2xl border-2 border-green-200 p-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-700">
                    <path d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-18A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m-1 15h2v-6h-2v6z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-green-900 text-lg mb-2">Safety Tips</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Stay on marked trails, check weather before heading out, and let someone know your plans.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-green-800 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Evergreen Nature Reserve</h3>
            <p className="text-green-200 mb-6">Preserving Nature for Future Generations</p>
            <div className="flex justify-center gap-8 text-sm text-green-200">
              <a href="#" className="hover:text-white transition-colors">Trail Maps</a>
              <a href="#" className="hover:text-white transition-colors">Events</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Support Us</a>
            </div>
            <p className="text-green-400 text-sm mt-8">© 2025 Evergreen Nature Reserve. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
