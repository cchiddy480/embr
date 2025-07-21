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
    <div className="min-h-screen bg-[#101926] p-8" style={themeStyles}>
              <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header with Embr Branding */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#0F766E] opacity-20 blur-2xl z-0" />
              <h1 data-lk-component="heading" className="display2 text-white mb-4 z-10">
                <span className="text-[#38F9E4]">Embr</span> + LiftKit Demo
              </h1>
              <p className="body text-gray-300 mb-6">
                Authentic LiftKit components integrated with Embr's design system
              </p>
            </div>
          </div>
          
          {/* Theme Selector */}
          <LiftKitCard className="mb-8" scaleFactor="heading">
                        <div className="space-y-4">
              <h2 data-lk-component="heading" className="title3 text-white mb-4">
                Choose Theme Configuration
              </h2>
              <p className="body text-gray-300 mb-6">
                Test how LiftKit adapts to different Embr client configurations
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <LiftKitButton
                  variant={currentTheme === 'festival' ? 'filled' : 'outline'}
                  onClick={() => setCurrentTheme('festival')}
                  className={currentTheme === 'festival' ? 'bg-[#0F766E] hover:bg-[#13a89a]' : 'border-[#2d3c5a] hover:bg-[#22304a]'}
                >
                  Festival Theme
                </LiftKitButton>
                <LiftKitButton
                  variant={currentTheme === 'wedding' ? 'filled' : 'outline'}
                  onClick={() => setCurrentTheme('wedding')}
                  className={currentTheme === 'wedding' ? 'bg-[#8B5CF6] hover:bg-[#9F7AEA]' : 'border-[#2d3c5a] hover:bg-[#22304a]'}
                >
                  Wedding Theme
                </LiftKitButton>
                <LiftKitButton
                  variant={currentTheme === 'vibrant' ? 'filled' : 'outline'}
                  onClick={() => setCurrentTheme('vibrant')}
                  className={currentTheme === 'vibrant' ? 'bg-[#F59E0B] hover:bg-[#FBBF24]' : 'border-[#2d3c5a] hover:bg-[#22304a]'}
                >
                  Vibrant Theme
                </LiftKitButton>
              </div>
            </div>
        </LiftKitCard>

        {/* Theme Information */}
        <LiftKitCard scaleFactor="body" className="bg-[#1a2332] border border-[#2d3c5a]">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">
            Current Theme: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <LiftKitCard scaleFactor="body" className="bg-[#1a2332] border border-[#2d3c5a]">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">LiftKit Button Variants</h2>
          <div className="space-y-6">
            <div>
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-3">Button Types</h3>
              <div className="flex flex-wrap gap-4">
                <LiftKitButton variant="filled" className="bg-[#0F766E] hover:bg-[#13a89a]">Filled Button</LiftKitButton>
                <LiftKitButton variant="outline" className="border-[#2d3c5a] hover:bg-[#22304a]">Outline Button</LiftKitButton>
                <LiftKitButton variant="text" className="hover:bg-[#22304a]">Text Button</LiftKitButton>
              </div>
            </div>
            
            <div>
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-3">Button Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LiftKitButton variant="filled" size="sm" className="bg-[#0F766E] hover:bg-[#13a89a]">Small</LiftKitButton>
                <LiftKitButton variant="filled" size="md" className="bg-[#0F766E] hover:bg-[#13a89a]">Medium</LiftKitButton>
                <LiftKitButton variant="filled" size="lg" className="bg-[#0F766E] hover:bg-[#13a89a]">Large</LiftKitButton>
              </div>
            </div>
          </div>
        </LiftKitCard>

        {/* Nested Cards */}
        <LiftKitCard scaleFactor="body" className="bg-[#1a2332] border border-[#2d3c5a]">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">Nested Cards & Layouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LiftKitCard variant="outline" scaleFactor="body" opticalCorrection={true} className="bg-[#0f1419] border-[#2d3c5a]">
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
              <LiftKitButton variant="text" className="hover:bg-[#22304a] text-[#38F9E4]">View Full Schedule</LiftKitButton>
            </LiftKitCard>

            <LiftKitCard variant="outline" scaleFactor="body" className="bg-[#0f1419] border-[#2d3c5a]">
              <h3 data-lk-component="heading" className="subheading text-gray-300 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <LiftKitButton variant="filled" className="bg-[#0F766E] hover:bg-[#13a89a] w-full">Register Now</LiftKitButton>
                <LiftKitButton variant="outline" className="border-[#2d3c5a] hover:bg-[#22304a] w-full">View Map</LiftKitButton>
                <LiftKitButton variant="text" className="hover:bg-[#22304a] text-[#38F9E4] w-full">Contact Support</LiftKitButton>
              </div>
            </LiftKitCard>
          </div>
        </LiftKitCard>

        {/* Design Principles */}
        <LiftKitCard scaleFactor="body" className="bg-[#1a2332] border border-[#2d3c5a]">
          <h2 data-lk-component="heading" className="title2 text-white mb-4">
            <span className="text-[#38F9E4]">Embr</span> + LiftKit Integration
          </h2>
          <div className="space-y-6 text-gray-300">
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

        {/* Footer matching hub app */}
        <footer className="text-center text-sm text-gray-400 mt-12 pt-8">
          <hr className="w-1/2 border-gray-700 mb-4 opacity-40 mx-auto" />
          <p>Powered by <span className="text-[#38F9E4]">Embr</span> Platform + LiftKit</p>
          <p className="mt-1">Micro apps. One purpose. Golden ratio perfection.</p>
        </footer>

      </div>
    </div>
  );
} 