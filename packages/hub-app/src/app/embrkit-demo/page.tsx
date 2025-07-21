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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full opacity-20 blur-2xl z-0" 
                   style={{ backgroundColor: 'var(--embr-glow-bright)' }} />
              <h1 className="embr-h1 text-white mb-4 z-10 embr-tracking-tight">
                <span style={{ color: 'var(--embr-glow-bright)' }}>EmbrKit</span> Design System
              </h1>
              <p className="embr-text-xl mb-6 embr-tracking-normal" style={{ color: 'var(--embr-elevated-bg)' }}>
                Build with Embr • Micro, but mighty
              </p>
              <div className="embr-caption space-y-2">
                <p>Official Embr Brand Guidelines • Golden Ratio (φ = 1.618) • Inter Typography</p>
              </div>
            </div>
          </div>

        {/* Philosophy Section */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-h2 text-white mb-6">Brand Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="embr-text-xl text-white mb-3">Modern but not trendy</h3>
              <p className="embr-body" style={{ color: 'var(--embr-elevated-bg)' }}>
                Clean, confident design with mathematical precision. Every measurement follows golden ratio progressions (φ = 1.618).
              </p>
            </div>
            <div>
              <h3 className="embr-text-xl text-white mb-3">Direct without being cold</h3>
              <p className="embr-body" style={{ color: 'var(--embr-elevated-bg)' }}>
                Embr's bold, rectangular aesthetic with substantial presence. Quietly confident, never boastful.
              </p>
            </div>
            <div>
              <h3 className="embr-text-xl text-white mb-3">Minimal yet warm</h3>
              <p className="embr-body" style={{ color: 'var(--embr-elevated-bg)' }}>
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
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-h2 text-white mb-6">Official Embr Color Palette</h2>
          <p className="embr-body mb-8" style={{ color: 'var(--embr-elevated-bg)' }}>
            Brand Guidelines v1.2 - Primary Brand & Typography Palettes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="embr-text-xl text-white mb-4">Primary Brand Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-teal)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption text-white">Embr Teal (Accent)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-warm-grey)' }}>#0F766E</div>
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
                    <div className="embr-caption text-white">Glow Bright (Fluorescent Cyan)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-warm-grey)' }}>#39F2E0</div>
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
                    <div className="embr-caption text-white">Glow Mid (Keppel)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-warm-grey)' }}>#14B8A6</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="embr-text-xl text-white mb-4">Typography Palette</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-deep-charcoal)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div>
                    <div className="embr-caption text-white">Deep Charcoal</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-warm-grey)' }}>#1F2937</div>
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
                    <div className="embr-caption text-white">Warm Grey</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-warm-grey)' }}>#6B7280</div>
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
                    <div className="embr-caption text-white">Elevated Background</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-warm-grey)' }}>#EDEDED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-text-2xl embr-font-bold text-white mb-6">
            <span style={{ color: 'var(--embr-accent)' }}>EmbrKit</span> vs Hub App Comparison
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="embr-text-lg embr-font-semibold text-white mb-4">EmbrKit Button</h3>
              <button className="embr-btn embr-btn-primary embr-btn-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
                Scan QR Code
              </button>
              <p className="embr-text-sm text-gray-400 mt-2">
                Mathematical proportions + Embr aesthetics
              </p>
            </div>
            
            <div>
              <h3 className="embr-text-lg embr-font-semibold text-white mb-4">Hub App Button (Reference)</h3>
              <button className="w-full bg-[#0F766E] hover:bg-[#13a89a] text-white font-semibold py-4 px-4 rounded-xl shadow transition-colors duration-200 flex items-center justify-center gap-2 text-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
                Scan QR Code
              </button>
              <p className="embr-text-sm text-gray-400 mt-2">
                Original Tailwind implementation
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-12 pt-8">
          <hr className="w-1/2 border-gray-700 mb-4 opacity-40 mx-auto" />
          <p>Powered by <span style={{ color: 'var(--embr-accent)' }}>EmbrKit</span> Design System</p>
          <p className="mt-1">Mathematical precision meets bold expression</p>
        </footer>

      </div>
    </div>
  );
} 