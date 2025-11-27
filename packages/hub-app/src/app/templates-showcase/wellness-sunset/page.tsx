'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitButton } from '@embr/ui'

const theme = {
  primaryColor: '#EA580C',
  secondaryColor: '#FB923C',
  backgroundColor: '#fff7ed',
  surfaceColor: '#ffedd5',
  textColor: '#7c2d12',
  textSecondaryColor: '#9a3412',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const breathingPatterns = [
  { name: 'Golden Hour', inhale: 5, hold: 5, exhale: 7, cycles: 5, description: 'Warm evening relaxation' },
  { name: 'Sunset Calm', inhale: 4, hold: 7, exhale: 8, cycles: 4, description: 'Deep tranquility' },
  { name: 'Twilight Peace', inhale: 6, hold: 2, exhale: 6, cycles: 6, description: 'Gentle unwinding' }
]

export default function WellnessSunsetTemplate() {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0])
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [timeLeft, setTimeLeft] = useState(selectedPattern.inhale)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold')
            return selectedPattern.hold
          } else if (phase === 'hold') {
            setPhase('exhale')
            return selectedPattern.exhale
          } else {
            // Cycle complete
            const newCycles = cyclesCompleted + 1
            setCyclesCompleted(newCycles)

            if (newCycles >= selectedPattern.cycles) {
              setIsActive(false)
              return 0
            }

            setPhase('inhale')
            return selectedPattern.inhale
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase, selectedPattern, cyclesCompleted])

  const startSession = () => {
    setIsActive(true)
    setCyclesCompleted(0)
    setPhase('inhale')
    setTimeLeft(selectedPattern.inhale)
  }

  const stopSession = () => {
    setIsActive(false)
    setCyclesCompleted(0)
    setPhase('inhale')
    setTimeLeft(selectedPattern.inhale)
  }

  const selectPattern = (pattern: typeof breathingPatterns[0]) => {
    setSelectedPattern(pattern)
    stopSession()
  }

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-red-100">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-lg border-b border-orange-200">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-orange-900">Sunset Serenity</h1>
                  <p className="text-sm text-orange-700 font-medium">Evening Breathing Practice</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-white hover:bg-orange-50 rounded-full font-semibold transition-colors border border-orange-200">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Breathing Circle */}
          <div className="mb-16">
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated Circle */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  isActive
                    ? phase === 'inhale'
                      ? 'scale-100 bg-gradient-to-br from-orange-500 to-red-500'
                      : phase === 'hold'
                      ? 'scale-100 bg-gradient-to-br from-amber-500 to-orange-500'
                      : 'scale-75 bg-gradient-to-br from-red-400 to-orange-400'
                    : 'scale-90 bg-gradient-to-br from-orange-500 to-amber-500'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 20px 60px rgba(251, 146, 60, 0.5)'
                    : '0 10px 40px rgba(234, 88, 12, 0.3)'
                }}
              />

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-7xl font-bold mb-2">{timeLeft}</div>
                <div className="text-2xl font-semibold uppercase tracking-wider">
                  {isActive ? phase : 'Ready'}
                </div>
                {isActive && (
                  <div className="mt-4 text-lg opacity-90">
                    Cycle {cyclesCompleted + 1} of {selectedPattern.cycles}
                  </div>
                )}
              </div>

              {/* Glow Effect */}
              {isActive && phase === 'hold' && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 animate-pulse opacity-40 blur-xl" />
              )}
            </div>

            {/* Controls */}
            <div className="mt-12 flex gap-4 justify-center">
              {!isActive ? (
                <EmbrKitButton
                  onClick={startSession}
                  size="lg"
                  className="px-10 py-4 text-lg font-semibold shadow-lg"
                >
                  Begin Practice
                </EmbrKitButton>
              ) : (
                <EmbrKitButton
                  onClick={stopSession}
                  variant="secondary"
                  size="lg"
                  className="px-10 py-4 text-lg font-semibold"
                >
                  Stop
                </EmbrKitButton>
              )}
            </div>
          </div>

          {/* Pattern Selection */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-8">Breathing Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breathingPatterns.map((pattern, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPattern(pattern)}
                  disabled={isActive}
                  className={`p-8 rounded-3xl transition-all ${
                    selectedPattern.name === pattern.name
                      ? 'bg-gradient-to-br from-orange-600 to-red-500 text-white shadow-2xl shadow-orange-600/40 scale-105'
                      : 'bg-white hover:bg-orange-50 border-2 border-orange-200'
                  } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <h3 className={`text-xl font-bold mb-3 ${
                    selectedPattern.name === pattern.name ? 'text-white' : 'text-orange-900'
                  }`}>
                    {pattern.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    selectedPattern.name === pattern.name ? 'text-orange-100' : 'text-orange-700'
                  }`}>
                    {pattern.description}
                  </p>
                  <div className={`flex justify-center gap-2 text-sm font-semibold ${
                    selectedPattern.name === pattern.name ? 'text-orange-200' : 'text-orange-600'
                  }`}>
                    <span>{pattern.inhale}s</span>
                    <span>•</span>
                    <span>{pattern.hold}s</span>
                    <span>•</span>
                    <span>{pattern.exhale}s</span>
                  </div>
                  <div className={`mt-3 text-xs ${
                    selectedPattern.name === pattern.name ? 'text-orange-200' : 'text-orange-600'
                  }`}>
                    {pattern.cycles} cycles
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-10 border-2 border-orange-200">
            <h3 className="text-2xl font-bold text-orange-900 text-center mb-8">Evening Practice Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 mb-1">Prepares for Sleep</h4>
                  <p className="text-sm text-orange-700">Signals your body it's time to wind down</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 mb-1">Releases Tension</h4>
                  <p className="text-sm text-orange-700">Helps let go of the day's stress and worries</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 mb-1">Cultivates Gratitude</h4>
                  <p className="text-sm text-orange-700">Encourages reflection on the day's positives</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 mb-1">Promotes Peace</h4>
                  <p className="text-sm text-orange-700">Creates a sense of calm and contentment</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
