'use client'

import React from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardHeader,
  EmbrKitCardContent,
  EmbrKitButton,
  EmbrKitStatCard,
  EmbrKitInput,
  EmbrKitTextarea
} from '@embr/ui'

const theme = {
  primaryColor: '#0F766E',
  secondaryColor: '#38F9E4',
  backgroundColor: '#ffffff',
  surfaceColor: '#f9fafb',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const services = [
  {
    title: 'Strategic Consulting',
    description: 'Data-driven strategic planning to accelerate growth and market positioning',
    features: ['Market Analysis', 'Competitive Intelligence', 'Growth Strategy']
  },
  {
    title: 'Digital Transformation',
    description: 'Modern technology solutions to streamline operations and drive efficiency',
    features: ['Process Automation', 'Cloud Migration', 'System Integration']
  },
  {
    title: 'Business Analytics',
    description: 'Advanced analytics and insights to inform decision-making and optimize performance',
    features: ['Data Visualization', 'Predictive Modeling', 'KPI Dashboards']
  },
  {
    title: 'Implementation Services',
    description: 'End-to-end project execution with dedicated teams and proven methodologies',
    features: ['Project Management', 'Change Management', 'Training & Support']
  }
]

const stats = [
  { label: 'Client Retention Rate', value: '98%' },
  { label: 'Projects Delivered', value: '1,200+' },
  { label: 'Enterprise Clients', value: '150+' },
  { label: 'Global Offices', value: '12' }
]

const testimonials = [
  {
    quote: "Their strategic guidance helped us achieve 40% revenue growth in just 18 months.",
    author: "Sarah Chen",
    role: "CEO, TechVentures Inc.",
    company: "Fortune 500 Technology Company"
  },
  {
    quote: "The digital transformation project exceeded our expectations. ROI within 6 months.",
    author: "Michael Rodriguez",
    role: "COO, Global Logistics Corp",
    company: "International Logistics Leader"
  }
]

export default function ModernBusinessTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        {/* Header/Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="#0F766E"/>
                    <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Stratex Consulting</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Services</a>
                <a href="#results" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Results</a>
                <a href="#clients" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Clients</a>
                <a href="#contact" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Contact</a>
              </nav>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                ← Back
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-teal-50">
          <EmbrKitContainer size="lg">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6">
                Trusted by Fortune 500 Companies
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Business
                <span className="block text-teal-600 mt-2">Drive Measurable Growth</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                We partner with enterprises to unlock potential through strategic consulting,
                digital transformation, and data-driven insights that deliver real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <EmbrKitButton size="lg" className="px-8 py-4 text-lg">
                  Schedule Consultation
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  View Case Studies
                </EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        {/* Stats Section */}
        <section id="results" className="py-16 bg-white border-y border-gray-200">
          <EmbrKitContainer size="lg">
            <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4">
              {stats.map((stat, idx) => (
                <EmbrKitStatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  size="md"
                  color="#0F766E"
                />
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-gray-50">
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions designed to address your unique business challenges
              </p>
            </div>

            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {services.map((service, idx) => (
                <EmbrKitCard key={idx} variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                  <EmbrKitCardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-600"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <EmbrKitButton variant="text" className="text-teal-600 font-semibold p-0">
                      Learn More →
                    </EmbrKitButton>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        {/* Testimonials Section */}
        <section id="clients" className="py-24 bg-white">
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
              <p className="text-xl text-gray-600">Hear from leaders who've transformed their businesses with us</p>
            </div>

            <EmbrKitGrid cols={1} gap={8} className="md:grid-cols-2">
              {testimonials.map((testimonial, idx) => (
                <EmbrKitCard key={idx} variant="elevated">
                  <EmbrKitCardContent className="p-8">
                    <div className="text-4xl text-teal-600 mb-4">"</div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                      {testimonial.quote}
                    </p>
                    <div className="border-t border-gray-200 pt-4">
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

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-teal-50 to-cyan-50">
          <EmbrKitContainer size="lg">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Start Your Transformation</h2>
                <p className="text-xl text-gray-600">
                  Schedule a consultation to discuss how we can help achieve your business objectives
                </p>
              </div>

              <EmbrKitCard variant="elevated">
                <EmbrKitCardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EmbrKitInput
                        label="First Name"
                        placeholder="John"
                        type="text"
                      />
                      <EmbrKitInput
                        label="Last Name"
                        placeholder="Doe"
                        type="text"
                      />
                    </div>
                    <EmbrKitInput
                      label="Email Address"
                      placeholder="john.doe@company.com"
                      type="email"
                    />
                    <EmbrKitInput
                      label="Company"
                      placeholder="Your Company Name"
                      type="text"
                    />
                    <EmbrKitInput
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                    />
                    <EmbrKitTextarea
                      label="Tell us about your needs"
                      placeholder="Describe your business challenges and objectives..."
                      rows={6}
                    />
                    <EmbrKitButton className="w-full py-4 text-lg font-semibold">
                      Request Consultation
                    </EmbrKitButton>
                    <p className="text-sm text-gray-500 text-center">
                      We typically respond within 24 hours
                    </p>
                  </form>
                </EmbrKitCardContent>
              </EmbrKitCard>
            </div>
          </EmbrKitContainer>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <EmbrKitContainer size="lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="#0F766E"/>
                    <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xl font-bold">Stratex</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Transforming businesses through strategic consulting and digital innovation.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Strategic Consulting</a></li>
                  <li><a href="#" className="hover:text-white">Digital Transformation</a></li>
                  <li><a href="#" className="hover:text-white">Business Analytics</a></li>
                  <li><a href="#" className="hover:text-white">Implementation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Case Studies</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>123 Business District</li>
                  <li>New York, NY 10001</li>
                  <li>contact@stratex.com</li>
                  <li>+1 (555) 123-4567</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Stratex Consulting. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </EmbrKitContainer>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
