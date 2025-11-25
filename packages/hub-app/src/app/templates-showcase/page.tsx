'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const templateCategories = [
  {
    id: 'business',
    name: 'Business & Corporate',
    description: 'Professional layouts for companies and services',
    icon: '💼',
    variations: [
      { id: 'modern-business', name: 'Modern', colors: { primary: '#0F766E', secondary: '#38F9E4' }, style: 'Clean gradient with teal accents' },
      { id: 'business-minimal', name: 'Minimal', colors: { primary: '#1F2937', secondary: '#6B7280' }, style: 'Sleek black and white design' },
      { id: 'business-corporate', name: 'Corporate', colors: { primary: '#1E40AF', secondary: '#3B82F6' }, style: 'Traditional blue professional' },
      { id: 'business-warm', name: 'Warm', colors: { primary: '#DC2626', secondary: '#F59E0B' }, style: 'Inviting warm earth tones' }
    ]
  },
  {
    id: 'events',
    name: 'Events & Schedules',
    description: 'Timeline-based designs for conferences and festivals',
    icon: '🎪',
    variations: [
      { id: 'event-schedule', name: 'Vibrant', colors: { primary: '#8B5CF6', secondary: '#EC4899' }, style: 'Bold purple and pink gradients' },
      { id: 'event-minimal', name: 'Minimal', colors: { primary: '#0F172A', secondary: '#475569' }, style: 'Clean monochrome timeline' },
      { id: 'event-modern', name: 'Modern', colors: { primary: '#0EA5E9', secondary: '#06B6D4' }, style: 'Fresh cyan and blue tones' },
      { id: 'event-classic', name: 'Classic', colors: { primary: '#7C2D12', secondary: '#EA580C' }, style: 'Traditional warm orange' }
    ]
  },
  {
    id: 'menu',
    name: 'Menu & Catalog',
    description: 'Product showcase for restaurants and retail',
    icon: '🍽️',
    variations: [
      { id: 'menu-catalog', name: 'Bold', colors: { primary: '#DC2626', secondary: '#F59E0B' }, style: 'Appetizing red and orange' },
      { id: 'menu-elegant', name: 'Elegant', colors: { primary: '#1F2937', secondary: '#D4AF37' }, style: 'Sophisticated dark with gold' },
      { id: 'menu-fresh', name: 'Fresh', colors: { primary: '#059669', secondary: '#10B981' }, style: 'Natural green and white' },
      { id: 'menu-classic', name: 'Classic', colors: { primary: '#92400E', secondary: '#B45309' }, style: 'Warm brown and cream' }
    ]
  },
  {
    id: 'wellness',
    name: 'Wellness & Timers',
    description: 'Calming designs for meditation and breathing',
    icon: '🧘',
    variations: [
      { id: 'wellness-timer', name: 'Serene', colors: { primary: '#059669', secondary: '#34D399' }, style: 'Peaceful green gradients' },
      { id: 'wellness-zen', name: 'Zen', colors: { primary: '#6366F1', secondary: '#A78BFA' }, style: 'Calming purple and lavender' },
      { id: 'wellness-ocean', name: 'Ocean', colors: { primary: '#0891B2', secondary: '#06B6D4' }, style: 'Tranquil blue water tones' },
      { id: 'wellness-sunset', name: 'Sunset', colors: { primary: '#EA580C', secondary: '#FB923C' }, style: 'Warm sunset gradients' }
    ]
  },
  {
    id: 'location',
    name: 'Location & Maps',
    description: 'Map-centric for venues and properties',
    icon: '🗺️',
    variations: [
      { id: 'location-guide', name: 'Modern', colors: { primary: '#0891B2', secondary: '#06B6D4' }, style: 'Clean cyan with maps' },
      { id: 'location-urban', name: 'Urban', colors: { primary: '#1F2937', secondary: '#6B7280' }, style: 'Metropolitan dark theme' },
      { id: 'location-natural', name: 'Natural', colors: { primary: '#059669', secondary: '#10B981' }, style: 'Earthy green outdoor' }
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio & Gallery',
    description: 'Image-focused for creative professionals',
    icon: '📸',
    variations: [
      { id: 'portfolio-gallery', name: 'Minimal', colors: { primary: '#1F2937', secondary: '#6B7280' }, style: 'Clean monochrome gallery' },
      { id: 'portfolio-bold', name: 'Bold', colors: { primary: '#DC2626', secondary: '#F59E0B' }, style: 'Statement red and gold' },
      { id: 'portfolio-modern', name: 'Modern', colors: { primary: '#3B82F6', secondary: '#8B5CF6' }, style: 'Contemporary blue purple' }
    ]
  },
  {
    id: 'booking',
    name: 'Booking & Scheduler',
    description: 'Appointment systems for services',
    icon: '📅',
    variations: [
      { id: 'booking-scheduler', name: 'Professional', colors: { primary: '#7C3AED', secondary: '#A78BFA' }, style: 'Modern purple gradients' },
      { id: 'booking-minimal', name: 'Minimal', colors: { primary: '#0F172A', secondary: '#475569' }, style: 'Simple clean interface' },
      { id: 'booking-elegant', name: 'Elegant', colors: { primary: '#BE123C', secondary: '#E11D48' }, style: 'Sophisticated rose tones' }
    ]
  },
  {
    id: 'dashboard',
    name: 'Dashboard & Analytics',
    description: 'Data visualization and reporting',
    icon: '📊',
    variations: [
      { id: 'dashboard-stats', name: 'Professional', colors: { primary: '#3B82F6', secondary: '#10B981' }, style: 'Clean data-focused blue' },
      { id: 'dashboard-dark', name: 'Dark', colors: { primary: '#1F2937', secondary: '#6366F1' }, style: 'Dark mode analytics' }
    ]
  }
]

export default function TemplatesShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...templateCategories.map(c => c.id)]

  const filteredCategories = selectedCategory === 'all'
    ? templateCategories
    : templateCategories.filter(c => c.id === selectedCategory)

  const totalVariations = templateCategories.reduce((sum, cat) => sum + cat.variations.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Template Variations</h1>
              <p className="text-gray-600 mt-1">{totalVariations} unique templates across {templateCategories.length} categories</p>
            </div>
            <Link href="/" className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-colors">
              Back to Hub
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Templates
            </button>
            {templateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Template Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section key={category.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                    {category.variations.length} Variations
                  </span>
                </div>
              </div>

              {/* Variations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.variations.map((variation) => (
                  <Link
                    key={variation.id}
                    href={`/templates-showcase/${variation.id}`}
                    className="group block"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-teal-400 transition-all overflow-hidden hover:shadow-xl">
                      {/* Color Preview Banner */}
                      <div
                        className="h-24 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${variation.colors.primary} 0%, ${variation.colors.secondary} 100%)`
                        }}
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-1 text-lg">
                          {variation.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {variation.style}
                        </p>

                        {/* Color Swatches */}
                        <div className="flex gap-2 mb-3">
                          <div
                            className="w-6 h-6 rounded-md shadow-sm border border-gray-200"
                            style={{ backgroundColor: variation.colors.primary }}
                            title="Primary"
                          />
                          <div
                            className="w-6 h-6 rounded-md shadow-sm border border-gray-200"
                            style={{ backgroundColor: variation.colors.secondary }}
                            title="Secondary"
                          />
                        </div>

                        <div className="text-xs font-semibold text-teal-600 group-hover:text-teal-700">
                          View Template →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Maximum Customization</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-teal-50 mb-4">
                Each template variation offers a completely unique visual experience while maintaining the same core functionality.
                Choose the style that best matches your brand identity.
              </p>
              <ul className="space-y-2 text-teal-50">
                <li><strong className="text-white">Unique Color Schemes:</strong> Carefully crafted palettes for different moods and industries</li>
                <li><strong className="text-white">Distinct Visual Styles:</strong> From minimal to bold, modern to classic</li>
                <li><strong className="text-white">Same Functionality:</strong> All variations share core features with different presentations</li>
                <li><strong className="text-white">Brand Flexibility:</strong> Pick the style that resonates with your brand</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
