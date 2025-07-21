'use client';

import React, { useState } from 'react';
import { Button } from '@embr/ui/src/components/Button/Button';
import { Input } from '@embr/ui/src/components/Input/Input';
import { Card } from '@embr/ui/src/components/Card/Card';
import { ThemeProvider } from '@embr/ui/src/components/theme';

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

export default function ComponentsDemo() {
  const [currentTheme, setCurrentTheme] = useState<'festival' | 'wedding' | 'vibrant'>('festival');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const themes = {
    festival: festivalTheme,
    wedding: weddingTheme,
    vibrant: vibrantTheme
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3) {
      setInputError('Please enter at least 3 characters');
    } else {
      setInputError('');
    }
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Theme Selector */}
          <Card className="mb-8">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white">
                LiftKit-Inspired Components Demo
              </h1>
              <p className="text-gray-300">
                Showcasing golden ratio proportions, optical corrections, and dynamic theming.
              </p>
              
              <div className="flex gap-4">
                <Button
                  variant={currentTheme === 'festival' ? 'primary' : 'secondary'}
                  onClick={() => setCurrentTheme('festival')}
                >
                  Festival Theme
                </Button>
                <Button
                  variant={currentTheme === 'wedding' ? 'primary' : 'secondary'}
                  onClick={() => setCurrentTheme('wedding')}
                >
                  Wedding Theme
                </Button>
                <Button
                  variant={currentTheme === 'vibrant' ? 'primary' : 'secondary'}
                  onClick={() => setCurrentTheme('vibrant')}
                >
                  Vibrant Theme
                </Button>
              </div>
            </div>
          </Card>

          {/* Theme Information */}
          <Card
            header={
              <h2 className="text-xl font-semibold text-white">
                Current Theme: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
              </h2>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-300 mb-2">LiftKit Settings:</h3>
                <ul className="space-y-1 text-gray-400">
                  <li>Primary Color: {themes[currentTheme].liftkit.primaryColor}</li>
                  <li>Border Radius: {themes[currentTheme].liftkit.borderRadius}</li>
                  <li>Material Style: {themes[currentTheme].liftkit.materialStyle}</li>
                  <li>Scaling: {themes[currentTheme].liftkit.scaling}x</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-300 mb-2">Features:</h3>
                <ul className="space-y-1 text-gray-400">
                  <li>Optical Correction: {themes[currentTheme].liftkit.opticalCorrection ? 'Enabled' : 'Disabled'}</li>
                  <li>Accessibility: {themes[currentTheme].liftkit.accessibility}</li>
                  <li>Golden Ratio: Applied to all proportions</li>
                  <li>Dynamic Theming: Config-driven</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Button Variants */}
          <Card
            header={<h2 className="text-xl font-semibold text-white">Button Variants</h2>}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" disabled>Disabled Primary</Button>
                <Button variant="secondary" disabled>Disabled Secondary</Button>
                <Button variant="ghost" disabled>Disabled Ghost</Button>
              </div>
            </div>
          </Card>

          {/* Input Components */}
          <Card
            header={<h2 className="text-xl font-semibold text-white">Input Components</h2>}
          >
            <div className="space-y-6">
              <Input
                label="Basic Input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter some text..."
                helperText="This input demonstrates golden ratio proportions"
                error={inputError}
                name="demo-input"
              />

              <Input
                label="Input with Icon"
                value=""
                onChange={() => {}}
                placeholder="Search..."
                icon="🔍"
                helperText="Icon spacing is optically corrected"
                name="search-input"
              />

              <Input
                label="Disabled Input"
                value="This input is disabled"
                onChange={() => {}}
                disabled
                helperText="Disabled state with proper opacity"
                name="disabled-input"
              />
            </div>
          </Card>

          {/* Nested Cards */}
          <Card
            header={<h2 className="text-xl font-semibold text-white">Nested Cards & Layouts</h2>}
            opticalCorrection={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                header={<h3 className="font-semibold text-gray-300">Event Schedule</h3>}
                footer={
                  <Button variant="ghost" className="w-full">
                    View Full Schedule
                  </Button>
                }
              >
                <div className="space-y-2 text-gray-400">
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
              </Card>

              <Card
                header={<h3 className="font-semibold text-gray-300">Quick Actions</h3>}
              >
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">
                    Register Now
                  </Button>
                  <Button variant="secondary" className="w-full">
                    View Map
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          {/* Design Principles */}
          <Card
            header={<h2 className="text-xl font-semibold text-white">LiftKit Design Principles</h2>}
          >
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">Golden Ratio Proportions (φ ≈ 1.618)</h3>
                <p className="text-sm">All spacing, padding, and sizing calculations are based on the golden ratio for natural visual harmony.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">Optical Corrections</h3>
                <p className="text-sm">Padding and spacing are visually adjusted to compensate for font line-height and visual weight.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">Material Styles</h3>
                <p className="text-sm">Different material effects (glass, soft, vibrant, rubber, flat) provide varied visual experiences.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">Config-Driven Theming</h3>
                <p className="text-sm">All styling is driven by client configuration, enabling rapid customization for different brands.</p>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </ThemeProvider>
  );
} 