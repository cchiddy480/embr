'use client';

import React, { useState } from 'react';
// Import all necessary LiftKit CSS
import '@/lib/liftkit-core.css';
import '@/lib/liftkitvars.css';
import '@/lib/typography.css';
import '@/components/button.css';
import '@/components/card.css';
import '@/components/heading.css';
import '@/components/material-layer.css';
import '@/components/state-layer.css';

// Mock client configurations for testing
const festivalTheme = {
  fontFamily: 'Inter, system-ui, sans-serif',
  colors: {
    primary: '#0F766E',
    secondary: '#38F9E4',
    surface: '#1F2937',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF'
  },
  liftkit: {
    primaryColor: '#0F766E',
    fontFamily: 'Inter',
    borderRadius: 'golden-ratio' as const,
    materialStyle: 'glass' as const,
    scaling: 1.0,
    opticalCorrection: true,
    accessibility: 'standard' as const
  }
};

const weddingTheme = {
  fontFamily: 'Inter, system-ui, sans-serif',
  colors: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    surface: '#1F2937',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF'
  },
  liftkit: {
    primaryColor: '#8B5CF6',
    fontFamily: 'Inter',
    borderRadius: 'golden-ratio' as const,
    materialStyle: 'soft' as const,
    scaling: 1.1,
    opticalCorrection: true,
    accessibility: 'high' as const
  }
};

const vibrantTheme = {
  fontFamily: 'Inter, system-ui, sans-serif',
  colors: {
    primary: '#EF4444',
    secondary: '#F87171',
    surface: '#1F2937',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF'
  },
  liftkit: {
    primaryColor: '#EF4444',
    fontFamily: 'Inter',
    borderRadius: 'rounded' as const,
    materialStyle: 'vibrant' as const,
    scaling: 1.2,
    opticalCorrection: false,
    accessibility: 'enhanced' as const
  }
};

// LiftKit Button Component
function LiftKitButton({ 
  children, 
  variant = 'filled', 
  size = 'md',
  onClick,
  disabled = false,
  className = ''
}: {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      data-lk-component="button"
      data-lk-button-variant={variant}
      data-lk-button-size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}

    >
      <div data-lk-button-content-wrap="true">
        {children}
      </div>
    </button>
  );
}

// LiftKit Card Component
function LiftKitCard({ 
  children, 
  variant = 'fill',
  scaleFactor = 'body',
  className = '',
  opticalCorrection = false
}: {
  children: React.ReactNode;
  variant?: 'fill' | 'outline' | 'transparent';
  scaleFactor?: 'zero' | 'body' | 'heading' | 'title3' | 'title2' | 'title1' | 'display2' | 'display1';
  className?: string;
  opticalCorrection?: boolean;
}) {
  return (
    <div
      data-lk-component="card"
      data-lk-card-variant={variant}
      data-lk-card-scale-factor={scaleFactor}
      data-lk-card-optic-correction={opticalCorrection}
      className={className}

    >
      {children}
    </div>
  );
}

export default function ComponentsDemo() {
  const [currentTheme, setCurrentTheme] = useState<'festival' | 'wedding' | 'vibrant'>('festival');

  const themes = {
    festival: festivalTheme,
    wedding: weddingTheme,
    vibrant: vibrantTheme
  };

  const currentThemeData = themes[currentTheme];

  // Apply CSS custom properties for theming
  const themeStyles = {
    // Override LiftKit colors with our theme
    '--light__primary_lkv': currentThemeData.liftkit.primaryColor,
    '--dark__primary_lkv': currentThemeData.liftkit.primaryColor,
    '--lk-primary': currentThemeData.liftkit.primaryColor,
    '--lk-onprimary': '#FFFFFF',
    '--lk-surfacecontainer': currentThemeData.colors.surface,
    '--lk-onsurface': currentThemeData.colors.text,
    '--lk-outlinevariant': `${currentThemeData.liftkit.primaryColor}40`,
    '--lk-background': '#1F2937',
    '--lk-onbackground': currentThemeData.colors.text,
    fontFamily: currentThemeData.liftkit.fontFamily,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-gray-900 p-8" style={themeStyles}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Theme Selector */}
        <LiftKitCard className="mb-8" scaleFactor="heading">
          <div className="space-y-4">
            <h1 data-lk-component="heading" className="display2 text-white">
              Real LiftKit Components Demo
            </h1>
            <p className="body text-gray-300">
              Using actual LiftKit CSS components with golden ratio proportions and optical corrections.
            </p>
            
            <div className="flex gap-4">
              <LiftKitButton
                variant={currentTheme === 'festival' ? 'filled' : 'outline'}
                onClick={() => setCurrentTheme('festival')}
              >
                Festival Theme
              </LiftKitButton>
              <LiftKitButton
                variant={currentTheme === 'wedding' ? 'filled' : 'outline'}
                onClick={() => setCurrentTheme('wedding')}
              >
                Wedding Theme
              </LiftKitButton>
              <LiftKitButton
                variant={currentTheme === 'vibrant' ? 'filled' : 'outline'}
                onClick={() => setCurrentTheme('vibrant')}
              >
                Vibrant Theme
              </LiftKitButton>
            </div>
          </div>
        </LiftKitCard>

        {/* Theme Information */}
        <LiftKitCard scaleFactor="body">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">
            Current Theme: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-2">LiftKit Settings:</h3>
                              <ul className="space-y-1 text-gray-400 body">
                  <li>Primary Color: {currentThemeData.liftkit.primaryColor}</li>
                  <li>Border Radius: {currentThemeData.liftkit.borderRadius}</li>
                  <li>Material Style: {currentThemeData.liftkit.materialStyle}</li>
                  <li>Scaling: {currentThemeData.liftkit.scaling}x</li>
                </ul>
            </div>
            <div>
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-2">Features:</h3>
                              <ul className="space-y-1 text-gray-400 body">
                  <li>Optical Correction: {currentThemeData.liftkit.opticalCorrection ? 'Enabled' : 'Disabled'}</li>
                  <li>Accessibility: {currentThemeData.liftkit.accessibility}</li>
                  <li>Golden Ratio: Applied automatically</li>
                  <li>CSS-Based: Real LiftKit components</li>
                </ul>
            </div>
          </div>
        </LiftKitCard>

        {/* Button Variants */}
        <LiftKitCard scaleFactor="body">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">LiftKit Button Variants</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <LiftKitButton variant="filled">Filled Button</LiftKitButton>
              <LiftKitButton variant="outline">Outline Button</LiftKitButton>
              <LiftKitButton variant="text">Text Button</LiftKitButton>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <LiftKitButton variant="filled" size="sm">Small</LiftKitButton>
              <LiftKitButton variant="filled" size="md">Medium</LiftKitButton>
              <LiftKitButton variant="filled" size="lg">Large</LiftKitButton>
            </div>
          </div>
        </LiftKitCard>

        {/* Nested Cards */}
        <LiftKitCard scaleFactor="body">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">Nested Cards & Layouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LiftKitCard variant="outline" scaleFactor="body" opticalCorrection={true}>
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-3">Event Schedule</h3>
              <div className="space-y-2 text-gray-400 mb-4 body">
                <div className="flex justify-between">
                  <span>9:00 AM</span>
                  <span>Opening Ceremony</span>
                </div>
                <div className="flex justify-between">
                  <span>11:00 AM</span>
                  <span>Keynote Speech</span>
                </div>
                <div className="flex justify-between">
                  <span>2:00 PM</span>
                  <span>Workshop Sessions</span>
                </div>
              </div>
              <LiftKitButton variant="text">View Full Schedule</LiftKitButton>
            </LiftKitCard>

            <LiftKitCard variant="outline" scaleFactor="body">
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <LiftKitButton variant="filled">Register Now</LiftKitButton>
                <LiftKitButton variant="outline">View Map</LiftKitButton>
                <LiftKitButton variant="text">Contact Support</LiftKitButton>
              </div>
            </LiftKitCard>
          </div>
        </LiftKitCard>

        {/* Design Principles */}
        <LiftKitCard scaleFactor="body">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">Real LiftKit Features</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 data-lk-component="heading" className="subheading text-white mb-2">Authentic LiftKit Components</h3>
              <p className="body">Using the actual LiftKit CSS framework with proper data attributes and golden ratio calculations.</p>
            </div>
            
            <div>
              <h3 data-lk-component="heading" className="subheading text-white mb-2">CSS Custom Properties</h3>
              <p className="body">Dynamic theming through CSS variables that integrate with your Embr client configurations.</p>
            </div>
            
            <div>
              <h3 data-lk-component="heading" className="subheading text-white mb-2">Optical Corrections</h3>
              <p className="body">Built-in visual adjustments for perfect spacing and alignment, activated via data attributes.</p>
            </div>
            
            <div>
              <h3 data-lk-component="heading" className="subheading text-white mb-2">Scale Factors</h3>
              <p className="body">Different card scale factors (body, heading, title, display) for hierarchical layouts.</p>
            </div>
          </div>
        </LiftKitCard>

      </div>
    </div>
  );
} 