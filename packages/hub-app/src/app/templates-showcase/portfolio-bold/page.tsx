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
  primaryColor: '#DC2626',
  secondaryColor: '#D4AF37',
  backgroundColor: '#fef2f2',
  surfaceColor: '#ffffff',
  textColor: '#7f1d1d',
  textSecondaryColor: '#991b1b',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'sharp' as const,
  materialStyle: 'elevated' as const
}

const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'editorial', name: 'Editorial' },
  { id: 'personal', name: 'Personal' }
]

const portfolio = [
  { id: 1, title: 'Brand Evolution', category: 'commercial', year: '2024', featured: true, client: 'Fortune 500 Tech' },
  { id: 2, title: 'Magazine Feature', category: 'editorial', year: '2024', client: 'Vogue Magazine' },
  { id: 3, title: 'Creative Exploration', category: 'personal', year: '2023', client: 'Personal Project' },
  { id: 4, title: 'Product Launch', category: 'commercial', year: '2024', featured: true, client: 'Luxury Automotive' },
  { id: 5, title: 'Cover Story', category: 'editorial', year: '2023', client: 'GQ International' },
  { id: 6, title: 'Artistic Vision', category: 'personal', year: '2024', client: 'Gallery Exhibition' },
  { id: 7, title: 'Campaign 2024', category: 'commercial', year: '2024', client: 'Global Fashion Brand' },
  { id: 8, title: 'Editorial Series', category: 'editorial', year: '2024', featured: true, client: 'Elle Magazine' }
]

export default function PortfolioBoldTemplate() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredWork = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory)

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-red-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-700 to-red-600 text-white border-b-4 border-yellow-600">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-6xl font-bold mb-2">Marcus Reed</h1>
                <p className="text-2xl text-red-200">Commercial & Editorial Photographer</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-white text-red-700 hover:bg-red-50 font-bold transition-colors">
                Back
              </Link>
            </div>

            {/* Category Filter */}
            <div className="flex gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 font-bold transition-all border-2 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-500 text-gray-900 border-yellow-600'
                      : 'bg-red-800 text-white border-red-900 hover:bg-red-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredWork.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer relative"
              >
                <div className="relative aspect-[3/4] bg-gradient-to-br from-red-100 via-white to-yellow-50 overflow-hidden border-4 border-red-800 hover:border-yellow-600 transition-all duration-300">
                  {/* Image Placeholder Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 text-red-200">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-red-900/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                      <p className="text-yellow-400 font-bold mb-2 text-lg">{item.client}</p>
                      <p className="text-red-300">{item.year}</p>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-yellow-500 text-gray-900 font-bold border-2 border-yellow-600">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Title and Info */}
                <div className="mt-4">
                  <h3 className="font-bold text-red-900 text-xl mb-1">{item.title}</h3>
                  <p className="text-sm text-red-700">{item.year} • {categories.find(c => c.id === item.category)?.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="border-t-4 border-red-800 pt-16">
            <EmbrKitGrid cols={1} gap={12} className="md:grid-cols-2">
              <div>
                <h2 className="text-5xl font-bold text-red-900 mb-6">About</h2>
                <div className="prose prose-red max-w-none">
                  <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                    Award-winning photographer specializing in high-impact commercial and editorial work
                    that demands attention and drives results.
                  </p>
                  <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                    With over 15 years of experience, I've created campaigns for Fortune 500 brands and
                    editorial spreads for the world's leading publications.
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    My bold, distinctive style combines technical precision with artistic vision to
                    create images that resonate and inspire.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-5xl font-bold text-red-900 mb-6">Recognition</h2>
                <div className="space-y-6">
                  <div className="border-l-8 border-yellow-600 pl-6 py-2 bg-white">
                    <h4 className="font-bold text-red-900 text-xl">International Photography Award 2024</h4>
                    <p className="text-gray-700">Commercial Campaign of the Year</p>
                  </div>
                  <div className="border-l-8 border-yellow-600 pl-6 py-2 bg-white">
                    <h4 className="font-bold text-red-900 text-xl">Best Editorial Series 2023</h4>
                    <p className="text-gray-700">Press Photography Association</p>
                  </div>
                  <div className="border-l-8 border-yellow-600 pl-6 py-2 bg-white">
                    <h4 className="font-bold text-red-900 text-xl">Creative Excellence Award</h4>
                    <p className="text-gray-700">Art Directors Club, 2023</p>
                  </div>
                </div>
              </div>
            </EmbrKitGrid>
          </div>

          {/* Contact CTA */}
          <div className="mt-20 bg-gradient-to-r from-red-800 to-red-700 text-white p-16 text-center border-4 border-yellow-600">
            <h3 className="text-5xl font-bold mb-6">Let's Create Something Bold</h3>
            <p className="text-red-100 mb-10 max-w-2xl mx-auto text-xl">
              Available for commercial projects, editorial assignments, and creative collaborations.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button className="px-10 py-4 bg-yellow-500 text-gray-900 text-lg font-bold hover:bg-yellow-400 transition-colors border-2 border-yellow-600">
                View Full Portfolio
              </button>
              <button className="px-10 py-4 border-4 border-white text-white text-lg font-bold hover:bg-white/10 transition-colors">
                Get in Touch
              </button>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
