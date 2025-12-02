'use client'

import React from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitGrid, EmbrKitCard, EmbrKitCardContent } from '@embr/ui'

const theme = {
  primaryColor: '#059669',
  secondaryColor: '#10B981',
  backgroundColor: '#f0fdf4',
  surfaceColor: '#dcfce7',
  textColor: '#064e3b',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const menuCategories = [
  {
    title: 'Signature Bowls',
    items: [
      {
        name: 'Green Goddess Bowl',
        price: '$16',
        tag: 'Vegan',
        description: 'Quinoa, kale, avocado, chickpeas, tahini goddess dressing, hemp seeds'
      },
      {
        name: 'Açai Power Bowl',
        price: '$14',
        tag: 'Organic',
        description: 'Açai blend, banana, berries, granola, coconut, almond butter, bee pollen'
      },
      {
        name: 'Mediterranean Bowl',
        price: '$15',
        tag: 'Gluten-Free',
        description: 'Brown rice, falafel, hummus, cucumber, tomato, olives, lemon tahini'
      },
      {
        name: 'Buddha Bowl',
        price: '$17',
        tag: 'Popular',
        description: 'Sweet potato, edamame, purple cabbage, avocado, sesame ginger dressing'
      }
    ]
  },
  {
    title: 'Toasts & Sandwiches',
    items: [
      {
        name: 'Avocado Toast',
        price: '$12',
        tag: 'Popular',
        description: 'Sourdough, smashed avocado, cherry tomatoes, microgreens, olive oil'
      },
      {
        name: 'Mushroom Toast',
        price: '$13',
        tag: 'Vegan',
        description: 'Multigrain, sautéed mushrooms, garlic, thyme, balsamic reduction'
      },
      {
        name: 'Veggie Wrap',
        price: '$14',
        tag: 'Raw',
        description: 'Collard wrap, hummus, carrots, sprouts, bell peppers, tahini drizzle'
      }
    ]
  },
  {
    title: 'Fresh Juices',
    items: [
      {
        name: 'Green Juice',
        price: '$9',
        tag: 'Detox',
        description: 'Kale, cucumber, celery, green apple, lemon, ginger'
      },
      {
        name: 'Beet Juice',
        price: '$9',
        tag: 'Energy',
        description: 'Beet, carrot, apple, orange, turmeric'
      },
      {
        name: 'Citrus Boost',
        price: '$8',
        tag: 'Vitamin C',
        description: 'Orange, grapefruit, lemon, mint'
      }
    ]
  },
  {
    title: 'Smoothies',
    items: [
      {
        name: 'Tropical Green',
        price: '$10',
        tag: 'Vegan',
        description: 'Spinach, mango, pineapple, banana, coconut water'
      },
      {
        name: 'Berry Bliss',
        price: '$11',
        tag: 'Antioxidant',
        description: 'Mixed berries, banana, almond milk, flax seeds'
      },
      {
        name: 'Chocolate Protein',
        price: '$12',
        tag: 'Protein',
        description: 'Cacao, banana, peanut butter, dates, oat milk, plant protein'
      }
    ]
  }
]

export default function MenuFresh() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-green-50">
        <header className="bg-white border-b border-green-200">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-900">Fresh & Green</h1>
                <p className="text-sm text-green-700 font-medium">100% Plant-Based Kitchen</p>
              </div>
            </div>
            <Link href="/templates-showcase" className="text-sm px-5 py-2 border border-green-300 hover:bg-green-50 rounded-lg font-semibold transition-colors">
              Back
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-16 text-white text-center mb-16 shadow-xl">
            <h2 className="text-5xl font-bold mb-4">100% Plant-Based</h2>
            <p className="text-xl text-green-100 mb-6">Fresh, organic, and locally sourced ingredients</p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Organic Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Non-GMO</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Locally Sourced</span>
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          {menuCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-16">
              <h3 className="text-3xl font-bold text-green-900 mb-8">{category.title}</h3>
              <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {item.tag}
                      </span>
                      <span className="text-2xl font-bold text-green-600">{item.price}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </EmbrKitGrid>
            </div>
          ))}

          {/* Info Footer */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-green-900 mb-3 text-lg">Location</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  789 Wellness Way<br />
                  Venice Beach, CA 90291<br />
                  <a href="tel:555-123-4567" className="text-green-600 hover:text-green-700">
                    (555) 123-4567
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-3 text-lg">Hours</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Monday - Friday: 7:00 AM - 7:00 PM<br />
                  Saturday - Sunday: 8:00 AM - 6:00 PM<br />
                  <span className="text-green-600 font-semibold">Open Daily</span>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-3 text-lg">Delivery</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Free delivery on orders over $25<br />
                  Order via our app or website<br />
                  <span className="text-green-600 font-semibold">Same-day available</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-green-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Fresh & Green</h2>
            <p className="text-green-300 mb-6">Nourishing Your Body, Naturally</p>
            <div className="flex justify-center gap-8 text-sm text-green-300">
              <a href="#" className="hover:text-white transition-colors">Menu</a>
              <a href="#" className="hover:text-white transition-colors">Catering</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-green-600 text-sm mt-8">© 2025 Fresh & Green. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
