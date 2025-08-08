'use client';

import React, { useState } from 'react';
// Import EmbrKit styles
import '@embr/ui';

export default function EmbrKitComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div className="min-h-screen p-8" style={{
      backgroundColor: 'var(--embr-background)',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: 'var(--embr-text)'
    }}>
      <div className="embr-container embr-container-lg">
        <div className="embr-stack embr-stack-gap-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="embr-h1 mb-4" style={{ color: '#ffffff' }}>
              <span style={{ color: 'var(--embr-teal)' }}>EmbrKit</span> Components Demo
            </h1>
            <p className="text-lg text-center max-w-2xl mx-auto font-light mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>
              Interactive showcase of all EmbrKit components in action
            </p>
            <div className="embr-badge embr-badge-success">Live Interactive Demo</div>
          </div>

          {/* Navigation Components */}
          <div className="embr-card embr-card-elevated">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Navigation Components</h3>
              <p className="embr-card-subtitle">Navbar, tabs, and breadcrumbs for site navigation</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-8">
                
                {/* Navbar Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Navbar</h4>
                  <div className="embr-navbar" style={{ position: 'relative', marginBottom: 'var(--embr-space-4)' }}>
                    <div className="embr-navbar-brand">
                      <span style={{ color: 'var(--embr-teal)' }}>Embr</span>Kit
                    </div>
                    <div className="embr-navbar-nav">
                      <div className="embr-navbar-item">
                        <a className="embr-navbar-link active">Dashboard</a>
                      </div>
                      <div className="embr-navbar-item">
                        <a className="embr-navbar-link">Projects</a>
                      </div>
                      <div className="embr-navbar-item">
                        <a className="embr-navbar-link">Settings</a>
                      </div>
                    </div>
                    <div className="embr-navbar-actions">
                      <button className="embr-btn embr-btn-primary embr-btn-sm">Sign In</button>
                    </div>
                  </div>
                </div>

                {/* Breadcrumbs Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Breadcrumbs</h4>
                  <div className="embr-breadcrumbs">
                    <div className="embr-breadcrumb-item">
                      <a className="embr-breadcrumb-link">Home</a>
                      <span className="embr-breadcrumb-separator">/</span>
                    </div>
                    <div className="embr-breadcrumb-item">
                      <a className="embr-breadcrumb-link">Projects</a>
                      <span className="embr-breadcrumb-separator">/</span>
                    </div>
                    <div className="embr-breadcrumb-item">
                      <span className="embr-breadcrumb-current">EmbrKit Demo</span>
                    </div>
                  </div>
                </div>

                {/* Tabs Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Tabs</h4>
                  <div className="embr-tabs">
                    <div className="embr-tabs-list">
                      <button className="embr-tab active">Overview</button>
                      <button className="embr-tab">Components</button>
                      <button className="embr-tab">Documentation</button>
                      <button className="embr-tab">Settings</button>
                    </div>
                    <div className="embr-tab-content">
                      <h5 className="font-semibold mb-2" style={{ color: 'var(--embr-text-on-dark)' }}>Overview</h5>
                      <p style={{ color: 'var(--embr-text-secondary-dark-bg)' }}>
                        This is the overview tab content. EmbrKit provides a comprehensive set of navigation components 
                        that follow Embr's design principles with mathematical precision and refined aesthetics.
                      </p>
                      <div className="mt-4">
                        <div className="embr-badge embr-badge-primary">Active Tab</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Universal Tool Components */}
          <div className="embr-card embr-card-elevated">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Universal Tool Components</h3>
              <p className="embr-card-subtitle">Flexible components for any micro-app - timers, progress, media, and actions</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-8">
                
                {/* Timer Components Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Timer & Progress Components</h4>
                  <div className="embr-grid embr-grid-cols-1 embr-grid-cols-lg-3 embr-grid-gap-6">
                    
                    {/* Breathing Timer */}
                    <div className="embr-timer breathing">
                      <div className="embr-timer-progress">
                        <div className="embr-timer-progress-bar" style={{ width: '75%' }}></div>
                      </div>
                      <div className="embr-timer-display">4:32</div>
                      <div className="embr-timer-label">Breathing Exercise</div>
                      <div className="embr-timer-controls">
                        <button className="embr-btn embr-btn-primary">Pause</button>
                        <button className="embr-btn embr-btn-secondary">Reset</button>
                      </div>
                    </div>
                    
                    {/* Progress Circle */}
                    <div style={{ textAlign: 'center', padding: 'var(--embr-space-6)' }}>
                      <div className="embr-progress-circle">
                        <svg width="120" height="120">
                          <circle className="embr-progress-circle-bg" cx="60" cy="60" r="52" strokeWidth="8" />
                          <circle 
                            className="embr-progress-circle-progress" 
                            cx="60" cy="60" r="52" strokeWidth="8"
                            strokeDasharray="327"
                            strokeDashoffset="82"
                          />
                        </svg>
                        <div className="embr-progress-circle-text">75%</div>
                      </div>
                      <h5 style={{ color: 'var(--embr-text-on-dark)', marginTop: 'var(--embr-space-3)' }}>Course Progress</h5>
                    </div>
                    
                    {/* Progress Bars */}
                    <div style={{ padding: 'var(--embr-space-4)' }}>
                      <div className="embr-progress-bar">
                        <div className="embr-progress-bar-header">
                          <span className="embr-progress-bar-label">Onboarding</span>
                          <span className="embr-progress-bar-value">80%</span>
                        </div>
                        <div className="embr-progress-bar-track">
                          <div className="embr-progress-bar-fill" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div className="embr-progress-bar" style={{ marginTop: 'var(--embr-space-4)' }}>
                        <div className="embr-progress-bar-header">
                          <span className="embr-progress-bar-label">Profile Setup</span>
                          <span className="embr-progress-bar-value">45%</span>
                        </div>
                        <div className="embr-progress-bar-track">
                          <div className="embr-progress-bar-fill" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div className="embr-progress-bar" style={{ marginTop: 'var(--embr-space-4)' }}>
                        <div className="embr-progress-bar-header">
                          <span className="embr-progress-bar-label">Training</span>
                          <span className="embr-progress-bar-value">92%</span>
                        </div>
                        <div className="embr-progress-bar-track">
                          <div className="embr-progress-bar-fill" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Gallery Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Media Gallery</h4>
                  <div className="embr-media-gallery">
                    <div className="embr-media-gallery-header">
                      <h3 className="embr-media-gallery-title">Property Showcase</h3>
                    </div>
                    <div className="embr-media-gallery-grid">
                      <div className="embr-media-item">
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 'var(--embr-text-lg)',
                          fontWeight: '600'
                        }}>
                          Living Room
                        </div>
                        <div className="embr-media-overlay">Spacious open-plan living area</div>
                      </div>
                      <div className="embr-media-item">
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 'var(--embr-text-lg)',
                          fontWeight: '600'
                        }}>
                          Kitchen
                        </div>
                        <div className="embr-media-overlay">Modern fitted kitchen</div>
                      </div>
                      <div className="embr-media-item">
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 'var(--embr-text-lg)',
                          fontWeight: '600'
                        }}>
                          Garden
                        </div>
                        <div className="embr-media-overlay">Private landscaped garden</div>
                      </div>
                      <div className="embr-media-item">
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 'var(--embr-text-lg)',
                          fontWeight: '600'
                        }}>
                          Bedroom
                        </div>
                        <div className="embr-media-overlay">Master bedroom with ensuite</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Panel Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Quick Actions</h4>
                  <div className="embr-action-panel">
                    <div className="embr-action-grid">
                      <div className="embr-action-card">
                        <span className="embr-action-icon">📞</span>
                        <h4 className="embr-action-title">Call Now</h4>
                        <p className="embr-action-description">Speak to our team directly</p>
                      </div>
                      <div className="embr-action-card">
                        <span className="embr-action-icon">📧</span>
                        <h4 className="embr-action-title">Email Us</h4>
                        <p className="embr-action-description">Send us a message</p>
                      </div>
                      <div className="embr-action-card">
                        <span className="embr-action-icon">🗓️</span>
                        <h4 className="embr-action-title">Book Visit</h4>
                        <p className="embr-action-description">Schedule a viewing</p>
                      </div>
                      <div className="embr-action-card">
                        <span className="embr-action-icon">📍</span>
                        <h4 className="embr-action-title">Directions</h4>
                        <p className="embr-action-description">Get directions</p>
                      </div>
                      <div className="embr-action-card">
                        <span className="embr-action-icon">💬</span>
                        <h4 className="embr-action-title">Live Chat</h4>
                        <p className="embr-action-description">Chat with support</p>
                      </div>
                      <div className="embr-action-card">
                        <span className="embr-action-icon">📱</span>
                        <h4 className="embr-action-title">Share</h4>
                        <p className="embr-action-description">Share this app</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Demo */}
                <div className="embr-grid embr-grid-cols-1 embr-grid-cols-lg-2 embr-grid-gap-6">
                  <div>
                    <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Quick Contact</h4>
                    <div className="embr-quick-contact">
                      <h3 style={{ marginBottom: 'var(--embr-space-4)' }}>Get in Touch</h3>
                      <div className="embr-contact-methods">
                        <a className="embr-contact-method" href="tel:+441234567890">
                          <span className="embr-contact-icon">📞</span>
                          <span className="embr-contact-label">Call</span>
                        </a>
                        <a className="embr-contact-method" href="mailto:hello@embr.com">
                          <span className="embr-contact-icon">✉️</span>
                          <span className="embr-contact-label">Email</span>
                        </a>
                        <a className="embr-contact-method" href="https://embr.com">
                          <span className="embr-contact-icon">🌐</span>
                          <span className="embr-contact-label">Website</span>
                        </a>
                        <a className="embr-contact-method" href="https://twitter.com/embr">
                          <span className="embr-contact-icon">📱</span>
                          <span className="embr-contact-label">Social</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Use Case Examples</h4>
                    <div className="embr-stack embr-stack-gap-3">
                      <div className="embr-badge embr-badge-primary">Breathing Timer App</div>
                      <div className="embr-badge embr-badge-success">Property Showcase</div>
                      <div className="embr-badge embr-badge-warning">Training Progress</div>
                      <div className="embr-badge embr-badge-secondary">Contact Card</div>
                      <div className="embr-badge embr-badge-primary">Media Gallery</div>
                      <div className="embr-badge embr-badge-success">Quick Actions</div>
                    </div>
                    <p style={{ 
                      color: 'var(--embr-text-secondary-dark-bg)', 
                      marginTop: 'var(--embr-space-4)',
                      fontSize: 'var(--embr-text-sm)',
                      lineHeight: '1.5'
                    }}>
                      These universal components work for any micro-app: wellness timers, property tours, 
                      training modules, business cards, product galleries, and contact tools.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Location & Event Components - Embr's Core */}
          <div className="embr-card embr-card-elevated">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Location & Event Components</h3>
              <p className="embr-card-subtitle">The heart of Embr's micro-apps - maps, schedules, and location-aware features</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-8">
                
                {/* Live Status Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Live Status Updates</h4>
                  <div className="embr-stack embr-stack-gap-3">
                    <div className="embr-live-status live">
                      <div className="embr-live-indicator"></div>
                      <span className="embr-live-status-text">Cornwall Food Festival is LIVE</span>
                      <span className="embr-live-status-time">2 min ago</span>
                    </div>
                    <div className="embr-live-status warning">
                      <div className="embr-live-indicator"></div>
                      <span className="embr-live-status-text">Weather advisory: Light rain expected at 3 PM</span>
                      <span className="embr-live-status-time">15 min ago</span>
                    </div>
                    <div className="embr-live-status error">
                      <div className="embr-live-indicator"></div>
                      <span className="embr-live-status-text">Parking Lot B is now full</span>
                      <span className="embr-live-status-time">5 min ago</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Interactive Venue Map</h4>
                  <div className="embr-map-container">
                    <div className="embr-map-header">
                      <h3 className="embr-map-title">Cornwall Food Festival Map</h3>
                      <div className="embr-map-controls">
                        <div className="embr-map-search">
                          <input type="text" placeholder="Search locations..." />
                        </div>
                      </div>
                    </div>
                    <div className="embr-map-viewport">
                      <div className="embr-map-content" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
                        {/* Food Vendors */}
                        <div className="embr-map-marker" style={{ left: '20%', top: '30%' }} title="Cornish Pasties Co">
                          <span>C</span>
                        </div>
                        <div className="embr-map-marker" style={{ left: '35%', top: '25%' }} title="Fish & Chips">
                          <span>F</span>
                        </div>
                        <div className="embr-map-marker active" style={{ left: '50%', top: '40%' }} title="Live Music Stage">
                          <span>M</span>
                        </div>
                        <div className="embr-map-marker" style={{ left: '70%', top: '20%' }} title="Local Brewery">
                          <span>B</span>
                        </div>
                        <div className="embr-map-marker" style={{ left: '80%', top: '60%' }} title="Parking">
                          <span>P</span>
                        </div>
                        <div className="embr-map-marker" style={{ left: '15%', top: '70%' }} title="Restrooms">
                          <span>R</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Schedule Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Event Schedule</h4>
                  <div className="embr-schedule">
                    <div className="embr-schedule-header">
                      <h3 className="embr-schedule-title">Today's Events</h3>
                      <span className="embr-schedule-date">Saturday, March 15, 2024</span>
                    </div>
                    <div className="embr-schedule-content">
                      <div className="embr-schedule-timeline">
                        <div className="embr-event-card">
                          <div className="embr-event-card-time">10:00 AM</div>
                          <h4 className="embr-event-card-title">Festival Opening Ceremony</h4>
                          <div className="embr-event-card-location">📍 Main Stage</div>
                          <p className="embr-event-card-description">Welcome speech by the mayor and festival organizers</p>
                        </div>
                        
                        <div className="embr-event-card active">
                          <div className="embr-event-card-time">11:30 AM</div>
                          <h4 className="embr-event-card-title">Cornwall Cooking Demo</h4>
                          <div className="embr-event-card-location">📍 Chef's Corner</div>
                          <p className="embr-event-card-description">Learn to make authentic Cornish pasties with local chef Jamie Stevens</p>
                        </div>
                        
                        <div className="embr-event-card">
                          <div className="embr-event-card-time">1:00 PM</div>
                          <h4 className="embr-event-card-title">Local Folk Music</h4>
                          <div className="embr-event-card-location">📍 Acoustic Stage</div>
                          <p className="embr-event-card-description">Traditional Cornish folk songs by the Tintagel Trio</p>
                        </div>
                        
                        <div className="embr-event-card">
                          <div className="embr-event-card-time">3:30 PM</div>
                          <h4 className="embr-event-card-title">Beer Tasting Experience</h4>
                          <div className="embr-event-card-location">📍 Brewery Tent</div>
                          <p className="embr-event-card-description">Sample award-winning ales from Cornwall's finest breweries</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Cards Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Featured Vendors</h4>
                  <div className="embr-grid embr-grid-cols-1 embr-grid-cols-md-2 embr-grid-gap-4">
                    <div className="embr-location-card">
                      <div className="embr-location-card-header">
                        <h4 className="embr-location-card-title">Cornish Pasties Co</h4>
                        <span className="embr-location-card-distance">50m away</span>
                      </div>
                      <span className="embr-location-card-type">Traditional Food</span>
                      <p className="embr-location-card-description">Authentic handmade Cornish pasties using locally sourced ingredients and traditional recipes passed down through generations.</p>
                      <div className="embr-location-card-actions">
                        <button className="embr-btn embr-btn-sm embr-btn-primary">Get Directions</button>
                        <button className="embr-btn embr-btn-sm embr-btn-secondary">Menu</button>
                      </div>
                    </div>
                    
                    <div className="embr-location-card">
                      <div className="embr-location-card-header">
                        <h4 className="embr-location-card-title">Tintagel Brewery</h4>
                        <span className="embr-location-card-distance">120m away</span>
                      </div>
                      <span className="embr-location-card-type">Local Brewery</span>
                      <p className="embr-location-card-description">Award-winning craft beers brewed in the heart of Cornwall. Try our signature "King Arthur's Ale" and seasonal specialties.</p>
                      <div className="embr-location-card-actions">
                        <button className="embr-btn embr-btn-sm embr-btn-primary">Find Us</button>
                        <button className="embr-btn embr-btn-sm embr-btn-secondary">Beer List</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Finder Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Location Finder</h4>
                  <div className="embr-location-finder">
                    <div className="embr-location-finder-header">
                      <h3>Find What You Need</h3>
                    </div>
                    
                    <div className="embr-location-finder-search">
                      <input type="text" placeholder="Search for vendors, facilities..." />
                    </div>

                    <div className="embr-location-finder-filters">
                      <button className="embr-location-filter active">All</button>
                      <button className="embr-location-filter">Food</button>
                      <button className="embr-location-filter">Drinks</button>
                      <button className="embr-location-filter">Music</button>
                      <button className="embr-location-filter">Facilities</button>
                      <button className="embr-location-filter">Parking</button>
                    </div>

                    <div className="embr-location-results">
                      <div className="embr-stat-card">
                        <div className="embr-stat-card-header">
                          <h3 className="embr-stat-card-title">Search Results</h3>
                        </div>
                        <div className="embr-stat-card-value">24</div>
                        <div className="embr-stat-card-change neutral">
                          <span className="embr-stat-card-change-icon">→</span>
                          locations found
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Data Display Components */}
          <div className="embr-card embr-card-elevated">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Data Display Components</h3>
              <p className="embr-card-subtitle">Tables, lists, and cards for presenting structured data</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-8">
                
                {/* StatCards Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Stat Cards</h4>
                  <div className="embr-grid embr-grid-cols-1 embr-grid-cols-md-2 embr-grid-cols-lg-4 embr-grid-gap-4">
                    <div className="embr-stat-card">
                      <div className="embr-stat-card-header">
                        <h3 className="embr-stat-card-title">Total Revenue</h3>
                        <div className="embr-stat-card-icon">💰</div>
                      </div>
                      <div className="embr-stat-card-value">$127,500</div>
                      <div className="embr-stat-card-change positive">
                        <span className="embr-stat-card-change-icon">↗</span>
                        +12.5%
                      </div>
                    </div>
                    
                    <div className="embr-stat-card">
                      <div className="embr-stat-card-header">
                        <h3 className="embr-stat-card-title">Active Users</h3>
                        <div className="embr-stat-card-icon">👥</div>
                      </div>
                      <div className="embr-stat-card-value">8,429</div>
                      <div className="embr-stat-card-change positive">
                        <span className="embr-stat-card-change-icon">↗</span>
                        +8.2%
                      </div>
                    </div>
                    
                    <div className="embr-stat-card">
                      <div className="embr-stat-card-header">
                        <h3 className="embr-stat-card-title">Conversion Rate</h3>
                        <div className="embr-stat-card-icon">📊</div>
                      </div>
                      <div className="embr-stat-card-value">3.24%</div>
                      <div className="embr-stat-card-change negative">
                        <span className="embr-stat-card-change-icon">↘</span>
                        -2.1%
                      </div>
                    </div>
                    
                    <div className="embr-stat-card">
                      <div className="embr-stat-card-header">
                        <h3 className="embr-stat-card-title">Support Tickets</h3>
                        <div className="embr-stat-card-icon">🎫</div>
                      </div>
                      <div className="embr-stat-card-value">142</div>
                      <div className="embr-stat-card-change neutral">
                        <span className="embr-stat-card-change-icon">→</span>
                        0%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table Demo */}
                <div>
                  <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Data Table</h4>
                  <div className="embr-table-container">
                    <table className="embr-table">
                      <thead className="embr-table-header">
                        <tr>
                          <th className="sortable">Name</th>
                          <th className="sortable">Email</th>
                          <th className="sortable">Status</th>
                          <th className="sortable">Revenue</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="embr-table-body">
                        <tr>
                          <td className="primary">Sarah Johnson</td>
                          <td>sarah.j@example.com</td>
                          <td><div className="embr-badge embr-badge-success">Active</div></td>
                          <td className="numeric">$12,450</td>
                          <td>
                            <button className="embr-btn embr-btn-sm embr-btn-secondary">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="primary">Michael Chen</td>
                          <td>m.chen@example.com</td>
                          <td><div className="embr-badge embr-badge-warning">Pending</div></td>
                          <td className="numeric">$8,320</td>
                          <td>
                            <button className="embr-btn embr-btn-sm embr-btn-secondary">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="primary">Emma Wilson</td>
                          <td>emma.w@example.com</td>
                          <td><div className="embr-badge embr-badge-success">Active</div></td>
                          <td className="numeric">$15,680</td>
                          <td>
                            <button className="embr-btn embr-btn-sm embr-btn-secondary">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="primary">David Rodriguez</td>
                          <td>d.rodriguez@example.com</td>
                          <td><div className="embr-badge embr-badge-error">Inactive</div></td>
                          <td className="numeric">$2,150</td>
                          <td>
                            <button className="embr-btn embr-btn-sm embr-btn-secondary">View</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DataList and DataCard Demo */}
                <div className="embr-grid embr-grid-cols-1 embr-grid-cols-lg-2 embr-grid-gap-6">
                  <div>
                    <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Data List</h4>
                    <div className="embr-datalist">
                      <div className="embr-datalist-item">
                        <span className="embr-datalist-label">Project Name</span>
                        <span className="embr-datalist-value primary">EmbrKit Design System</span>
                      </div>
                      <div className="embr-datalist-item">
                        <span className="embr-datalist-label">Status</span>
                        <span className="embr-datalist-value">In Development</span>
                      </div>
                      <div className="embr-datalist-item">
                        <span className="embr-datalist-label">Progress</span>
                        <span className="embr-datalist-value numeric">75%</span>
                      </div>
                      <div className="embr-datalist-item">
                        <span className="embr-datalist-label">Team Size</span>
                        <span className="embr-datalist-value numeric">4 members</span>
                      </div>
                      <div className="embr-datalist-item">
                        <span className="embr-datalist-label">Budget</span>
                        <span className="embr-datalist-value numeric">$45,000</span>
                      </div>
                      <div className="embr-datalist-item">
                        <span className="embr-datalist-label">Due Date</span>
                        <span className="embr-datalist-value">March 15, 2024</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="embr-text-lg font-semibold mb-4" style={{ color: 'var(--embr-text-on-dark)' }}>Data Card</h4>
                    <div className="embr-data-card">
                      <div className="embr-data-card-header">
                        <h3 className="embr-data-card-title">Server Performance</h3>
                        <p className="embr-data-card-subtitle">Last 24 hours</p>
                      </div>
                      <div className="embr-data-card-content">
                        <div className="embr-data-card-metric">
                          <span className="embr-data-card-metric-label">CPU Usage</span>
                          <span className="embr-data-card-metric-value success">23%</span>
                        </div>
                        <div className="embr-data-card-metric">
                          <span className="embr-data-card-metric-label">Memory Usage</span>
                          <span className="embr-data-card-metric-value warning">78%</span>
                        </div>
                        <div className="embr-data-card-metric">
                          <span className="embr-data-card-metric-label">Disk Space</span>
                          <span className="embr-data-card-metric-value error">94%</span>
                        </div>
                        <div className="embr-data-card-metric">
                          <span className="embr-data-card-metric-label">Network I/O</span>
                          <span className="embr-data-card-metric-value primary">1.2 GB/s</span>
                        </div>
                        <div className="embr-data-card-metric">
                          <span className="embr-data-card-metric-label">Uptime</span>
                          <span className="embr-data-card-metric-value">99.9%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Button Components */}
          <div className="embr-card embr-card-elevated">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Button Components</h3>
              <p className="embr-card-subtitle">All button variants and sizes with hover effects</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-6">
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Button Variants</h4>
                  <div className="embr-stack embr-stack-horizontal embr-stack-center embr-stack-gap-4">
                    <button className="embr-btn embr-btn-primary">Primary Button</button>
                    <button className="embr-btn embr-btn-secondary">Secondary Button</button>
                    <button className="embr-btn embr-btn-text">Text Button</button>
                  </div>
                </div>
                
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Button Sizes</h4>
                  <div className="embr-stack embr-stack-horizontal embr-stack-center embr-stack-gap-4">
                    <button className="embr-btn embr-btn-primary embr-btn-sm">Small</button>
                    <button className="embr-btn embr-btn-primary embr-btn-md">Medium</button>
                    <button className="embr-btn embr-btn-primary embr-btn-lg">Large</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Components */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Card Components</h3>
              <p className="embr-card-subtitle">Different card styles and compositions</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-grid embr-grid-cols-3 embr-stack-gap-4">
                <div className="embr-card embr-card-default">
                  <div className="embr-card-header">
                    <h4 className="embr-card-title">Default Card</h4>
                    <p className="embr-card-subtitle">Standard styling</p>
                  </div>
                  <div className="embr-card-content">
                    <p style={{ color: 'var(--embr-text-secondary)' }}>This card uses the default variant with subtle shadows.</p>
                  </div>
                  <div className="embr-card-footer">
                    <div className="embr-badge embr-badge-neutral">Default</div>
                  </div>
                </div>
                
                <div className="embr-card embr-card-elevated">
                  <div className="embr-card-header">
                    <h4 className="embr-card-title">Elevated Card</h4>
                    <p className="embr-card-subtitle">Enhanced shadow</p>
                  </div>
                  <div className="embr-card-content">
                    <p style={{ color: 'var(--embr-text-secondary)' }}>This card has enhanced shadows for prominence.</p>
                  </div>
                  <div className="embr-card-footer">
                    <div className="embr-badge embr-badge-primary">Elevated</div>
                  </div>
                </div>
                
                <div className="embr-card embr-card-flat">
                  <div className="embr-card-header">
                    <h4 className="embr-card-title">Flat Card</h4>
                    <p className="embr-card-subtitle">No shadows</p>
                  </div>
                  <div className="embr-card-content">
                    <p style={{ color: 'var(--embr-text-secondary)' }}>This card has a clean, flat design without shadows.</p>
                  </div>
                  <div className="embr-card-footer">
                    <div className="embr-badge embr-badge-secondary">Flat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Components */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Form Components</h3>
              <p className="embr-card-subtitle">Interactive form inputs with validation</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-grid embr-grid-cols-2 embr-stack-gap-8">
                <div className="embr-stack embr-stack-gap-4">
                  <h4 className="embr-text-lg font-semibold" style={{ color: 'var(--embr-text-on-dark)' }}>Basic Inputs</h4>
                  
                  <div className="embr-input-group">
                    <label className="embr-label">Full Name</label>
                    <input 
                      className="embr-input"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <div className="embr-input-help">This field is required</div>
                  </div>
                  
                  <div className="embr-input-group">
                    <label className="embr-label">Email Address</label>
                    <input 
                      className={`embr-input ${formData.email && !formData.email.includes('@') ? 'embr-input-error' : ''}`}
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    {formData.email && !formData.email.includes('@') && (
                      <div className="embr-input-error-text">Please enter a valid email address</div>
                    )}
                  </div>
                  
                  <div className="embr-input-group">
                    <label className="embr-label">Phone Number</label>
                    <input 
                      className="embr-input"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />
                    <div className="embr-input-help">Optional field</div>
                  </div>
                </div>
                
                <div className="embr-stack embr-stack-gap-4">
                  <h4 className="embr-text-lg font-semibold" style={{ color: 'var(--embr-text-on-dark)' }}>Textarea</h4>
                  
                  <div className="embr-input-group">
                    <label className="embr-label">Message</label>
                    <textarea 
                      className="embr-input embr-textarea"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                    <div className="embr-input-help">{formData.message.length}/500 characters</div>
                  </div>
                  
                  <div className="embr-stack embr-stack-horizontal embr-stack-gap-3">
                    <button className="embr-btn embr-btn-primary">Submit Form</button>
                    <button 
                      className="embr-btn embr-btn-text" 
                      onClick={() => setFormData({name: '', email: '', message: ''})}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Components */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Badge Components</h3>
              <p className="embr-card-subtitle">Status indicators and labels</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-6">
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Standard Badges</h4>
                  <div className="embr-stack embr-stack-horizontal embr-stack-center embr-stack-gap-3">
                    <div className="embr-badge embr-badge-primary">Primary</div>
                    <div className="embr-badge embr-badge-secondary">Secondary</div>
                    <div className="embr-badge embr-badge-success">Success</div>
                    <div className="embr-badge embr-badge-warning">Warning</div>
                    <div className="embr-badge embr-badge-error">Error</div>
                    <div className="embr-badge embr-badge-neutral">Neutral</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Outline Badges</h4>
                  <div className="embr-stack embr-stack-horizontal embr-stack-center embr-stack-gap-3">
                    <div className="embr-badge embr-badge-primary embr-badge-outline">Primary</div>
                    <div className="embr-badge embr-badge-success embr-badge-outline">Success</div>
                    <div className="embr-badge embr-badge-warning embr-badge-outline">Warning</div>
                    <div className="embr-badge embr-badge-error embr-badge-outline">Error</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Components */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Interactive Components</h3>
              <p className="embr-card-subtitle">Modals, toasts, and overlays</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-6">
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Modal Dialogs</h4>
                  <div className="embr-stack embr-stack-horizontal embr-stack-gap-4">
                    <button 
                      className="embr-btn embr-btn-primary" 
                      onClick={() => setModalOpen(true)}
                    >
                      Open Modal Dialog
                    </button>
                    <p style={{ color: 'var(--embr-text-secondary)' }}>
                      Click to see backdrop blur and smooth animations
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Toast Notifications</h4>
                  <div className="embr-stack embr-stack-horizontal embr-stack-gap-4">
                    <button 
                      className="embr-btn embr-btn-secondary" 
                      onClick={() => setShowToast(true)}
                    >
                      Show Toast Notification
                    </button>
                    <p style={{ color: 'var(--embr-text-secondary)' }}>
                      Watch the slide-in animation and auto-close
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layout Components */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Layout Components</h3>
              <p className="embr-card-subtitle">Containers, stacks, and grids for consistent layouts</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-stack embr-stack-gap-6">
                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Container Sizes</h4>
                                      <div className="embr-stack embr-stack-gap-3">
                      <div className="embr-container embr-container-sm bg-gray-100 p-4 rounded">
                        <div style={{ color: 'var(--embr-deep-charcoal)' }}>Small Container (640px max-width)</div>
                      </div>
                      <div className="embr-container embr-container-md bg-gray-200 p-4 rounded">
                        <div style={{ color: 'var(--embr-deep-charcoal)' }}>Medium Container (1200px max-width)</div>
                      </div>
                      <div className="embr-container embr-container-lg bg-gray-300 p-4 rounded">
                        <div style={{ color: 'var(--embr-deep-charcoal)' }}>Large Container (1400px max-width)</div>
                      </div>
                    </div>
                </div>

                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Stack Layouts</h4>
                  <div className="embr-stack embr-stack-gap-3">
                    <div>
                      <p className="embr-caption mb-2" style={{ color: 'var(--embr-text-secondary)' }}>Horizontal Stack with Center Alignment:</p>
                      <div className="embr-stack embr-stack-horizontal embr-stack-center embr-stack-gap-4 bg-gray-100 p-4 rounded">
                        <div className="bg-teal-500 text-white p-3 rounded">Item 1</div>
                        <div className="bg-teal-600 text-white p-3 rounded">Item 2</div>
                        <div className="bg-teal-700 text-white p-3 rounded">Item 3</div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="embr-caption mb-2" style={{ color: 'var(--embr-text-secondary)' }}>Vertical Stack with Gap:</p>
                      <div className="embr-stack embr-stack-gap-2 bg-gray-100 p-4 rounded max-w-xs">
                        <div className="bg-blue-500 text-white p-2 rounded text-center">Top</div>
                        <div className="bg-blue-600 text-white p-2 rounded text-center">Middle</div>
                        <div className="bg-blue-700 text-white p-2 rounded text-center">Bottom</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="embr-text-lg font-semibold mb-3" style={{ color: 'var(--embr-text-on-dark)' }}>Grid Layouts</h4>
                  <div className="embr-grid embr-grid-cols-4 embr-stack-gap-3">
                    <div className="bg-purple-500 text-white p-4 rounded text-center">Grid 1</div>
                    <div className="bg-purple-600 text-white p-4 rounded text-center">Grid 2</div>
                    <div className="bg-purple-700 text-white p-4 rounded text-center">Grid 3</div>
                    <div className="bg-purple-800 text-white p-4 rounded text-center">Grid 4</div>
                  </div>
                  <p className="embr-caption mt-2" style={{ color: 'var(--embr-text-secondary)' }}>
                    4-column grid (responsive - collapses to 1 column on mobile)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="embr-card embr-card-elevated">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Usage Examples</h3>
              <p className="embr-card-subtitle">Real-world component combinations</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-grid embr-grid-cols-2 embr-stack-gap-6">
                {/* User Profile Card Example */}
                <div className="embr-card embr-card-flat">
                  <div className="embr-card-header">
                    <h4 className="embr-card-title">User Profile</h4>
                  </div>
                  <div className="embr-card-content">
                    <div className="embr-stack embr-stack-gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                          JD
                        </div>
                        <div>
                          <h5 className="font-semibold" style={{ color: 'var(--embr-text-on-dark)' }}>John Doe</h5>
                          <p className="embr-caption" style={{ color: 'var(--embr-text-secondary-dark-bg)' }}>Product Designer</p>
                        </div>
                      </div>
                      <div className="embr-stack embr-stack-horizontal embr-stack-gap-2">
                        <div className="embr-badge embr-badge-success">Active</div>
                        <div className="embr-badge embr-badge-neutral">Pro User</div>
                      </div>
                    </div>
                  </div>
                  <div className="embr-card-footer">
                    <div className="embr-stack embr-stack-horizontal embr-stack-gap-2">
                      <button className="embr-btn embr-btn-text embr-btn-sm">View Profile</button>
                      <button className="embr-btn embr-btn-text embr-btn-sm">Message</button>
                    </div>
                  </div>
                </div>

                {/* Notification Card Example */}
                <div className="embr-card embr-card-default">
                  <div className="embr-card-header">
                    <h4 className="embr-card-title">System Notification</h4>
                  </div>
                  <div className="embr-card-content">
                    <div className="embr-stack embr-stack-gap-3">
                      <p style={{ color: 'var(--embr-text-on-dark)' }}>
                        Your EmbrKit components are ready to use! All components follow the golden ratio design principles.
                      </p>
                      <div className="embr-badge embr-badge-primary">New Feature</div>
                    </div>
                  </div>
                  <div className="embr-card-footer">
                    <div className="embr-stack embr-stack-horizontal embr-stack-between embr-stack-gap-2">
                      <span className="embr-caption" style={{ color: 'var(--embr-text-secondary-dark-bg)' }}>2 minutes ago</span>
                      <button className="embr-btn embr-btn-text embr-btn-sm">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Example */}
      {modalOpen && (
        <div className="embr-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="embr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="embr-modal-header">
              <h3 className="embr-modal-title">EmbrKit Modal Dialog</h3>
            </div>
            <div className="embr-modal-content">
              <div className="embr-stack embr-stack-gap-4">
                <p>This modal demonstrates EmbrKit's overlay components with:</p>
                <ul className="list-disc list-inside space-y-1" style={{ color: 'var(--embr-text-secondary)' }}>
                  <li>Backdrop blur effect</li>
                  <li>Smooth enter/exit animations</li>
                  <li>Click-outside to close</li>
                  <li>Accessible keyboard navigation</li>
                  <li>Consistent styling with design system</li>
                </ul>
                <div className="embr-input-group">
                  <label className="embr-label">Test Input in Modal</label>
                  <input className="embr-input" placeholder="Type something..." />
                  <div className="embr-input-help">Inputs work perfectly inside modals</div>
                </div>
              </div>
            </div>
            <div className="embr-modal-footer">
              <div className="embr-stack embr-stack-horizontal embr-stack-gap-3">
                <button className="embr-btn embr-btn-text" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button className="embr-btn embr-btn-primary" onClick={() => setModalOpen(false)}>
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Form Components Section */}
      <div className="embr-container" style={{ marginBottom: 'var(--embr-space-12)' }}>
        <h2 style={{ 
          fontSize: 'var(--embr-text-3xl)', 
          fontWeight: '600', 
          color: 'var(--embr-text-on-dark)', 
          marginBottom: 'var(--embr-space-8)',
          textAlign: 'center'
        }}>
          Advanced Form Components
        </h2>
        
        <div className="embr-grid embr-grid-cols-1 embr-grid-md-cols-2" style={{ gap: 'var(--embr-space-8)' }}>
          {/* File Upload Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">File Upload</h3>
              <p className="embr-card-subtitle">Drag and drop file upload with validation and preview</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-file-upload">
                <span className="embr-file-upload-icon">📁</span>
                <div className="embr-file-upload-text">
                  Drop files here or click to browse
                </div>
                <div className="embr-file-upload-hint">
                  Accepts: images, documents • Max 10MB
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  multiple
                  className="embr-file-upload-input"
                />
              </div>
              
              {/* Example file list */}
              <div className="embr-file-list" style={{ marginTop: 'var(--embr-space-4)' }}>
                <div className="embr-file-item">
                  <div className="embr-file-info">
                    <span className="embr-file-icon">📄</span>
                    <div className="embr-file-details">
                      <div className="embr-file-name">project-proposal.pdf</div>
                      <div className="embr-file-size">2.4 MB</div>
                    </div>
                  </div>
                  <button className="embr-file-remove">✕</button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Form Fields Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Enhanced Form Fields</h3>
              <p className="embr-card-subtitle">Form fields with validation, labels, and help text</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-form-field">
                <label className="embr-form-label required">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="embr-form-input"
                />
                <div className="embr-form-help">We'll never share your email with anyone else.</div>
              </div>

              <div className="embr-form-field">
                <label className="embr-form-label required">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter a secure password"
                  className="embr-form-input error"
                />
                <div className="embr-form-error">
                  <span className="embr-form-error-icon">⚠</span>
                  Password must be at least 8 characters long
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Select Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Multi-Select Dropdown</h3>
              <p className="embr-card-subtitle">Searchable multi-select with tags and filtering</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-multi-select">
                <div className="embr-select-trigger">
                  <div className="embr-select-values">
                    <div className="embr-select-value">
                      JavaScript
                      <button className="embr-select-value-remove">×</button>
                    </div>
                    <div className="embr-select-value">
                      React
                      <button className="embr-select-value-remove">×</button>
                    </div>
                  </div>
                  <span className="embr-select-arrow">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Wizard Demo */}
          <div className="embr-card" style={{ gridColumn: '1 / -1' }}>
            <div className="embr-card-header">
              <h3 className="embr-card-title">Multi-Step Form Wizard</h3>
              <p className="embr-card-subtitle">Guided multi-step forms with progress tracking</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-form-wizard">
                <div className="embr-wizard-header">
                  <div className="embr-wizard-progress">
                    <div className="embr-wizard-step completed">
                      <div className="embr-wizard-step-indicator">✓</div>
                      <span className="embr-wizard-step-label">Basic Info</span>
                    </div>
                    <div className="embr-wizard-step active">
                      <div className="embr-wizard-step-indicator">2</div>
                      <span className="embr-wizard-step-label">Contact</span>
                    </div>
                    <div className="embr-wizard-step">
                      <div className="embr-wizard-step-indicator">3</div>
                      <span className="embr-wizard-step-label">Review</span>
                    </div>
                  </div>
                  <h4 className="embr-wizard-title">Contact Information</h4>
                </div>

                <div className="embr-wizard-content">
                  <div className="embr-grid embr-grid-cols-1 embr-grid-md-cols-2" style={{ gap: 'var(--embr-space-4)' }}>
                    <div className="embr-form-field">
                      <label className="embr-form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 123-4567"
                        className="embr-form-input"
                      />
                    </div>
                    <div className="embr-form-field">
                      <label className="embr-form-label">LinkedIn Profile</label>
                      <input 
                        type="url" 
                        placeholder="https://linkedin.com/in/username"
                        className="embr-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="embr-wizard-actions">
                  <div className="embr-wizard-nav">
                    <button className="embr-btn embr-btn-secondary">Previous</button>
                  </div>
                  <div className="embr-wizard-nav">
                    <button className="embr-btn embr-btn-primary">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback & Notification Components Section */}
      <div className="embr-container" style={{ marginBottom: 'var(--embr-space-12)' }}>
        <h2 style={{ 
          fontSize: 'var(--embr-text-3xl)', 
          fontWeight: '600', 
          color: 'var(--embr-text-on-dark)', 
          marginBottom: 'var(--embr-space-8)',
          textAlign: 'center'
        }}>
          Feedback & Notification Components
        </h2>
        
        <div className="embr-grid embr-grid-cols-1 embr-grid-md-cols-2" style={{ gap: 'var(--embr-space-8)' }}>
          {/* Alert Components Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Alert Components</h3>
              <p className="embr-card-subtitle">System alerts and notifications for user feedback</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-alert embr-alert-info">
                <span className="embr-alert-icon">ℹ️</span>
                <div className="embr-alert-content">
                  <h4 className="embr-alert-title">Information</h4>
                  <p className="embr-alert-description">This is an informational message to keep users informed.</p>
                </div>
                <button className="embr-alert-close">✕</button>
              </div>

              <div className="embr-alert embr-alert-success">
                <span className="embr-alert-icon">✅</span>
                <div className="embr-alert-content">
                  <h4 className="embr-alert-title">Success</h4>
                  <p className="embr-alert-description">Your changes have been saved successfully!</p>
                </div>
                <button className="embr-alert-close">✕</button>
              </div>

              <div className="embr-alert embr-alert-warning">
                <span className="embr-alert-icon">⚠️</span>
                <div className="embr-alert-content">
                  <p className="embr-alert-description">Please review your settings before continuing.</p>
                </div>
                <button className="embr-alert-close">✕</button>
              </div>

              <div className="embr-alert embr-alert-error">
                <span className="embr-alert-icon">❌</span>
                <div className="embr-alert-content">
                  <h4 className="embr-alert-title">Error</h4>
                  <p className="embr-alert-description">Something went wrong. Please try again.</p>
                </div>
                <button className="embr-alert-close">✕</button>
              </div>
            </div>
          </div>

          {/* Loading States Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Loading States</h3>
              <p className="embr-card-subtitle">Loading indicators and skeleton placeholders</p>
            </div>
            <div className="embr-card-content">
              <div style={{ marginBottom: 'var(--embr-space-6)' }}>
                <h4 style={{ fontSize: 'var(--embr-text-base)', fontWeight: '600', color: 'var(--embr-text-on-dark)', marginBottom: 'var(--embr-space-3)' }}>
                  Loading Spinners
                </h4>
                <div className="embr-loading">
                  <div className="embr-loading-spinner"></div>
                  <span className="embr-loading-text">Processing your request...</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--embr-text-base)', fontWeight: '600', color: 'var(--embr-text-on-dark)', marginBottom: 'var(--embr-space-3)' }}>
                  Skeleton Placeholders
                </h4>
                <div className="embr-skeleton-card">
                  <div className="embr-skeleton embr-skeleton-avatar"></div>
                  <div className="embr-skeleton embr-skeleton-text"></div>
                  <div className="embr-skeleton embr-skeleton-text"></div>
                  <div className="embr-skeleton embr-skeleton-text"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Toast Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Enhanced Toast Notifications</h3>
              <p className="embr-card-subtitle">Rich toast messages with progress indicators</p>
            </div>
            <div className="embr-card-content">
              <div className="embr-toast-enhanced success">
                <span className="embr-toast-icon success">✅</span>
                <div className="embr-toast-content">
                  <h4 className="embr-toast-title">Upload Complete</h4>
                  <p className="embr-toast-message">Your files have been uploaded successfully.</p>
                </div>
                <button className="embr-toast-close">✕</button>
                <div className="embr-toast-progress success"></div>
              </div>

              <div className="embr-toast-enhanced warning" style={{ marginTop: 'var(--embr-space-3)' }}>
                <span className="embr-toast-icon warning">⚠️</span>
                <div className="embr-toast-content">
                  <h4 className="embr-toast-title">Storage Almost Full</h4>
                  <p className="embr-toast-message">You're using 90% of your available storage space.</p>
                </div>
                <button className="embr-toast-close">✕</button>
                <div className="embr-toast-progress warning"></div>
              </div>
            </div>
          </div>

          {/* Confirmation Dialog Demo */}
          <div className="embr-card">
            <div className="embr-card-header">
              <h3 className="embr-card-title">Confirmation Dialogs</h3>
              <p className="embr-card-subtitle">Modal confirmations for critical actions</p>
            </div>
            <div className="embr-card-content">
              <button 
                className="embr-btn embr-btn-primary" 
                style={{ marginBottom: 'var(--embr-space-4)' }}
              >
                Show Delete Confirmation
              </button>
              
              {/* Static preview of confirmation dialog */}
              <div style={{ 
                border: '2px solid var(--embr-border)', 
                borderRadius: 'var(--embr-radius-xl)', 
                padding: 'var(--embr-space-4)',
                background: 'var(--embr-surface-elevated)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 'var(--embr-text-2xl)', display: 'block', marginBottom: 'var(--embr-space-3)' }}>🗑️</span>
                  <h4 style={{ fontSize: 'var(--embr-text-lg)', fontWeight: '600', color: 'var(--embr-text-on-dark)', margin: '0 0 var(--embr-space-2) 0' }}>
                    Delete Item
                  </h4>
                  <p style={{ fontSize: 'var(--embr-text-sm)', color: 'var(--embr-text-secondary-dark-bg)', margin: '0 0 var(--embr-space-4) 0' }}>
                    Are you sure you want to delete this item? This action cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--embr-space-3)', justifyContent: 'center' }}>
                    <button className="embr-btn embr-btn-secondary">Cancel</button>
                    <button className="embr-btn embr-btn-error">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Example */}
      {showToast && (
        <div className="embr-toast-container">
          <div className="embr-toast embr-toast-success">
            <div>
              EmbrKit components are working perfectly! This toast will auto-close in 5 seconds.
              <button 
                className="ml-4 text-sm underline" 
                onClick={() => setShowToast(false)}
                style={{ color: 'var(--embr-text-secondary)' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 