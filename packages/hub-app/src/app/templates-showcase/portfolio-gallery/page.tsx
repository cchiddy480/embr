'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitBadge
} from '@embr/ui'

const theme = {
  primaryColor: '#1F2937',
  secondaryColor: '#6B7280',
  backgroundColor: '#f9fafb',
  surfaceColor: '#ffffff',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'sharp' as const,
  materialStyle: 'flat' as const
}

const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'portrait', name: 'Portraits' },
  { id: 'landscape', name: 'Landscapes' },
  { id: 'urban', name: 'Urban' },
  { id: 'abstract', name: 'Abstract' }
]

const portfolio = [
  { id: 1, title: 'Golden Hour', category: 'portrait', year: '2024', featured: true, emoji: '🌅', desc: 'Natural light portrait series' },
  { id: 2, title: 'City Lights', category: 'urban', year: '2024', emoji: '🏙️', desc: 'Urban architecture at night' },
  { id: 3, title: 'Mountain Vista', category: 'landscape', year: '2023', emoji: '🏔️', desc: 'Alpine landscape collection' },
  { id: 4, title: 'Reflections', category: 'abstract', year: '2024', featured: true, emoji: '💧', desc: 'Water reflection series' },
  { id: 5, title: 'Street Stories', category: 'urban', year: '2023', emoji: '🚶', desc: 'Urban life documentation' },
  { id: 6, title: 'Natural Beauty', category: 'portrait', year: '2024', emoji: '👤', desc: 'Studio portrait series' },
  { id: 7, title: 'Coastal Dreams', category: 'landscape', year: '2023', emoji: '🌊', desc: 'Ocean photography' },
  { id: 8, title: 'Geometric', category: 'abstract', year: '2024', emoji: '◼️', desc: 'Abstract compositions' },
  { id: 9, title: 'Skyline', category: 'urban', year: '2024', emoji: '🌆', desc: 'City skyline series' }
]

export default function PortfolioGalleryTemplate() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredWork = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory)

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Alex Morgan</h1>
                <p className="text-gray-600">Visual Artist & Photographer</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-sm font-medium transition-colors">
                Back
              </Link>
            </div>

            {/* Category Filter */}
            <div className="flex gap-6 border-b border-gray-200">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`pb-4 px-2 font-medium transition-all relative ${
                    selectedCategory === category.id
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredWork.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square bg-gray-200 mb-4 overflow-hidden">
                  {/* Image Placeholder with Emoji */}
                  <div className="absolute inset-0 flex items-center justify-center text-8xl bg-gradient-to-br from-gray-100 to-gray-200">
                    {item.emoji}
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{item.desc}</p>
                      <span className="text-xs text-gray-400">{item.year}</span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white text-gray-900 text-xs font-bold uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Title and Info */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.year} • {categories.find(c => c.id === item.category)?.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="border-t border-gray-200 pt-16">
            <EmbrKitGrid cols={1} gap={12} className="md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
                <div className="prose prose-gray">
                  <p className="text-gray-600 mb-4">
                    I'm a visual artist and photographer based in San Francisco, specializing in capturing the beauty
                    of everyday moments through a unique perspective.
                  </p>
                  <p className="text-gray-600 mb-4">
                    My work has been featured in galleries across the United States and published in various
                    international photography magazines.
                  </p>
                  <p className="text-gray-600">
                    I believe that great photography is about telling stories and evoking emotions,
                    not just creating pretty pictures.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Recognition</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-900 pl-4">
                    <h4 className="font-bold text-gray-900">Photography Award 2024</h4>
                    <p className="text-sm text-gray-600">International Photography Association</p>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <h4 className="font-bold text-gray-900">Featured Artist</h4>
                    <p className="text-sm text-gray-600">Modern Art Gallery, 2023</p>
                  </div>
                  <div className="border-l-4 border-gray-900 pl-4">
                    <h4 className="font-bold text-gray-900">Best Portrait Series</h4>
                    <p className="text-sm text-gray-600">Portrait Magazine, 2023</p>
                  </div>
                </div>
              </div>
            </EmbrKitGrid>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gray-900 text-white p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Let's Work Together</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm available for commissions, collaborations, and exhibitions.
              Get in touch to discuss your next project.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <EmbrKitButton variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                View Full Portfolio
              </EmbrKitButton>
              <EmbrKitButton variant="secondary" className="border-2 border-white text-white bg-transparent hover:bg-white/10">
                Contact Me
              </EmbrKitButton>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
