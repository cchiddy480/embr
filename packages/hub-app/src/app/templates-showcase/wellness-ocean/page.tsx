'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitButton } from '@embr/ui'

const theme = {
  primaryColor: '#0891B2',
  secondaryColor: '#06B6D4',
  backgroundColor: '#ecfeff',
  surfaceColor: '#cffafe',
  textColor: '#164e63',
  textSecondaryColor: '#0e7490',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'soft' as const
}

const breathingPatterns = [
  { name: '4-7-8 Relaxation', inhale: 4, hold: 7, exhale: 8, cycles: 4, description: 'Deep relaxation technique' },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, cycles: 5, description: 'Balance and focus' },
  { name: 'Ocean Wave', inhale: 5, hold: 5, exhale: 5, cycles: 6, description: 'Tranquil rhythmic breathing' }
]

export default function WellnessOceanTemplate() {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[2])
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-lg border-b border-cyan-200">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-cyan-900">Ocean Breath</h1>
                  <p className="text-sm text-cyan-700 font-medium">Mindful Breathing Practice</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-5 py-2 bg-white hover:bg-cyan-50 rounded-full font-semibold transition-colors border border-cyan-200">
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
                      ? 'scale-100 bg-gradient-to-br from-cyan-400 to-blue-500'
                      : phase === 'hold'
                      ? 'scale-100 bg-gradient-to-br from-blue-500 to-cyan-400'
                      : 'scale-75 bg-gradient-to-br from-sky-400 to-cyan-500'
                    : 'scale-90 bg-gradient-to-br from-cyan-500 to-blue-500'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 20px 60px rgba(6, 182, 212, 0.5)'
                    : '0 10px 40px rgba(8, 145, 178, 0.3)'
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

              {/* Ripple Effect */}
              {isActive && phase === 'exhale' && (
                <div className="absolute inset-0 rounded-full border-4 border-cyan-300 animate-ping opacity-30" />
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
            <h2 className="text-3xl font-bold text-cyan-900 text-center mb-8">Breathing Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breathingPatterns.map((pattern, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPattern(pattern)}
                  disabled={isActive}
                  className={`p-8 rounded-3xl transition-all ${
                    selectedPattern.name === pattern.name
                      ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-2xl shadow-cyan-600/40 scale-105'
                      : 'bg-white hover:bg-cyan-50 border-2 border-cyan-200'
                  } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <h3 className={`text-xl font-bold mb-3 ${
                    selectedPattern.name === pattern.name ? 'text-white' : 'text-cyan-900'
                  }`}>
                    {pattern.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    selectedPattern.name === pattern.name ? 'text-cyan-100' : 'text-cyan-700'
                  }`}>
                    {pattern.description}
                  </p>
                  <div className={`flex justify-center gap-2 text-sm font-semibold ${
                    selectedPattern.name === pattern.name ? 'text-cyan-200' : 'text-cyan-600'
                  }`}>
                    <span>{pattern.inhale}s</span>
                    <span>•</span>
                    <span>{pattern.hold}s</span>
                    <span>•</span>
                    <span>{pattern.exhale}s</span>
                  </div>
                  <div className={`mt-3 text-xs ${
                    selectedPattern.name === pattern.name ? 'text-cyan-200' : 'text-cyan-600'
                  }`}>
                    {pattern.cycles} cycles
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-10 border-2 border-cyan-200">
            <h3 className="text-2xl font-bold text-cyan-900 text-center mb-8">Benefits of Ocean Breathing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-900 mb-1">Reduces Stress</h4>
                  <p className="text-sm text-cyan-700">Calms the nervous system and reduces cortisol levels</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-900 mb-1">Improves Focus</h4>
                  <p className="text-sm text-cyan-700">Enhances concentration and mental clarity</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-900 mb-1">Better Sleep</h4>
                  <p className="text-sm text-cyan-700">Promotes relaxation and improves sleep quality</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
                    <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-900 mb-1">Emotional Balance</h4>
                  <p className="text-sm text-cyan-700">Regulates emotions and promotes inner peace</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
