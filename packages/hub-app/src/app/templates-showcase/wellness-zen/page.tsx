'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { EmbrKitProvider, EmbrKitContainer, EmbrKitButton } from '@embr/ui'

const theme = {
  primaryColor: '#6366F1',
  secondaryColor: '#A78BFA',
  backgroundColor: '#faf5ff',
  surfaceColor: '#f3e8ff',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'golden-ratio' as const,
  materialStyle: 'soft' as const
}

export default function WellnessZen() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale')
  const [count, setCount] = useState(4)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          setPhase(p => p === 'inhale' ? 'exhale' : 'inhale')
          return 4
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <header className="bg-white/60 backdrop-blur border-b border-violet-200">
          <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-violet-900">Zen Space</h1>
            <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-white border border-violet-200 hover:bg-violet-50 rounded-full">
              Back
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div
              className={`w-64 h-64 mx-auto rounded-full flex items-center justify-center transition-all duration-1000 ${
                isActive && phase === 'inhale' ? 'scale-110' : 'scale-100'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.2), rgba(167,139,250,0.1))',
                border: '12px solid rgba(99,102,241,0.3)',
                boxShadow: '0 0 80px rgba(99,102,241,0.3)'
              }}
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-violet-600 mb-3">{count}</div>
                <div className="text-sm uppercase tracking-wider text-violet-600 font-semibold">
                  {phase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Find Your Peace</h2>
            <p className="text-gray-600">4-4 Breathing • Balanced & Centering</p>

            {!isActive ? (
              <EmbrKitButton onClick={() => setIsActive(true)} className="px-8 py-4">
                Begin Practice
              </EmbrKitButton>
            ) : (
              <EmbrKitButton onClick={() => setIsActive(false)} variant="secondary" className="px-8 py-4">
                Pause
              </EmbrKitButton>
            )}
          </div>

          <div className="mt-20 grid grid-cols-2 gap-6 text-center">
            <div className="bg-white/60 backdrop-blur rounded-2xl p-6">
              <div className="text-3xl mb-2">🧘</div>
              <h4 className="font-semibold text-gray-900 mb-1">Meditation</h4>
              <p className="text-sm text-gray-600">Daily mindfulness practice</p>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-2xl p-6">
              <div className="text-3xl mb-2">💆</div>
              <h4 className="font-semibold text-gray-900 mb-1">Relaxation</h4>
              <p className="text-sm text-gray-600">Stress relief techniques</p>
            </div>
          </div>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
