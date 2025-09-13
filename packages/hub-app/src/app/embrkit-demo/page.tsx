'use client';

import React from 'react';
// Import EmbrKit from centralized package
import '@embr/ui';

export default function EmbrKitDemo() {
  // Demo-specific CSS variables to ensure independence
  const demoStyles = `
    :root {
      --embr-primary-color: #0F766E;
      --embr-primary-hover: #13a89a;
      --embr-secondary-color: #6B7280;
      --embr-background: #101926;
      --embr-surface: rgba(16, 25, 38, 0.8);
      --embr-surface-elevated: rgba(16, 25, 38, 0.95);
      --embr-text: #ffffff;
      --embr-text-on-dark: #ffffff;
      --embr-text-secondary: #e5e7eb;
      --embr-text-secondary-dark-bg: rgba(254,254,254,0.7);
      --embr-text-muted: rgba(254, 254, 254, 0.7);
      --embr-border: rgba(107, 114, 128, 0.2);
      --embr-button-outline-color: #38F9E4;
      --embr-teal: #0F766E;
      --embr-cream-white: #FEFEFE;
      --embr-deep-charcoal: #1F2937;
      --embr-space-8: 2rem;
      --embr-radius-xl: 0.75rem;
      --embr-radius-md: 0.375rem;
    }
  `;

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: demoStyles }} />
      <div className="min-h-screen p-8" style={{
        backgroundColor: '#101926',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#ffffff'
      }}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center mb-8">
            <h1 className="embr-h1 mb-4 embr-tracking-tight" style={{ color: '#ffffff' }}>
              <span style={{ color: 'var(--embr-teal)' }}>EmbrKit</span> Design System
            </h1>
            <p className="text-lg text-center max-w-xl font-light mb-2 z-10" style={{ color: 'var(--embr-text-on-dark)' }}>
              Micro Apps. One Purpose. No Bloat.
            </p>
            <p className="italic text-center text-base font-light mb-6 z-10" style={{ color: 'rgba(254, 254, 254, 0.8)' }}>
              Built quietly. Built differently.
            </p>
            <div className="embr-caption space-y-2" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>
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
          <p className="embr-text-base mb-8" style={{ color: 'var(--embr-text-secondary)' }}>
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
          </div>
        </section>

        {/* Typography System */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          backdropFilter: 'blur(10px)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-text-2xl embr-font-bold text-white mb-6">Typography System</h2>
          <p className="embr-text-base mb-8" style={{ color: 'var(--embr-text-on-dark)' }}>
            Brand Guidelines v1.2 - Inter font family with mathematical golden ratio progression
          </p>
          
          <div className="space-y-6">
            <div>
              <div className="embr-h1 embr-tracking-tight" style={{ color: 'var(--embr-text-on-dark)' }}>H1 Heading</div>
              <div className="embr-caption" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>SemiBold • 48px (36-48px range) • Inter</div>
            </div>
            <div>
              <div className="embr-h2 embr-tracking-tight" style={{ color: 'var(--embr-text-on-dark)' }}>H2 Heading</div>
              <div className="embr-caption" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>Medium • 32px (28-32px range) • Inter</div>
            </div>
            <div>
              <div className="embr-body" style={{ color: 'var(--embr-text-on-dark)' }}>Body Text - This is the primary body text used for content, articles, and general reading. It maintains excellent readability.</div>
              <div className="embr-caption" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>Regular • 18px (16-18px range) • Inter</div>
            </div>
            <div>
              <div className="embr-caption" style={{ color: 'rgba(254, 254, 254, 0.8)' }}>Caption Text - Used for metadata, timestamps, and secondary information</div>
              <div className="embr-caption" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>Medium • 14px (12-14px range) • Inter</div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section style={{
          backgroundColor: 'var(--embr-surface)',
          backdropFilter: 'blur(10px)',
          padding: 'var(--embr-space-8)',
          borderRadius: 'var(--embr-radius-xl)',
          border: '1px solid var(--embr-border)'
        }}>
          <h2 className="embr-h2 mb-6" style={{ color: '#ffffff' }}>Official Embr Color Palette</h2>
          <p className="embr-body mb-8" style={{ color: 'var(--embr-text-on-dark)' }}>
            Brand Guidelines v1.2 - Complete Primary Brand & Typography Palettes
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary Brand Palette */}
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
                  <div className="flex-1">
                    <div className="embr-caption font-medium" style={{ color: '#ffffff' }}>Embr Teal (Accent)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#0F766E • CTAs, links, highlights</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-cream-white)',
                    borderRadius: 'var(--embr-radius-md)',
                    border: '1px solid var(--embr-border)'
                  }}></div>
                  <div className="flex-1">
                    <div className="embr-caption font-medium" style={{ color: '#ffffff' }}>Cream White (Base)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#FEFEFE • Backgrounds, canvas</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: 'var(--embr-deep-charcoal)',
                    borderRadius: 'var(--embr-radius-md)'
                  }}></div>
                  <div className="flex-1">
                    <div className="embr-caption font-medium" style={{ color: '#ffffff' }}>Deep Charcoal (Dark)</div>
                    <div className="embr-caption" style={{ color: 'var(--embr-text-muted)' }}>#1F2937 • Main text, dark UI, overlays</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Colors */}
            <div>
              <h3 className="embr-text-xl mb-4" style={{ color: '#ffffff' }}>Typography Colors</h3>
              <div className="space-y-3">
                <div>
                  <div className="embr-text-primary bg-white p-3 rounded" style={{ backgroundColor: 'var(--embr-cream-white)' }}>Primary Text - Deep Charcoal</div>
                  <div className="embr-caption mt-1" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>#1F2937 • Body, headings, UI labels</div>
                </div>
                <div>
                  <div className="embr-text-secondary-light-bg bg-white p-3 rounded" style={{ backgroundColor: 'var(--embr-cream-white)' }}>Secondary Text - Warm Grey</div>
                  <div className="embr-caption mt-1" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>#6B7280 • Metadata, captions</div>
                </div>
                <div>
                  <div className="embr-text-accent bg-white p-3 rounded font-medium" style={{ backgroundColor: 'var(--embr-cream-white)' }}>Accent/Link Text - Embr Teal</div>
                  <div className="embr-caption mt-1" style={{ color: 'rgba(254, 254, 254, 0.7)' }}>#0F766E • Links, hover states</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      </div>
    </div>
  );
} 