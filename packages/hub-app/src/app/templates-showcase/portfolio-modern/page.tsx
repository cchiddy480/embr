'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitGrid
} from '@embr/ui'

const theme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  backgroundColor: '#eff6ff',
  surfaceColor: '#ffffff',
  textColor: '#1e3a8a',
  textSecondaryColor: '#3b82f6',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'glass' as const
}

const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'ux', name: 'UX Design' },
  { id: 'branding', name: 'Branding' },
  { id: 'digital', name: 'Digital Art' }
]

const portfolio = [
  { id: 1, title: 'FinTech Dashboard', category: 'ux', year: '2024', featured: true, tools: 'Figma, React' },
  { id: 2, title: 'Startup Identity', category: 'branding', year: '2024', tools: 'Illustrator, Photoshop' },
  { id: 3, title: 'Abstract Composition', category: 'digital', year: '2023', tools: 'Procreate, Blender' },
  { id: 4, title: 'E-Commerce Platform', category: 'ux', year: '2024', featured: true, tools: 'Figma, Framer' },
  { id: 5, title: 'Brand System', category: 'branding', year: '2023', tools: 'Illustrator' },
  { id: 6, title: 'Generative Art', category: 'digital', year: '2024', tools: 'p5.js, Touch Designer' },
  { id: 7, title: 'Mobile Banking App', category: 'ux', year: '2024', featured: true, tools: 'Figma, Principle' },
  { id: 8, title: 'Motion Graphics', category: 'digital', year: '2024', tools: 'After Effects' }
]

export default function PortfolioModernTemplate() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredWork = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory)

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-lg border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Taylor Kim
                </h1>
                <p className="text-xl text-blue-900">Digital Designer & Creative Technologist</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full font-semibold transition-colors">
                Back
              </Link>
            </div>

            {/* Category Filter */}
            <div className="flex gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-200'
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
                className="group cursor-pointer"
              >
                <div className="relative aspect-square bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 rounded-3xl overflow-hidden border-2 border-blue-200 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl">
                  {/* Image Placeholder Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 text-blue-200">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 to-purple-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-blue-200 mb-2">{item.tools}</p>
                      <p className="text-sm text-blue-300">{item.year}</p>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-bold rounded-full">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Title and Info */}
                <div className="mt-4">
                  <h3 className="font-bold text-blue-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-blue-600">{item.year} • {categories.find(c => c.id === item.category)?.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="border-t-2 border-blue-300 pt-16">
            <EmbrKitGrid cols={1} gap={12} className="md:grid-cols-2">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  About
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                    I'm a digital designer and creative technologist exploring the intersection of
                    design, technology, and human experience.
                  </p>
                  <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                    With expertise spanning UX design, brand identity, and digital art, I create
                    experiences that are both beautiful and functional.
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Based in San Francisco, I collaborate with startups and established brands to
                    bring innovative ideas to life.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Recognition
                </h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 text-lg">Awwwards Site of the Day</h4>
                    <p className="text-gray-700">Best UX Design, 2024</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 text-lg">Adobe Design Achievement Award</h4>
                    <p className="text-gray-700">Emerging Talent, 2023</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-900 text-lg">Design Week Featured</h4>
                    <p className="text-gray-700">Top 10 Designers to Watch, 2023</p>
                  </div>
                </div>
              </div>
            </EmbrKitGrid>
          </div>

          {/* Contact CTA */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-16 text-center rounded-3xl">
            <h3 className="text-4xl font-bold mb-6">Let's Build Something Amazing</h3>
            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
              Open to new projects and collaborations. Let's create experiences that matter.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-10 py-4 bg-white text-blue-600 text-lg font-bold hover:bg-blue-50 transition-colors rounded-full shadow-lg">
                View Full Portfolio
              </button>
              <button className="px-10 py-4 border-2 border-white text-white text-lg font-bold hover:bg-white/10 transition-colors rounded-full">
                Contact Me
              </button>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
