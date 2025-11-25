'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardHeader,
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
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'mains', name: 'Main Courses', icon: '🍝' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🍹' }
]

const menuItems = [
  { id: 1, name: 'Caesar Salad', category: 'appetizers', price: '$12', description: 'Fresh romaine, parmesan, croutons, classic dressing', popular: true, image: '🥗' },
  { id: 2, name: 'Bruschetta', category: 'appetizers', price: '$10', description: 'Toasted bread, tomatoes, basil, olive oil', image: '🥖' },
  { id: 3, name: 'Margherita Pizza', category: 'mains', price: '$18', description: 'Fresh mozzarella, tomato sauce, basil', popular: true, image: '🍕' },
  { id: 4, name: 'Spaghetti Carbonara', category: 'mains', price: '$22', description: 'Pancetta, eggs, pecorino romano, black pepper', image: '🍝' },
  { id: 5, name: 'Grilled Salmon', category: 'mains', price: '$28', description: 'Atlantic salmon, seasonal vegetables, lemon butter', new: true, image: '🐟' },
  { id: 6, name: 'Ribeye Steak', category: 'mains', price: '$35', description: 'USDA Prime, garlic mashed potatoes, asparagus', popular: true, image: '🥩' },
  { id: 7, name: 'Tiramisu', category: 'desserts', price: '$10', description: 'Classic Italian dessert, espresso, mascarpone', image: '🍰' },
  { id: 8, name: 'Chocolate Lava Cake', category: 'desserts', price: '$12', description: 'Warm chocolate cake, vanilla ice cream', popular: true, image: '🍫' },
  { id: 9, name: 'Panna Cotta', category: 'desserts', price: '$9', description: 'Vanilla cream, berry compote', image: '🍮' },
  { id: 10, name: 'Espresso', category: 'drinks', price: '$4', description: 'Rich Italian espresso', image: '☕' },
  { id: 11, name: 'Cappuccino', category: 'drinks', price: '$5', description: 'Espresso, steamed milk, foam', image: '☕' },
  { id: 12, name: 'Fresh Juice', category: 'drinks', price: '$6', description: 'Orange, grapefruit, or mixed berry', new: true, image: '🧃' }
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
                <div className="text-4xl">🍴</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Bella Cucina</h1>
                  <p className="text-sm text-gray-600">Authentic Italian Cuisine</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-12">
          <EmbrKitContainer>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
              <p className="text-lg text-red-50">
                Handcrafted dishes made with love and the finest ingredients
              </p>
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Category Navigation */}
          <div className="mb-10">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-red-200 hover:bg-red-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-sm">{category.name}</div>
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
                {/* Item Image/Icon */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-7xl mb-4">{item.image}</div>
                  {item.popular && (
                    <EmbrKitBadge variant="error" className="mb-2">
                      ⭐ Popular
                    </EmbrKitBadge>
                  )}
                  {item.new && (
                    <EmbrKitBadge variant="warning" className="mb-2">
                      ✨ New
                    </EmbrKitBadge>
                  )}
                </div>

                <EmbrKitCardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-xl font-bold text-red-600">{item.price}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <EmbrKitButton className="w-full" variant="primary">
                    Add to Order
                  </EmbrKitButton>
                </EmbrKitCardContent>
              </EmbrKitCard>
            ))}
          </EmbrKitGrid>

          {/* Special Offers Section */}
          <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white">
            <EmbrKitGrid cols={1} gap={8} className="md:grid-cols-2">
              <div>
                <h3 className="text-3xl font-bold mb-4">Special Lunch Menu</h3>
                <p className="text-red-50 mb-6 text-lg">
                  Monday - Friday 11:00 AM - 3:00 PM
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Any pasta + salad + drink: $20</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Pizza slice + soup + drink: $15</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Chef's choice of the day: $18</span>
                  </li>
                </ul>
                <EmbrKitButton variant="secondary" className="bg-white text-red-600 hover:bg-red-50">
                  View Lunch Menu
                </EmbrKitButton>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-2xl font-bold mb-4">🎉 Happy Hour</h4>
                <p className="text-red-50 mb-4">
                  Every day 4:00 PM - 6:00 PM
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>House Wine</span>
                    <span className="font-bold">$6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Draft Beer</span>
                    <span className="font-bold">$5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cocktails</span>
                    <span className="font-bold">$8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Appetizers</span>
                    <span className="font-bold">50% OFF</span>
                  </div>
                </div>
              </div>
            </EmbrKitGrid>
          </div>

          {/* Info Cards */}
          <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-3 mt-12">
            <EmbrKitCard variant="elevated">
              <EmbrKitCardContent className="p-6 text-center">
                <div className="text-4xl mb-3">📍</div>
                <h4 className="font-bold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600 text-sm">
                  123 Main Street<br />
                  Downtown, CA 94102
                </p>
              </EmbrKitCardContent>
            </EmbrKitCard>

            <EmbrKitCard variant="elevated">
              <EmbrKitCardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🕐</div>
                <h4 className="font-bold text-gray-900 mb-2">Hours</h4>
                <p className="text-gray-600 text-sm">
                  Mon-Fri: 11 AM - 10 PM<br />
                  Sat-Sun: 10 AM - 11 PM
                </p>
              </EmbrKitCardContent>
            </EmbrKitCard>

            <EmbrKitCard variant="elevated">
              <EmbrKitCardContent className="p-6 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
                <p className="text-gray-600 text-sm">
                  (555) 123-4567<br />
                  hello@bellacucina.com
                </p>
              </EmbrKitCardContent>
            </EmbrKitCard>
          </EmbrKitGrid>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
