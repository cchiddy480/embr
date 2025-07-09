'use client'

import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#101926] flex flex-col justify-between items-center px-4 font-sans pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {/* Embr Logo with larger, soft glow */}
        <div className="flex flex-col items-center mb-8 relative w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-[#0F766E] opacity-25 blur-3xl z-0" />
          <Image src="/embr_logo_transparent_dark.svg" alt="Embr Logo" width={200} height={200} className="h-52 w-52 z-10" />
        </div>
        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-white mb-4 text-center font-sans">
          Welcome to <span className="text-[#38F9E4]">Embr</span>
        </h1>
        <p className="text-gray-200 text-center mb-8 text-lg font-medium font-sans">
          Micro Apps. One Purpose. No Bloat.
        </p>
        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-5 mb-10 max-w-sm mx-auto">
          <button
            className="w-full bg-[#0F766E] hover:bg-[#13a89a] text-white font-semibold py-4 px-4 rounded-xl shadow transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-sans"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
            </svg>
            <span>Scan QR Code</span>
          </button>
          <button
            className="w-full bg-transparent hover:bg-[#22304a] text-white font-semibold py-4 px-4 rounded-xl border border-[#2d3c5a] transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-sans"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span>Enter Access Code</span>
          </button>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-400 mb-4 font-sans w-full">
        <hr className="w-1/2 border-gray-700 mb-2 opacity-40 mx-auto" />
        <p>Powered by Embr Platform</p>
        <p className="mt-1">One app. One purpose. All power.</p>
      </footer>
    </div>
  )
} 