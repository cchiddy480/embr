'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitButton
} from '@embr/ui'

const theme = {
  primaryColor: '#059669',
  secondaryColor: '#34D399',
  backgroundColor: '#f0fdf4',
  surfaceColor: '#dcfce7',
  textColor: '#064e3b',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'golden-ratio' as const,
  materialStyle: 'soft' as const
}

const breathingPatterns = [
  { id: '4-7-8', name: 'Relaxing (4-7-8)', inhale: 4, hold: 7, exhale: 8, description: 'Calming breath for stress relief' },
  { id: 'box', name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, description: 'Balanced breath for focus' },
  { id: '5-5', name: 'Coherent (5-5)', inhale: 5, hold: 0, exhale: 5, description: 'Heart coherence pattern' },
  { id: 'energizing', name: 'Energizing (3-0-6)', inhale: 3, hold: 0, exhale: 6, description: 'Quick energy boost' }
]

export default function WellnessTimerTemplate() {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0])
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [timeLeft, setTimeLeft] = useState(selectedPattern.inhale)
  const [totalCycles, setTotalCycles] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (phase === 'inhale' && selectedPattern.hold > 0) {
        setPhase('hold')
        setTimeLeft(selectedPattern.hold)
      } else if (phase === 'inhale' || phase === 'hold') {
        setPhase('exhale')
        setTimeLeft(selectedPattern.exhale)
      } else {
        // Cycle complete
        setCurrentCycle(currentCycle + 1)
        setPhase('inhale')
        setTimeLeft(selectedPattern.inhale)

        if (currentCycle >= totalCycles && totalCycles > 0) {
          setIsActive(false)
          setCurrentCycle(0)
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, phase, selectedPattern, currentCycle, totalCycles])

  const handleStart = (cycles: number = 0) => {
    setIsActive(true)
    setPhase('inhale')
    setTimeLeft(selectedPattern.inhale)
    setCurrentCycle(0)
    setTotalCycles(cycles)
  }

  const handleStop = () => {
    setIsActive(false)
    setPhase('inhale')
    setTimeLeft(selectedPattern.inhale)
    setCurrentCycle(0)
  }

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Breathe In'
    if (phase === 'hold') return 'Hold'
    return 'Breathe Out'
  }

  const getPhaseColor = () => {
    if (phase === 'inhale') return '#059669'
    if (phase === 'hold') return '#F59E0B'
    return '#3B82F6'
  }

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-md border-b border-green-200/50">
          <div className="max-w-4xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2L12 22M12 2C10 4 8 6 8 10M12 2C14 4 16 6 16 10M8 10C8 14 10 18 12 22M16 10C16 14 14 18 12 22" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-900">Mindful Breathing</h1>
                  <p className="text-sm text-green-700">Guided breathwork & meditation</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-white hover:bg-green-50 rounded-full font-medium transition-colors border border-green-200">
                Back
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Main Breathing Circle */}
          <div className="mb-12">
            <EmbrKitCard variant="elevated" className="bg-white/80 backdrop-blur-sm">
              <EmbrKitCardContent className="p-12">
                <div className="flex flex-col items-center">
                  {/* Animated Circle */}
                  <div
                    className={`mb-8 transition-all duration-1000 ease-in-out ${
                      isActive && phase === 'inhale' ? 'scale-125' : 'scale-100'
                    } ${
                      isActive && phase === 'exhale' ? 'scale-75' : ''
                    }`}
                    style={{
                      width: '240px',
                      height: '240px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${getPhaseColor()}20, ${getPhaseColor()}10)`,
                      border: `8px solid ${getPhaseColor()}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 60px ${getPhaseColor()}30`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-2" style={{ color: getPhaseColor() }}>
                        {timeLeft}
                      </div>
                      <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: getPhaseColor() }}>
                        {getPhaseText()}
                      </div>
                    </div>
                  </div>

                  {/* Pattern Name */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPattern.name}</h2>
                  <p className="text-gray-600 mb-6 text-center">{selectedPattern.description}</p>

                  {/* Cycle Counter */}
                  {totalCycles > 0 && (
                    <div className="mb-6 text-center">
                      <p className="text-sm text-gray-600">
                        Cycle {currentCycle} of {totalCycles}
                      </p>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex gap-4">
                    {!isActive ? (
                      <>
                        <EmbrKitButton
                          onClick={() => handleStart(0)}
                          className="px-8 py-3 text-lg font-semibold"
                        >
                          Start Free Practice
                        </EmbrKitButton>
                        <EmbrKitButton
                          onClick={() => handleStart(5)}
                          variant="secondary"
                          className="px-8 py-3 text-lg font-semibold"
                        >
                          5 Cycles
                        </EmbrKitButton>
                      </>
                    ) : (
                      <EmbrKitButton
                        onClick={handleStop}
                        variant="secondary"
                        className="px-8 py-3 text-lg font-semibold"
                      >
                        Stop
                      </EmbrKitButton>
                    )}
                  </div>
                </div>
              </EmbrKitCardContent>
            </EmbrKitCard>
          </div>

          {/* Pattern Selection */}
          <section className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Breathing Pattern</h3>
            <EmbrKitGrid cols={1} gap={4} className="md:grid-cols-2">
              {breathingPatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => {
                    if (!isActive) {
                      setSelectedPattern(pattern)
                      setTimeLeft(pattern.inhale)
                    }
                  }}
                  disabled={isActive}
                  className={`p-6 rounded-2xl transition-all text-left ${
                    selectedPattern.id === pattern.id
                      ? 'bg-green-600 text-white shadow-xl shadow-green-600/30'
                      : 'bg-white hover:bg-green-50 border-2 border-green-200'
                  } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <h4 className={`font-bold text-lg mb-2 ${selectedPattern.id === pattern.id ? 'text-white' : 'text-gray-900'}`}>
                    {pattern.name}
                  </h4>
                  <p className={`text-sm mb-3 ${selectedPattern.id === pattern.id ? 'text-green-100' : 'text-gray-600'}`}>
                    {pattern.description}
                  </p>
                  <div className={`text-sm font-mono ${selectedPattern.id === pattern.id ? 'text-green-100' : 'text-green-700'}`}>
                    {pattern.inhale}s in • {pattern.hold > 0 ? `${pattern.hold}s hold • ` : ''}{pattern.exhale}s out
                  </div>
                </button>
              ))}
            </EmbrKitGrid>
          </section>

          {/* Benefits */}
          <EmbrKitCard variant="elevated" className="bg-gradient-to-br from-green-600 to-emerald-600">
            <EmbrKitCardContent className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Benefits of Breathing Exercises</h3>
              <EmbrKitGrid cols={1} gap={4} className="md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Reduce Stress</h4>
                    <p className="text-sm text-green-100">Calm your mind and reduce anxiety</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Improve Focus</h4>
                    <p className="text-sm text-green-100">Enhance concentration and clarity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Better Sleep</h4>
                    <p className="text-sm text-green-100">Prepare your body for restful sleep</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Energy Boost</h4>
                    <p className="text-sm text-green-100">Increase oxygen flow and vitality</p>
                  </div>
                </div>
              </EmbrKitGrid>
            </EmbrKitCardContent>
          </EmbrKitCard>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
