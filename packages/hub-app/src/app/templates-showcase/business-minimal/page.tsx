'use client'

import React from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitButton,
  EmbrKitStatCard,
  EmbrKitInput,
  EmbrKitTextarea
} from '@embr/ui'

const theme = {
  primaryColor: '#1F2937',
  secondaryColor: '#6B7280',
  backgroundColor: '#ffffff',
  surfaceColor: '#f9fafb',
  textColor: '#111827',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'sharp' as const,
  materialStyle: 'flat' as const
}

const services = [
  { title: 'Strategy', description: 'Business planning and strategic consulting', icon: '📋' },
  { title: 'Execution', description: 'Implementation and project management', icon: '⚡' },
  { title: 'Analysis', description: 'Data analysis and performance metrics', icon: '📈' },
  { title: 'Growth', description: 'Scaling and market expansion', icon: '🚀' }
]

export default function BusinessMinimal() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black"></div>
                <span className="text-xl font-bold">MINIMAL</span>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 border border-gray-300 hover:bg-gray-50 font-medium transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        <section className="py-32">
          <EmbrKitContainer>
            <div className="max-w-3xl">
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Less is More
              </h1>
              <p className="text-xl text-gray-600 mb-10">
                We help businesses cut through the noise with clear strategy, precise execution, and measurable results.
              </p>
              <EmbrKitButton className="px-8 py-4">Start a Project</EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </section>

        <section className="py-20 border-t border-gray-200">
          <EmbrKitContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-8">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </section>

        <section className="py-32 bg-gray-900 text-white">
          <EmbrKitContainer>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Let's Talk</h2>
              <p className="text-gray-300 mb-8">Get in touch to discuss your next project.</p>
              <EmbrKitButton variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                Contact Us
              </EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </section>
      </div>
    </EmbrKitProvider>
  )
}
