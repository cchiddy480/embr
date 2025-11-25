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
  {
    title: 'Strategic Planning',
    description: 'Clear roadmaps for sustainable growth and competitive advantage in your market.',
    features: ['Market Analysis', 'Competitive Research', 'Business Modeling']
  },
  {
    title: 'Operational Excellence',
    description: 'Streamlined processes and efficient execution to maximize productivity.',
    features: ['Process Design', 'Change Management', 'Performance Optimization']
  },
  {
    title: 'Data Intelligence',
    description: 'Analytics-driven insights that inform decision-making and drive results.',
    features: ['Business Intelligence', 'KPI Frameworks', 'Predictive Analytics']
  },
  {
    title: 'Growth Acceleration',
    description: 'Scalable strategies for rapid expansion while maintaining operational integrity.',
    features: ['Market Expansion', 'Revenue Growth', 'Partnership Development']
  }
]

const stats = [
  { value: '250+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '$2.5B+', label: 'Value Created' },
  { value: '15', label: 'Countries Served' }
]

const clients = [
  'Fortune 500 Technology Leader',
  'Global Financial Services Provider',
  'Leading Healthcare Organization',
  'International Retail Corporation'
]

export default function BusinessMinimal() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">CLARITY</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-sm font-medium text-gray-600 hover:text-gray-900">Services</a>
                <a href="#impact" className="text-sm font-medium text-gray-600 hover:text-gray-900">Impact</a>
                <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">Contact</a>
              </nav>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 border border-gray-300 hover:bg-gray-50 font-medium transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        <section className="py-40">
          <EmbrKitContainer>
            <div className="max-w-4xl">
              <h1 className="text-7xl md:text-8xl font-bold text-gray-900 mb-8 leading-none tracking-tight">
                Precision.<br />Performance.<br />Results.
              </h1>
              <p className="text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
                We partner with ambitious organizations to cut through complexity and deliver measurable business outcomes.
              </p>
              <div className="flex gap-4">
                <EmbrKitButton className="px-10 py-4 text-lg font-semibold">Start a Project</EmbrKitButton>
                <EmbrKitButton variant="secondary" className="px-10 py-4 text-lg font-semibold">View Case Studies</EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        <section id="impact" className="py-20 border-y border-gray-200">
          <EmbrKitContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </section>

        <section id="services" className="py-32">
          <EmbrKitContainer>
            <div className="mb-20">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Focused expertise in four core areas that drive meaningful business transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-gray-200">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-12 hover:bg-gray-50 transition-colors group">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1 h-1 bg-gray-900"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </section>

        <section className="py-32 border-t border-gray-200">
          <EmbrKitContainer>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Trusted by Industry Leaders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map((client, idx) => (
                  <div key={idx} className="border border-gray-200 p-6 text-center">
                    <p className="text-gray-700 font-medium">{client}</p>
                  </div>
                ))}
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        <section id="contact" className="py-40 bg-gray-900 text-white">
          <EmbrKitContainer>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Get in touch to discuss how we can help achieve your business objectives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EmbrKitButton variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold">
                  Schedule Consultation
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold">
                  View Our Work
                </EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        <footer className="border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">CLARITY</span>
              </div>
              <div className="text-sm text-gray-600">
                © 2025 Clarity Consulting. All rights reserved.
              </div>
              <div className="flex gap-8 text-sm text-gray-600">
                <a href="#" className="hover:text-gray-900">Privacy</a>
                <a href="#" className="hover:text-gray-900">Terms</a>
                <a href="#" className="hover:text-gray-900">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
