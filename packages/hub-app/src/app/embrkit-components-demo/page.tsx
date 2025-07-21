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