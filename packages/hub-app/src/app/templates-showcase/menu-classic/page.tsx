'use client'

import React from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid, EmbrKitCard, EmbrKitCardContent } from '@embr/ui'

const theme = {
  primaryColor: '#92400E',
  secondaryColor: '#B45309',
  backgroundColor: '#fef3c7',
  surfaceColor: '#fef9e7',
  textColor: '#78350f',
  textSecondaryColor: '#92400e',
  fontFamily: 'Georgia, serif',
  headingFontFamily: 'Georgia',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const menuCategories = [
  {
    title: 'Starters & Appetizers',
    items: [
      {
        name: 'French Onion Soup',
        price: '$12',
        tag: 'Classic',
        description: 'Caramelized onions in beef broth, topped with gruyère and toasted baguette'
      },
      {
        name: 'Caesar Salad',
        price: '$14',
        tag: 'Signature',
        description: 'Crisp romaine, parmesan, croutons, classic caesar dressing'
      },
      {
        name: 'Escargots de Bourgogne',
        price: '$18',
        tag: 'Traditional',
        description: 'Burgundy snails with garlic-parsley butter, served with rustic bread'
      }
    ]
  },
  {
    title: 'Main Courses',
    items: [
      {
        name: 'Filet Mignon',
        price: '$48',
        tag: 'Prime Cut',
        description: '8oz center-cut tenderloin, béarnaise sauce, seasonal vegetables, pommes dauphine'
      },
      {
        name: 'Coq au Vin',
        price: '$36',
        tag: 'House Special',
        description: 'Braised chicken in red wine sauce with pearl onions, mushrooms, bacon lardons'
      },
      {
        name: 'Pan-Seared Salmon',
        price: '$34',
        tag: 'Chef\'s Choice',
        description: 'Atlantic salmon, lemon beurre blanc, asparagus, wild rice pilaf'
      },
      {
        name: 'Beef Bourguignon',
        price: '$42',
        tag: 'Traditional',
        description: 'Slow-braised beef in burgundy wine with root vegetables, served over egg noodles'
      },
      {
        name: 'Duck Confit',
        price: '$38',
        tag: 'Classic',
        description: 'Crispy duck leg with cherry gastrique, garlic mashed potatoes, haricots verts'
      }
    ]
  },
  {
    title: 'Desserts',
    items: [
      {
        name: 'Crème Brûlée',
        price: '$12',
        tag: 'Classic',
        description: 'Vanilla custard with caramelized sugar crust, fresh berries'
      },
      {
        name: 'Chocolate Soufflé',
        price: '$14',
        tag: 'Signature',
        description: 'Dark chocolate soufflé, vanilla anglaise, served warm'
      },
      {
        name: 'Tarte Tatin',
        price: '$13',
        tag: 'Traditional',
        description: 'Upside-down caramelized apple tart with vanilla ice cream'
      }
    ]
  }
]

export default function MenuClassicTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-amber-50">
        <header className="bg-gradient-to-b from-amber-100 to-amber-50 border-b-2 border-amber-300">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between">
              <div className="text-center flex-grow">
                <div className="w-20 h-20 mx-auto mb-4 bg-amber-900 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fef3c7" strokeWidth="1.5">
                    <path d="M8.7 3A6 6 0 0 1 14 8.29V10h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2V8.3A6 6 0 0 1 8.7 3zM12 4a5 5 0 0 0-2 9.58V18h4v-4.42A5 5 0 0 0 12 4z"/>
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-amber-900 mb-2" style={{fontFamily: 'Georgia, serif'}}>La Maison</h1>
                <p className="text-xl text-amber-800 italic">Fine French Cuisine</p>
                <p className="text-sm text-amber-700 mt-3">Est. 1987 • New York City</p>
              </div>
              <Link href="/templates-showcase" className="absolute top-6 right-6 text-sm px-5 py-2 border-2 border-amber-800 hover:bg-amber-100 font-semibold transition-colors text-amber-900">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12">
          {/* Introduction */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="w-16 h-0.5 bg-amber-800 mx-auto mb-6"></div>
            <p className="text-lg text-amber-900 leading-relaxed italic">
              Since 1987, La Maison has been serving authentic French cuisine in an elegant, timeless atmosphere.
              Our classically trained chefs prepare each dish with the finest ingredients and meticulous attention
              to tradition.
            </p>
            <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6"></div>
          </div>

          {/* Menu Categories */}
          {menuCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-16">
              <div className="text-center mb-10">
                <div className="w-24 h-0.5 bg-amber-800 mx-auto mb-4"></div>
                <h2 className="text-4xl font-bold text-amber-900" style={{fontFamily: 'Georgia, serif'}}>
                  {category.title}
                </h2>
                <div className="w-24 h-0.5 bg-amber-800 mx-auto mt-4"></div>
              </div>

              <div className="space-y-8">
                {category.items.map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-amber-200 p-8 hover:border-amber-400 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-amber-900" style={{fontFamily: 'Georgia, serif'}}>
                            {item.name}
                          </h3>
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-300">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          {item.description}
                        </p>
                      </div>
                      <div className="ml-6 flex-shrink-0">
                        <span className="text-2xl font-bold text-amber-900">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Wine Pairing Note */}
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300 p-10 text-center mb-16">
            <svg className="w-12 h-12 mx-auto mb-4 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 3v6c0 2.97 2.16 5.43 5 5.91V19H8v2h8v-2h-3v-4.09c2.84-.48 5-2.94 5-5.91V3H6zm10 6c0 2.21-1.79 4-4 4s-4-1.79-4-4V5h8v4z"/>
            </svg>
            <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{fontFamily: 'Georgia, serif'}}>
              Wine Pairings Available
            </h3>
            <p className="text-amber-900 max-w-2xl mx-auto leading-relaxed">
              Our sommelier has curated an extensive wine list featuring both old-world classics
              and new-world discoveries. Ask your server for pairing recommendations.
            </p>
          </div>

          {/* Info Footer */}
          <div className="border-t-2 border-amber-300 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="font-bold text-amber-900 mb-3 text-lg" style={{fontFamily: 'Georgia, serif'}}>Location</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  125 Madison Avenue<br />
                  New York, NY 10016<br />
                  <a href="tel:212-555-0123" className="text-amber-900 hover:text-amber-700 font-semibold">
                    (212) 555-0123
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-3 text-lg" style={{fontFamily: 'Georgia, serif'}}>Hours</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Tuesday - Saturday<br />
                  Dinner: 5:00 PM - 10:00 PM<br />
                  <span className="text-amber-900 font-semibold">Reservations Recommended</span>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-3 text-lg" style={{fontFamily: 'Georgia, serif'}}>Dress Code</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Business Casual<br />
                  Jackets Preferred<br />
                  <span className="text-amber-900 font-semibold">Elegant Dining Experience</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-amber-900 text-amber-100 py-12 mt-16 border-t-4 border-amber-950">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-2 text-amber-50" style={{fontFamily: 'Georgia, serif'}}>La Maison</h2>
            <p className="text-amber-200 mb-6 italic">The Art of French Dining</p>
            <div className="flex justify-center gap-8 text-sm text-amber-200">
              <a href="#" className="hover:text-white transition-colors">Menu</a>
              <a href="#" className="hover:text-white transition-colors">Private Events</a>
              <a href="#" className="hover:text-white transition-colors">Reservations</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-amber-400 text-sm mt-8">© 2025 La Maison. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
