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
  EmbrKitStatCard
} from '@embr/ui'

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

const solutions = [
  {
    title: 'Enterprise Resource Planning',
    description: 'Integrated ERP platform connecting finance, operations, supply chain, and human resources into a unified system.',
    features: ['Financial Management', 'Supply Chain Optimization', 'HR & Payroll Integration']
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions with 99.99% uptime SLA, automated failover, and global content delivery.',
    features: ['Multi-Cloud Architecture', 'Auto-Scaling', 'Global CDN']
  },
  {
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security framework with threat detection, data encryption, and compliance management.',
    features: ['Real-Time Threat Detection', 'Zero Trust Architecture', 'SOC 2 / ISO 27001 Compliance']
  },
  {
    title: 'Business Intelligence',
    description: 'Advanced analytics platform with real-time dashboards, predictive modeling, and AI-powered insights.',
    features: ['Real-Time Dashboards', 'Predictive Analytics', 'Custom Reporting']
  }
]

const stats = [
  { value: '500+', label: 'Enterprise Clients' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '$50B+', label: 'Transactions Processed' },
  { value: '150', label: 'Countries' }
]

const testimonials = [
  {
    quote: "GlobalTech has transformed our operations. Their ERP platform reduced our processing time by 60% and improved accuracy across all departments.",
    author: "Robert Chen",
    role: "CIO, International Manufacturing Corp",
    company: "Fortune 100 Manufacturing Leader"
  },
  {
    quote: "The security and reliability of GlobalTech's infrastructure gives us confidence to scale globally without compromising on compliance.",
    author: "Jennifer Martinez",
    role: "VP Technology, Financial Services Group",
    company: "Leading Investment Bank"
  }
]

export default function BusinessCorporate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-blue-600 rounded flex items-center justify-center shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path d="M9 22V12h6v10" fill="none" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-blue-900">GlobalTech</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#solutions" className="text-sm font-semibold text-gray-700 hover:text-blue-800">Solutions</a>
                <a href="#customers" className="text-sm font-semibold text-gray-700 hover:text-blue-800">Customers</a>
                <a href="#resources" className="text-sm font-semibold text-gray-700 hover:text-blue-800">Resources</a>
                <a href="#about" className="text-sm font-semibold text-gray-700 hover:text-blue-800">About</a>
              </nav>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 border border-blue-200 hover:bg-blue-50 rounded font-semibold transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-24">
          <EmbrKitContainer>
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 bg-blue-700 rounded-full text-sm font-semibold mb-6">
                Trusted by Fortune 500 Companies
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Enterprise Solutions That Drive Business Forward
              </h1>
              <p className="text-2xl text-blue-100 mb-10 leading-relaxed">
                Comprehensive technology platforms designed for global enterprises seeking security, scale, and performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <EmbrKitButton variant="secondary" className="bg-white text-blue-800 hover:bg-blue-50 px-10 py-4 text-lg font-semibold shadow-xl">
                  Request Demo
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold">
                  Download Whitepaper
                </EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        <section className="py-16 bg-blue-50 border-y border-blue-100">
          <EmbrKitContainer>
            <EmbrKitGrid cols={2} gap={8} className="md:grid-cols-4">
              {stats.map((stat, idx) => (
                <EmbrKitStatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  size="md"
                  color="#1E40AF"
                />
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        <section id="solutions" className="py-24 bg-white">
          <EmbrKitContainer>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Enterprise Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Integrated technology platforms that power the world's largest organizations
              </p>
            </div>

            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {solutions.map((solution, idx) => (
                <EmbrKitCard key={idx} variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                  <EmbrKitCardContent className="p-10">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">{solution.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                    <div className="space-y-2">
                      {solution.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <EmbrKitButton variant="text" className="mt-6 text-blue-700 font-semibold p-0">
                      Learn More →
                    </EmbrKitButton>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        <section id="customers" className="py-24 bg-gradient-to-br from-blue-50 to-slate-50">
          <EmbrKitContainer>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
              <p className="text-xl text-gray-600">Powering mission-critical operations worldwide</p>
            </div>

            <EmbrKitGrid cols={1} gap={8} className="md:grid-cols-2">
              {testimonials.map((testimonial, idx) => (
                <EmbrKitCard key={idx} variant="elevated">
                  <EmbrKitCardContent className="p-10">
                    <div className="text-5xl text-blue-600 mb-4">"</div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                      {testimonial.quote}
                    </p>
                    <div className="border-t border-gray-200 pt-6">
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.company}</p>
                    </div>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <EmbrKitContainer>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Enterprise?</h2>
              <p className="text-xl text-blue-100 mb-10">
                Join 500+ global organizations leveraging our platform for mission-critical operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EmbrKitButton variant="secondary" className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-4 text-lg font-semibold">
                  Schedule Consultation
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold">
                  Contact Sales
                </EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        <footer className="bg-slate-900 text-white py-16">
          <EmbrKitContainer>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path d="M9 22V12h6v10" fill="none" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold">GlobalTech</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Enterprise technology solutions for global organizations.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Solutions</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">ERP Platform</a></li>
                  <li><a href="#" className="hover:text-white">Cloud Infrastructure</a></li>
                  <li><a href="#" className="hover:text-white">Cybersecurity</a></li>
                  <li><a href="#" className="hover:text-white">Business Intelligence</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Customers</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Newsroom</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Global Headquarters</li>
                  <li>New York, NY 10001</li>
                  <li>enterprise@globaltech.com</li>
                  <li>+1 (800) 555-0100</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 GlobalTech Corporation. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Security</a>
              </div>
            </div>
          </EmbrKitContainer>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
