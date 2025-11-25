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
  EmbrKitBadge
} from '@embr/ui'

const theme = {
  primaryColor: '#DC2626',
  secondaryColor: '#F59E0B',
  backgroundColor: '#fffbeb',
  surfaceColor: '#fef3c7',
  textColor: '#1a1a1a',
  textSecondaryColor: '#78716c',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Beverages' }
]

const menuItems = [
  {
    id: 1,
    name: 'Burrata & Heirloom Tomatoes',
    category: 'appetizers',
    price: '$16',
    description: 'Fresh burrata, heirloom tomatoes, basil, aged balsamic, extra virgin olive oil',
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1608877907149-79b0946e7c7f?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Tuna Tartare',
    category: 'appetizers',
    price: '$18',
    description: 'Ahi tuna, avocado, cucumber, sesame, soy-ginger dressing, wonton crisps',
    dietary: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Grilled Atlantic Salmon',
    category: 'mains',
    price: '$32',
    description: 'Pan-seared salmon, roasted vegetables, lemon beurre blanc, microgreens',
    popular: true,
    dietary: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Ribeye Steak',
    category: 'mains',
    price: '$48',
    description: '12oz USDA Prime ribeye, truffle mashed potatoes, asparagus, red wine reduction',
    popular: true,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Wild Mushroom Risotto',
    category: 'mains',
    price: '$28',
    description: 'Arborio rice, porcini & chanterelle mushrooms, parmesan, truffle oil',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1476124369491-b79c338bbf32?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Pan-Seared Scallops',
    category: 'mains',
    price: '$36',
    description: 'Diver scallops, cauliflower puree, crispy prosciutto, brown butter',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: '$12',
    description: 'Warm Belgian chocolate cake, vanilla ice cream, raspberry coulis',
    popular: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Crème Brûlée',
    category: 'desserts',
    price: '$10',
    description: 'Classic vanilla custard, caramelized sugar, fresh berries',
    dietary: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'Seasonal Fruit Tart',
    category: 'desserts',
    price: '$11',
    description: 'Buttery tart shell, pastry cream, seasonal fresh fruits, honey glaze',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop'
  },
  {
    id: 10,
    name: 'Craft Cocktails',
    category: 'drinks',
    price: '$14',
    description: 'Signature cocktails crafted by our mixologist. Ask your server for today\'s selection',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    name: 'Wine Selection',
    category: 'drinks',
    price: '$12-38',
    description: 'Curated wine list featuring domestic and international varietals. Glass or bottle',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    name: 'Artisan Coffee',
    category: 'drinks',
    price: '$5',
    description: 'Locally roasted espresso, cappuccino, latte, or drip coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
  }
]

export default function MenuCatalogTemplate() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-amber-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">TR</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">The Reserve</h1>
                  <p className="text-sm text-gray-600">Modern American Cuisine</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                ← Back
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-16">
          <EmbrKitContainer>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl font-bold mb-4">Dinner Menu</h2>
              <p className="text-lg text-red-50 mb-6">
                Farm-to-table ingredients, expertly prepared by our award-winning culinary team
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                  Make Reservation
                </button>
                <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View Wine List
                </button>
              </div>
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Category Navigation */}
          <div className="mb-10">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <EmbrKitCard
                key={item.id}
                variant="elevated"
                className="hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Placeholder for image */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center px-4">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/50 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {item.popular && (
                      <EmbrKitBadge variant="error" className="mb-2">
                        Popular
                      </EmbrKitBadge>
                    )}
                  </div>
                </div>

                <EmbrKitCardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {item.dietary.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xl font-bold text-red-600 ml-4">{item.price}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <EmbrKitButton className="w-full" variant="primary">
                    Add to Order
                  </EmbrKitButton>
                </EmbrKitCardContent>
              </EmbrKitCard>
            ))}
          </EmbrKitGrid>

          {/* Restaurant Info */}
          <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Location</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  456 Culinary Boulevard<br />
                  Downtown District<br />
                  San Francisco, CA 94102
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Hours</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Monday - Thursday: 5:00 PM - 10:00 PM<br />
                  Friday - Saturday: 5:00 PM - 11:00 PM<br />
                  Sunday: 4:00 PM - 9:00 PM
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Contact</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Phone: (555) 789-0123<br />
                  Email: reservations@thereserve.com<br />
                  <br />
                  <span className="text-red-600 font-semibold">Reservations Recommended</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-2">The Reserve</h2>
            <p className="text-gray-400 mb-4">Modern American Cuisine</p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Menu</a>
              <a href="#" className="hover:text-white">Reservations</a>
              <a href="#" className="hover:text-white">Private Events</a>
              <a href="#" className="hover:text-white">Gift Cards</a>
            </div>
            <p className="text-gray-500 text-sm mt-8">© 2025 The Reserve. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
