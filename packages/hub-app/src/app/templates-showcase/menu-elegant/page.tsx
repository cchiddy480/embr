'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid } from '@embr/ui'

const theme = {
  primaryColor: '#1F2937',
  secondaryColor: '#D4AF37',
  backgroundColor: '#0a0a0a',
  surfaceColor: '#1a1a1a',
  textColor: '#f5f5f5',
  textSecondaryColor: '#a3a3a3',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const menuSections = [
  {
    title: 'First Course',
    items: [
      {
        name: 'Oysters Rockefeller',
        price: '$24',
        description: 'Six fresh oysters, spinach, Pernod, hollandaise, breadcrumbs'
      },
      {
        name: 'Foie Gras Torchon',
        price: '$32',
        description: 'Duck foie gras, brioche, fig compote, aged balsamic'
      },
      {
        name: 'Tuna Tartare',
        price: '$26',
        description: 'Yellowfin tuna, avocado, caviar, sesame tuile'
      },
      {
        name: 'French Onion Soup',
        price: '$18',
        description: 'Caramelized onions, beef consommé, gruyère, sourdough'
      }
    ]
  },
  {
    title: 'Main Course',
    items: [
      {
        name: 'Wagyu Filet Mignon',
        price: '$65',
        description: '8oz Japanese A5 wagyu, truffle butter, asparagus, pommes purée',
        signature: true
      },
      {
        name: 'Chilean Sea Bass',
        price: '$52',
        description: 'Pan-seared, saffron beurre blanc, fennel, fingerling potatoes'
      },
      {
        name: 'Rack of Lamb',
        price: '$58',
        description: 'Herb-crusted Colorado lamb, mint demiglace, seasonal vegetables',
        signature: true
      },
      {
        name: 'Maine Lobster Thermidor',
        price: '$68',
        description: 'Whole lobster, cognac cream, gruyère, herb crust'
      },
      {
        name: 'Duck à l\'Orange',
        price: '$48',
        description: 'Roasted duck breast, orange gastrique, wild rice, baby carrots'
      },
      {
        name: 'Mushroom Wellington',
        price: '$42',
        description: 'Wild mushroom duxelles, puff pastry, truffle sauce, roasted vegetables'
      }
    ]
  },
  {
    title: 'Desserts',
    items: [
      {
        name: 'Crème Brûlée',
        price: '$16',
        description: 'Tahitian vanilla custard, caramelized sugar, fresh berries'
      },
      {
        name: 'Chocolate Soufflé',
        price: '$18',
        description: 'Dark chocolate soufflé, vanilla anglaise, gold leaf',
        signature: true
      },
      {
        name: 'Tarte Tatin',
        price: '$15',
        description: 'Caramelized apple tart, crème fraîche, calvados reduction'
      }
    ]
  }
]

export default function MenuElegant() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-4xl font-serif mb-2" style={{ color: '#D4AF37' }}>LUMIÈRE</div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Fine Dining Experience</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 border border-gray-700 hover:bg-gray-900 transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-20">
          {/* Hero */}
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-serif mb-6">Dinner Menu</h2>
            <div className="w-24 h-0.5 mx-auto mb-6" style={{ backgroundColor: '#D4AF37' }} />
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              An exquisite journey through contemporary French cuisine, featuring the finest ingredients
              and timeless culinary techniques
            </p>
          </div>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-20 last:mb-0">
              <div className="mb-12 text-center">
                <h3 className="text-3xl font-serif mb-4" style={{ color: '#D4AF37' }}>
                  {section.title}
                </h3>
                <div className="w-16 h-px mx-auto bg-gray-800" />
              </div>

              <div className="space-y-10">
                {section.items.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-900 pb-10 last:border-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-2xl font-serif">{item.name}</h4>
                          {item.signature && (
                            <span className="text-xs px-3 py-1 border uppercase tracking-wider" style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                              Signature
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                      <span className="text-2xl ml-8 flex-shrink-0" style={{ color: '#D4AF37' }}>
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Wine Pairing Note */}
          <div className="mt-20 p-8 border border-gray-800 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Sommelier's Selection</p>
            <p className="text-lg mb-4">Wine Pairing Available</p>
            <p className="text-sm text-gray-500">Our sommelier has curated pairings for each course</p>
          </div>

          {/* Restaurant Info */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-gray-800 pt-16">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Hours</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Tuesday - Saturday<br />
                5:30 PM - 10:30 PM<br />
                <span className="text-gray-500">Closed Sunday & Monday</span>
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Reservations</p>
              <p className="text-xl mb-2" style={{ color: '#D4AF37' }}>+1 (555) 789-0123</p>
              <p className="text-sm text-gray-500">reservations@lumiere.com</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Location</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                456 Park Avenue<br />
                New York, NY 10022<br />
                <span className="text-gray-500">Valet parking available</span>
              </p>
            </div>
          </div>

          {/* Chef's Note */}
          <div className="mt-20 text-center">
            <p className="text-sm text-gray-500 italic">
              *Menu items subject to seasonal availability. Chef's tasting menu available upon request.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-900 py-12 mt-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="text-2xl font-serif mb-2" style={{ color: '#D4AF37' }}>LUMIÈRE</div>
            <p className="text-sm text-gray-500 mb-6">© 2025 Lumière. All rights reserved.</p>
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">Menu</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Reservations</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Private Events</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Gift Cards</a>
            </div>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
