'use client'

import React from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitGrid, EmbrKitCard, EmbrKitCardContent, EmbrKitButton, EmbrKitStatCard } from '@embr/ui'

const theme = {
  primaryColor: '#1E40AF',
  secondaryColor: '#3B82F6',
  backgroundColor: '#ffffff',
  surfaceColor: '#eff6ff',
  textColor: '#1e293b',
  textSecondaryColor: '#64748b',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'soft' as const
}

export default function BusinessCorporate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-blue-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-800 rounded"></div>
              <span className="text-xl font-bold text-blue-900">TechCorp</span>
            </div>
            <Link href="/templates-showcase" className="text-sm px-4 py-2 border border-blue-200 hover:bg-blue-50 rounded font-medium">
              Back
            </Link>
          </div>
        </header>

        <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
          <EmbrKitContainer>
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">Enterprise Solutions for Modern Business</h1>
              <p className="text-xl text-blue-100 mb-8">Trusted by Fortune 500 companies worldwide</p>
              <EmbrKitButton variant="secondary" className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-3">
                Request Demo
              </EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </section>

        <section className="py-16 bg-white">
          <EmbrKitContainer>
            <EmbrKitGrid cols={3} gap={8}>
              <EmbrKitCard>
                <EmbrKitCardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Enterprise Grade</h3>
                  <p className="text-gray-600">Built for scale and reliability</p>
                </EmbrKitCardContent>
              </EmbrKitCard>
              <EmbrKitCard>
                <EmbrKitCardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Secure</h3>
                  <p className="text-gray-600">Bank-level security standards</p>
                </EmbrKitCardContent>
              </EmbrKitCard>
              <EmbrKitCard>
                <EmbrKitCardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Always here to help</p>
                </EmbrKitCardContent>
              </EmbrKitCard>
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>
      </div>
    </EmbrKitProvider>
  )
}
