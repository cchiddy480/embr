'use client';

import React from 'react';
import '@/lib/embrkit-core.css';
import '@/lib/embrkit-button.css';

export default function EmbrKitDemo() {
  return (
    <div className="min-h-screen p-8" style={{
      backgroundColor: 'var(--embr-background)',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: 'var(--embr-text)'
    }}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
                  <div className="text-center mb-16">
            <div className="flex flex-col items-center mb-8 relative">
              <div className="w-[24rem] h-[24rem] rounded-full blur-3xl z-0 embr-glow-animation" 
                   style={{ backgroundColor: 'var(--embr-teal)' }} />
              <h1 className="embr-h1 mb-4 z-10 embr-tracking-tight" style={{ color: '#ffffff' }}>
                <span style={{ color: 'var(--embr-teal)' }}>EmbrKit</span> Design System
              </h1>
              <p className="text-lg text-center max-w-xl font-light mb-2 z-10" style={{ color: 'var(--embr-text-secondary)' }}>
                Micro Apps. One Purpose. No Bloat.
              </p>
              <p className="italic text-center text-base font-light mb-6 z-10" style={{ color: 'var(--embr-text-muted)' }}>
                Built quietly. Built differently.
              </p>
              <div className="embr-caption space-y-2" style={{ color: 'var(--embr-text-muted)' }}>
                <p>Official Embr Brand Guidelines • Golden Ratio (φ = 1.618) • Inter Typography</p>
              </div>
            </div>
          </div>

        {/* Philosophy Section */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          backdropFilter: 'blur(10px)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-h2 mb-6" style={{ color: '#ffffff' }}>Brand Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="embr-text-xl mb-3" style={{ color: '#ffffff' }}>Modern but not trendy</h3>
              <p className="embr-body" style={{ color: 'var(--embr-text-secondary)' }}>
                Clean, confident design with mathematical precision. Every measurement follows golden ratio progressions (φ = 1.618).
              </p>
            </div>
            <div>
              <h3 className="embr-text-xl mb-3" style={{ color: '#ffffff' }}>Direct without being cold</h3>
              <p className="embr-body" style={{ color: 'var(--embr-text-secondary)' }}>
                Embr's bold, rectangular aesthetic with substantial presence. Quietly confident, never boastful.
              </p>
            </div>
            <div>
              <h3 className="embr-text-xl mb-3" style={{ color: '#ffffff' }}>Minimal yet warm</h3>
              <p className="embr-body" style={{ color: 'var(--embr-text-secondary)' }}>
                Generous whitespace, Inter typography, and careful optical corrections for perfect readability.
              </p>
            </div>
          </div>
        </section>

        {/* Button Showcase */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-text-2xl embr-font-bold text-white mb-6">EmbrKit Buttons</h2>
          <p className="embr-text-base text-gray-300 mb-8">
            Rectangular design with golden ratio proportions - matching your hub app's aesthetic
          </p>
          
          <div className="space-y-8">
            {/* Button Types */}
            <div>
              <h3 className="embr-text-lg embr-font-semibold text-white mb-4">Button Types</h3>
              <div className="flex flex-wrap gap-4">
                <button className="embr-btn embr-btn-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                  </svg>
                  Primary Button
                </button>
                <button className="embr-btn embr-btn-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Secondary Button
                </button>
                <button className="embr-btn embr-btn-text">Text Button</button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="embr-text-lg embr-font-semibold text-white mb-4">Size Variants (Golden Ratio Progression)</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="embr-btn embr-btn-primary embr-btn-sm">Small</button>
                <button className="embr-btn embr-btn-primary">Medium (Default)</button>
                <button className="embr-btn embr-btn-primary embr-btn-lg">Large</button>
              </div>
            </div>

            {/* Special Effects */}
            <div>
              <h3 className="embr-text-lg embr-font-semibold text-white mb-4">Special Effects</h3>
              <div className="flex flex-wrap gap-4">
                <button className="embr-btn embr-btn-primary embr-btn-glow">Glow Effect</button>
                <button className="embr-btn embr-btn-primary embr-btn-loading">Loading State</button>
                <button className="embr-btn embr-btn-primary embr-btn-icon">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-text-2xl embr-font-bold text-white mb-6">Typography Scale</h2>
          <p className="embr-text-base text-gray-300 mb-8">
            Mathematical progression based on golden ratio with optical corrections
          </p>
          
          <div className="space-y-6">
            <div className="embr-text-4xl embr-font-bold text-white embr-tracking-tight">Display (4xl) - φ³ = ~4.236rem</div>
            <div className="embr-text-3xl embr-font-bold text-white embr-tracking-tight">Heading (3xl) - φ² = ~2.618rem</div>
            <div className="embr-text-2xl embr-font-semibold text-white embr-tracking-tight">Title (2xl) - φ × √φ = ~2.058rem</div>
            <div className="embr-text-xl embr-font-semibold text-white">Large (xl) - φ = ~1.618rem</div>
            <div className="embr-text-lg embr-font-medium text-white">Body Large (lg) - √φ = ~1.272rem</div>
            <div className="embr-text-base text-white">Body (base) - 1rem</div>
            <div className="embr-text-sm text-gray-300">Small (sm) - 1/√φ = ~0.786rem</div>
            <div className="embr-text-xs text-gray-400">Extra Small (xs) - 1/φ = ~0.618rem</div>
          </div>
        </section>

        {/* Brand Colors */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          backdropFilter: 'blur(10px)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-h2 mb-6" style={{ color: '#ffffff' }}>Official Embr Color Palette</h2>
          <p className="embr-body mb-8" style={{ color: 'var(--embr-text-secondary)' }}>
            Brand Guidelines v1.2 - Primary Brand & Typography Palettes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="embr-text-xl mb-4" style={{ color: '#ffffff' }}>Primary Brand Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-teal)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption" style={{ color: '#ffffff' }}>Embr Teal (Accent)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#0F766E</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-glow-bright)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption" style={{ color: '#ffffff' }}>Glow Bright (Fluorescent Cyan)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#39F2E0</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-glow-mid)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption" style={{ color: '#ffffff' }}>Glow Mid (Keppel)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#14B8A6</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="embr-text-xl mb-4" style={{ color: '#ffffff' }}>Typography Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-deep-charcoal)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption" style={{ color: '#ffffff' }}>Deep Charcoal</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#1F2937</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-warm-grey)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption" style={{ color: '#ffffff' }}>Warm Grey</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#6B7280</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-elevated-bg)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption" style={{ color: '#ffffff' }}>Elevated Background</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#EDEDED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EmbrKit Buttons */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          backdropFilter: 'blur(10px)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-h2 mb-6" style={{ color: '#ffffff' }}>EmbrKit Buttons</h2>
          <p className="embr-body mb-8" style={{ color: 'var(--embr-text-secondary)' }}>
            Rectangular design with golden ratio proportions - matching your hub app's aesthetic
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="embr-text-xl mb-4" style={{ color: '#ffffff' }}>Button Types</h3>
              <div className="space-y-4">
                <button className="embr-btn embr-btn-primary embr-btn-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                  </svg>
                  Primary Button
                </button>
                <button className="embr-btn embr-btn-secondary embr-btn-full">
                  Secondary Button
                </button>
                <button className="embr-btn embr-btn-text embr-btn-full">
                  Text Button
                </button>
              </div>
              <p className="embr-caption mt-4" style={{ color: 'var(--embr-text-muted)' }}>
                Mathematical proportions + Embr brand aesthetic
              </p>
            </div>
            
            <div>
              <h3 className="embr-text-xl mb-4" style={{ color: '#ffffff' }}>Button Sizes</h3>
              <div className="space-y-4">
                <button className="embr-btn embr-btn-primary embr-btn-sm embr-btn-full">
                  Small Button
                </button>
                <button className="embr-btn embr-btn-primary embr-btn-full">
                  Medium Button (Default)
                </button>
                <button className="embr-btn embr-btn-primary embr-btn-lg embr-btn-full">
                  Large Button
                </button>
              </div>
              <p className="embr-caption mt-4" style={{ color: 'var(--embr-text-muted)' }}>
                Golden ratio size progression
              </p>
            </div>
          </div>
        </section>

        {/* Footer - Landing Page Style */}
        <footer className="w-full flex flex-col items-center mt-12 pt-6 text-sm">
          <hr className="w-1/2 border-gray-700 mb-4 opacity-40" />
          <div className="mb-2 opacity-70" style={{ color: 'var(--embr-text-muted)' }}>© 2025 Embr</div>
          <div className="flex gap-4 mb-2 opacity-80" style={{ color: 'var(--embr-text-muted)' }}>
            <span className="hover:underline cursor-pointer">EmbrKit Demo</span>
            <span className="hover:underline cursor-pointer">Design System</span>
            <span className="hover:underline cursor-pointer">Brand Guidelines</span>
          </div>
          <div className="italic text-xs opacity-60" style={{ color: 'var(--embr-text-footer)' }}>Build with Embr.</div>
        </footer>

      </div>
    </div>
  );
} 