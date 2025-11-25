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
  { title: 'Consulting', description: 'Strategic business consulting to drive growth and efficiency', icon: '💼' },
  { title: 'Analytics', description: 'Data-driven insights for informed decision making', icon: '📊' },
  { title: 'Development', description: 'Custom software solutions tailored to your needs', icon: '🚀' },
  { title: 'Support', description: '24/7 expert support to keep your business running', icon: '🛠️' }
]

const stats = [
  { label: 'Clients Served', value: '500+' },
  { label: 'Projects Completed', value: '1,200+' },
  { label: 'Team Members', value: '50+' },
  { label: 'Years Experience', value: '15+' }
]

export default function ModernBusinessTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-white">
        {/* Header/Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-400 flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="text-xl font-bold text-gray-900">BusinessPro</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Services</a>
                <a href="#about" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Contact</a>
              </nav>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                Back to Templates
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-teal-50">
          <EmbrKitContainer size="lg">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Business
                <span className="block text-teal-600 mt-2">With Expert Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                We help businesses achieve their goals through strategic consulting, innovative technology, and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <EmbrKitButton size="lg" className="px-8 py-4 text-lg">
                  Get Started Today
                </EmbrKitButton>
                <EmbrKitButton variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  View Our Work
                </EmbrKitButton>
              </div>
            </div>
          </EmbrKitContainer>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
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
        <section id="services" className="py-20 bg-gray-50">
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions designed to drive your business forward
              </p>
            </div>

            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {services.map((service, idx) => (
                <EmbrKitCard key={idx} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                  <EmbrKitCardContent className="p-8">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <EmbrKitButton variant="text" className="text-teal-600 font-semibold">
                      Learn More →
                    </EmbrKitButton>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </EmbrKitContainer>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <EmbrKitContainer size="lg">
            <div className="max-w-4xl mx-auto">
              <EmbrKitCard variant="elevated">
                <EmbrKitCardContent className="p-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
                  <div className="space-y-6 text-gray-600 text-lg">
                    <p>
                      <strong className="text-gray-900">Expert Team:</strong> Our experienced professionals bring decades of combined expertise to every project.
                    </p>
                    <p>
                      <strong className="text-gray-900">Proven Track Record:</strong> We've helped hundreds of businesses achieve measurable results and sustainable growth.
                    </p>
                    <p>
                      <strong className="text-gray-900">Client-Focused:</strong> Your success is our priority. We work closely with you to understand your unique needs and deliver tailored solutions.
                    </p>
                    <p>
                      <strong className="text-gray-900">Innovation Driven:</strong> We stay ahead of industry trends to provide cutting-edge solutions that give you a competitive advantage.
                    </p>
                  </div>
                </EmbrKitCardContent>
              </EmbrKitCard>
            </div>
          </EmbrKitContainer>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
          <EmbrKitContainer size="lg">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                <p className="text-xl text-gray-600">
                  Ready to transform your business? Let's start the conversation.
                </p>
              </div>

              <EmbrKitCard variant="elevated">
                <EmbrKitCardContent className="p-8">
                  <form className="space-y-6">
                    <EmbrKitInput
                      label="Your Name"
                      placeholder="John Doe"
                      type="text"
                    />
                    <EmbrKitInput
                      label="Email Address"
                      placeholder="john@company.com"
                      type="email"
                    />
                    <EmbrKitInput
                      label="Company"
                      placeholder="Your Company Name"
                      type="text"
                    />
                    <EmbrKitTextarea
                      label="Message"
                      placeholder="Tell us about your project..."
                      rows={6}
                    />
                    <EmbrKitButton className="w-full py-4 text-lg font-semibold">
                      Send Message
                    </EmbrKitButton>
                  </form>
                </EmbrKitCardContent>
              </EmbrKitCard>
            </div>
          </EmbrKitContainer>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <EmbrKitContainer size="lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-400 flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="text-xl font-bold">BusinessPro</span>
              </div>
              <p className="text-gray-400 mb-6">
                Transform your business with expert solutions
              </p>
              <div className="flex justify-center gap-8 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
              <p className="text-gray-500 text-sm mt-8">
                © 2025 BusinessPro. All rights reserved.
              </p>
            </div>
          </EmbrKitContainer>
        </footer>
      </div>
    </EmbrKitProvider>
  )
}
