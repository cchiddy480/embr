'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid, EmbrKitCard, EmbrKitCardHeader, EmbrKitCardContent, EmbrKitButton, EmbrKitBadge } from '@embr/ui'

const templates = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Clean, professional layout with hero section and feature grid. Perfect for corporate, consulting, or professional services.',
    industry: 'Business',
    colors: { primary: '#0F766E', secondary: '#38F9E4', background: '#ffffff', surface: '#f9fafb' },
    features: ['Hero Section', 'Service Grid', 'Stats Display', 'Contact Form'],
    preview: '/templates-showcase/modern-business'
  },
  {
    id: 'event-schedule',
    name: 'Event Schedule',
    description: 'Timeline-focused design for conferences, festivals, or multi-day events. Interactive schedule with filtering.',
    industry: 'Events',
    colors: { primary: '#8B5CF6', secondary: '#EC4899', background: '#faf5ff', surface: '#f5f3ff' },
    features: ['Timeline View', 'Event Cards', 'Live Status', 'Filters'],
    preview: '/templates-showcase/event-schedule'
  },
  {
    id: 'menu-catalog',
    name: 'Menu & Catalog',
    description: 'Grid-based product showcase for restaurants, retail, or e-commerce. Visual-first with categories.',
    industry: 'Hospitality',
    colors: { primary: '#DC2626', secondary: '#F59E0B', background: '#fffbeb', surface: '#fef3c7' },
    features: ['Category Filters', 'Product Grid', 'Quick View', 'Cart'],
    preview: '/templates-showcase/menu-catalog'
  },
  {
    id: 'location-guide',
    name: 'Location Guide',
    description: 'Map-centric experience for venues, campuses, or property tours. Interactive maps with location cards.',
    industry: 'Real Estate',
    colors: { primary: '#0891B2', secondary: '#06B6D4', background: '#ecfeff', surface: '#cffafe' },
    features: ['Interactive Map', 'Location Cards', 'Search', 'Directions'],
    preview: '/templates-showcase/location-guide'
  },
  {
    id: 'portfolio-gallery',
    name: 'Portfolio & Gallery',
    description: 'Image-focused layout for photographers, artists, or creative portfolios. Masonry grid with lightbox.',
    industry: 'Creative',
    colors: { primary: '#1F2937', secondary: '#6B7280', background: '#f9fafb', surface: '#ffffff' },
    features: ['Masonry Grid', 'Lightbox View', 'Categories', 'Image Details'],
    preview: '/templates-showcase/portfolio-gallery'
  },
  {
    id: 'dashboard-stats',
    name: 'Dashboard & Stats',
    description: 'Data visualization focus for analytics, reporting, or business intelligence. Charts and KPI cards.',
    industry: 'Analytics',
    colors: { primary: '#3B82F6', secondary: '#10B981', background: '#f8fafc', surface: '#f1f5f9' },
    features: ['KPI Cards', 'Charts', 'Data Tables', 'Export'],
    preview: '/templates-showcase/dashboard-stats'
  },
  {
    id: 'wellness-timer',
    name: 'Wellness & Timer',
    description: 'Calming design for breathing exercises, meditation, or wellness apps. Timer-focused with animations.',
    industry: 'Wellness',
    colors: { primary: '#059669', secondary: '#34D399', background: '#f0fdf4', surface: '#dcfce7' },
    features: ['Timer', 'Breathing Guide', 'Progress', 'History'],
    preview: '/templates-showcase/wellness-timer'
  },
  {
    id: 'booking-scheduler',
    name: 'Booking & Scheduler',
    description: 'Appointment booking for services, classes, or reservations. Calendar-based with time slots.',
    industry: 'Services',
    colors: { primary: '#7C3AED', secondary: '#A78BFA', background: '#faf5ff', surface: '#f3e8ff' },
    features: ['Calendar View', 'Time Slots', 'Booking Form', 'Confirmation'],
    preview: '/templates-showcase/booking-scheduler'
  }
]

export default function TemplatesShowcase() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All')

  const industries = ['All', ...Array.from(new Set(templates.map(t => t.industry)))]

  const filteredTemplates = selectedIndustry === 'All'
    ? templates
    : templates.filter(t => t.industry === selectedIndustry)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Template Variations</h1>
              <p className="text-gray-600 mt-1">Choose from multiple independent templates for your tier one app</p>
            </div>
            <Link href="/" className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-colors">
              Back to Hub
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Industry Filter */}
        <div className="mb-8 flex gap-3 flex-wrap">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedIndustry === industry
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Preview Banner */}
              <div
                className="h-32 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                    {template.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Color Palette */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Color Palette:</p>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                      style={{ backgroundColor: template.colors.primary }}
                      title="Primary"
                    />
                    <div
                      className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                      style={{ backgroundColor: template.colors.secondary }}
                      title="Secondary"
                    />
                    <div
                      className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                      style={{ backgroundColor: template.colors.background }}
                      title="Background"
                    />
                    <div
                      className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                      style={{ backgroundColor: template.colors.surface }}
                      title="Surface"
                    />
                  </div>
                </div>

                {/* Actions */}
                <Link
                  href={template.preview}
                  className="block w-full text-center px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors"
                >
                  View Template
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Template Variations</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Each template is <strong>completely independent</strong> with unique layouts, styles, and component arrangements.
              They are designed to offer maximum customization within the tier one app limitations while using the EmbrKit design system.
            </p>
            <ul className="space-y-2">
              <li><strong>Different Layouts:</strong> Each template has a unique structure and component arrangement</li>
              <li><strong>Custom Color Schemes:</strong> Carefully selected color palettes for different industries</li>
              <li><strong>Unique Typography:</strong> Varied font weights, sizes, and hierarchies</li>
              <li><strong>Independent Styles:</strong> No shared visual elements between templates</li>
              <li><strong>Industry-Specific:</strong> Optimized for different business types and use cases</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
