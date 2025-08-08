'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { QRCodeScanner } from '../components/QRCodeScanner'
import { AccessCodeEntry } from '../components/AccessCodeEntry'
import { LoadingScreen } from '../components/LoadingScreen'
import { ClientApp } from '../components/ClientApp'
import { useClientConfig } from '../hooks/useClientConfig'

export default function HomePage() {
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showAccessCode, setShowAccessCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { config, loadConfig, clearConfig, isExpired, loading } = useClientConfig();

  useEffect(() => {
    console.log('[HomePage] config:', config);
    console.log('[HomePage] isExpired:', isExpired);
  }, [config, isExpired]);

  const handleQRScan = async (data: string) => {
    setShowQRScanner(false)
    setIsLoading(true)
    setError(null)
    
    try {
      // Parse the QR code data - it should contain a clientId or full config URL
      let clientId = data
      
      // If it's a URL, extract the clientId from it
      if (data.startsWith('http')) {
        const url = new URL(data)
        clientId = url.searchParams.get('clientId') || url.pathname.split('/').pop() || data
      }
      
      await loadConfig(clientId)
    } catch (err) {
      setError('Invalid QR code. Please try again.')
      console.error('QR scan error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Access code flow: keep modal open until success or error
  const handleAccessCodeSubmit = async (code: string, setModalError: (msg: string) => void, setModalLoading: (loading: boolean) => void) => {
    setModalError('')
    setModalLoading(true)
    setError(null)
    try {
      await loadConfig(code)
      setShowAccessCode(false)
    } catch (err) {
      setModalError('Invalid access code. Please try again.')
      console.error('Access code error:', err)
    } finally {
      setModalLoading(false)
    }
  }

  const handleBackToHome = () => {
    clearConfig()
    setError(null)
  }

  if (loading) {
    return <LoadingScreen message="Loading your app..." />;
  }

  // If we have a config loaded, show the client app (no back button)
  if (config && !isExpired) {
    return <ClientApp config={config} />;
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen message="Loading your app..." />
  }

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 font-sans pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]" style={{ background: 'var(--embr-background)', color: 'var(--embr-text)' }}>
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {/* Embr Logo with larger, soft glow */}
        <div className="flex flex-col items-center mb-8 relative w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full opacity-25 blur-3xl z-0" style={{ backgroundColor: 'var(--embr-primary-color)' }} />
          <Image src="/embr_logo_transparent_dark.svg" alt="Embr Logo" width={200} height={200} className="h-52 w-52 z-10" />
        </div>
        {/* Welcome Text */}
        <h1 className="text-3xl font-bold mb-4 text-center font-sans" style={{ color: 'var(--embr-text)' }}>
          Welcome to <span style={{ color: 'var(--embr-secondary-color)' }}>Embr</span>
        </h1>
        <p className="text-center mb-8 text-lg font-medium font-sans" style={{ color: 'var(--embr-text-secondary)' }}>
          Micro Apps. One Purpose. No Bloat.
        </p>
        
        {/* Error Message and Expiry Notification */}
        {(error || (config && isExpired)) && (
          <div className="w-full max-w-sm mx-auto mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 text-center">
            {error}
            {config && isExpired && (
              <>
                {error && <br />}
                This app code has expired or is no longer available. Please check with your event organizer or try another code.
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-5 mb-10 max-w-sm mx-auto">
          <button
            onClick={() => setShowQRScanner(true)}
            className="w-full text-white font-semibold py-4 px-4 rounded-xl shadow transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-sans"
            style={{ backgroundColor: 'var(--embr-primary-color)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
            </svg>
            <span>Scan QR Code</span>
          </button>
          <button
            onClick={() => setShowAccessCode(true)}
            className="w-full bg-transparent text-white font-semibold py-4 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-sans"
            style={{ border: '1px solid var(--embr-border)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span>Enter Access Code</span>
          </button>
        </div>
      </div>
      <footer className="text-center text-sm mb-4 font-sans w-full" style={{ color: 'var(--embr-text-secondary)' }}>
        <hr className="w-1/2 mb-2 opacity-40 mx-auto" style={{ borderColor: 'var(--embr-border)' }} />
        <p>Powered by Embr Platform</p>
        <p className="mt-1">One app. One purpose. All power.</p>
      </footer>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRCodeScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}

      {/* Access Code Modal */}
      {showAccessCode && (
        <AccessCodeEntry
          onSubmit={handleAccessCodeSubmit}
          onClose={() => setShowAccessCode(false)}
        />
      )}
    </div>
  )
} 