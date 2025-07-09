'use client'

import { useState, useEffect } from 'react'
import { QRCodeScanner } from '@/components/QRCodeScanner'
import { AccessCodeEntry } from '@/components/AccessCodeEntry'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useClientConfig } from '@/hooks/useClientConfig'
import { ClientApp } from '@/components/ClientApp'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showScanner, setShowScanner] = useState(false)
  const [showCodeEntry, setShowCodeEntry] = useState(false)
  const { config, loadConfig, clearConfig, isExpired } = useClientConfig()

  useEffect(() => {
    // Check for cached config on app start
    const checkCachedConfig = async () => {
      try {
        await loadConfig()
      } catch (error) {
        console.log('No cached config found')
      } finally {
        setIsLoading(false)
      }
    }

    checkCachedConfig()
  }, [loadConfig])

  const handleQRScan = async (clientId: string) => {
    setIsLoading(true)
    try {
      await loadConfig(clientId)
      setShowScanner(false)
    } catch (error) {
      console.error('Failed to load config from QR code:', error)
      alert('Invalid QR code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeEntry = async (clientId: string) => {
    setIsLoading(true)
    try {
      await loadConfig(clientId)
      setShowCodeEntry(false)
    } catch (error) {
      console.error('Failed to load config from access code:', error)
      alert('Invalid access code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async () => {
    setIsLoading(true)
    try {
      await clearConfig()
    } catch (error) {
      console.error('Failed to clear config:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />
  }

  // Show client app if config is loaded and not expired
  if (config && !isExpired) {
    return <ClientApp config={config} onReset={handleReset} />
  }

  // Show welcome screen with options
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Embr</h1>
          <p className="text-gray-600">
            Scan a QR code or enter an access code to load your app
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => setShowScanner(true)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
            </svg>
            <span>Scan QR Code</span>
          </button>

          <button
            onClick={() => setShowCodeEntry(true)}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span>Enter Access Code</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Powered by Embr Platform</p>
          <p className="mt-1">One app. One purpose. All power.</p>
        </div>
      </div>

      {/* QR Code Scanner Modal */}
      {showScanner && (
        <QRCodeScanner
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Access Code Entry Modal */}
      {showCodeEntry && (
        <AccessCodeEntry
          onSubmit={handleCodeEntry}
          onClose={() => setShowCodeEntry(false)}
        />
      )}
    </div>
  )
} 