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
  primaryColor: '#DC2626',
  secondaryColor: '#F59E0B',
  backgroundColor: '#ffffff',
  surfaceColor: '#fef2f2',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const services = [
  {
    title: 'Brand Development',
    description: 'Create compelling brand identities that resonate with your target audience',
    features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines']
  },
  {
    title: 'Marketing Strategy',
    description: 'Data-driven marketing campaigns that drive engagement and conversions',
    features: ['Content Marketing', 'Social Media', 'Campaign Management']
  },
  {
    title: 'Creative Services',
    description: 'Award-winning creative work that captures attention and drives results',
    features: ['Design Systems', 'Video Production', 'Content Creation']
  },
  {
    title: 'Growth Services',
    description: 'Scalable growth strategies to expand your market presence',
    features: ['Lead Generation', 'Sales Enablement', 'Partnership Development']
  }
]

const stats = [
  { label: 'Client Satisfaction', value: '99%' },
  { label: 'Campaigns Launched', value: '850+' },
  { label: 'Brand Partners', value: '200+' },
  { label: 'Industry Awards', value: '45' }
]

const testimonials = [
  {
    quote: "Their creative approach helped us double our market share in a highly competitive industry.",
    author: "Jennifer Martinez",
    role: "CMO, Retail Dynamics",
    company: "Leading Retail Brand"
  },
  {
    quote: "The brand refresh exceeded all expectations. Customer engagement increased by 300%.",
    author: "David Thompson",
    role: "CEO, Innovate Labs",
    company: "Tech Startup Success Story"
  }
]

export default function BusinessWarmTemplate() {
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
                    <rect width="40" height="40" rx="8" fill="url(#warmGradient)"/>
                    <path d="M20 10L26 16L20 22L14 16L20 10Z" fill="white"/>
                    <path d="M14 18L20 24L26 18L20 30L14 18Z" fill="white" opacity="0.7"/>
                    <defs>
                      <linearGradient id="warmGradient" x1="0" y1="0" x2="40" y2="40">
                        <stop offset="0%" stopColor="#DC2626"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Ember Creative</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Services</a>
                <a href="#results" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Results</a>
                <a href="#work" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Our Work</a>
                <a href="#contact" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Contact</a>
              </nav>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                ← Back
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-red-50 via-white to-orange-50">
          <EmbrKitContainer size="lg">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                Award-Winning Creative Agency
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Brands That Inspire
                <span className="block bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mt-2">Action & Connection</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                We create bold, memorable brand experiences that drive engagement,
                build loyalty, and deliver measurable business impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <EmbrKitButton size="lg" className="px-8 py-4 text-lg">
                  Start Your Project
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  View Portfolio
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
                  color="#DC2626"
                />
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-gray-50">
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Creative Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                End-to-end brand and marketing solutions designed to elevate your business
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
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <EmbrKitButton variant="text" className="text-red-600 font-semibold p-0">
                      Explore →
                    </EmbrKitButton>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        {/* Testimonials Section */}
        <section id="work" className="py-24 bg-white">
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
              <p className="text-xl text-gray-600">Hear from brands we've helped transform</p>
            </div>

            <EmbrKitGrid cols={1} gap={8} className="md:grid-cols-2">
              {testimonials.map((testimonial, idx) => (
                <EmbrKitCard key={idx} variant="elevated">
                  <EmbrKitCardContent className="p-8">
                    <div className="text-4xl text-red-600 mb-4">"</div>
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
        <section id="contact" className="py-24 bg-gradient-to-br from-red-50 to-orange-50">
          <EmbrKitContainer size="lg">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Let's Create Together</h2>
                <p className="text-xl text-gray-600">
                  Ready to build a brand that stands out? Let's start the conversation.
                </p>
              </div>

              <EmbrKitCard variant="elevated">
                <EmbrKitCardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EmbrKitInput
                        label="First Name"
                        placeholder="Jane"
                        type="text"
                      />
                      <EmbrKitInput
                        label="Last Name"
                        placeholder="Smith"
                        type="text"
                      />
                    </div>
                    <EmbrKitInput
                      label="Email Address"
                      placeholder="jane.smith@brand.com"
                      type="email"
                    />
                    <EmbrKitInput
                      label="Company"
                      placeholder="Your Brand Name"
                      type="text"
                    />
                    <EmbrKitInput
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                    />
                    <EmbrKitTextarea
                      label="Project Details"
                      placeholder="Tell us about your brand and what you're looking to achieve..."
                      rows={6}
                    />
                    <EmbrKitButton className="w-full py-4 text-lg font-semibold">
                      Submit Inquiry
                    </EmbrKitButton>
                    <p className="text-sm text-gray-500 text-center">
                      We'll get back to you within 24 hours
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
                    <rect width="40" height="40" rx="8" fill="url(#warmGradientFooter)"/>
                    <path d="M20 10L26 16L20 22L14 16L20 10Z" fill="white"/>
                    <path d="M14 18L20 24L26 18L20 30L14 18Z" fill="white" opacity="0.7"/>
                    <defs>
                      <linearGradient id="warmGradientFooter" x1="0" y1="0" x2="40" y2="40">
                        <stop offset="0%" stopColor="#DC2626"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-xl font-bold">Ember</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Creating bold brands that inspire action and connection.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Brand Development</a></li>
                  <li><a href="#" className="hover:text-white">Marketing Strategy</a></li>
                  <li><a href="#" className="hover:text-white">Creative Services</a></li>
                  <li><a href="#" className="hover:text-white">Growth Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Portfolio</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>456 Creative District</li>
                  <li>Los Angeles, CA 90012</li>
                  <li>hello@embercreative.co</li>
                  <li>+1 (555) 987-6543</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Ember Creative. All rights reserved.
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
