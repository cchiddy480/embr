'use client'

import Image from 'next/image'
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { LoadingScreen } from '../components/LoadingScreen'
import { ClientApp } from '../components/ClientApp'
import { useClientConfig } from '../hooks/useClientConfig'

// useSearchParams() requires a Suspense boundary for Next.js static
// generation, otherwise `next build` fails to prerender "/" — see
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading..." />}>
      <HomePageContent />
    </Suspense>
  )
}

function HomePageContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { config, loadConfig, isExpired, loading } = useClientConfig();
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    console.log('[HomePage] config:', config);
    console.log('[HomePage] isExpired:', isExpired);
  }, [config, isExpired]);

  // Auto-load when URL specifies a client, overriding cached config if different
  useEffect(() => {
    try {
      let clientIdFromUrl: string | null = null
      const qpClient = searchParams?.get('client') || searchParams?.get('clientId')
      if (qpClient) clientIdFromUrl = qpClient
      if (!clientIdFromUrl && pathname) {
        const parts = pathname.split('/').filter(Boolean)
        const cIdx = parts.indexOf('c')
        if (cIdx !== -1 && parts[cIdx + 1]) clientIdFromUrl = parts[cIdx + 1]
      }
      if (clientIdFromUrl && clientIdFromUrl !== config?.clientId) {
        setIsLoading(true)
        setError(null)
        ;(async () => {
          try {
            await loadConfig(clientIdFromUrl as string)
          } catch (e) {
            console.error('[HomePage] Auto-load failed', e)
            setError('Could not load app from link.')
          } finally {
            setIsLoading(false)
          }
        })()
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams, config?.clientId])

  if (loading) {
    // Show hub loading screen but allow escape if something wedges
    return <LoadingScreen message="Loading your app..." />;
  }

  // If we have a config loaded, show the client app (no back button)
  if (config && !isExpired) {
    return <ClientApp config={config} />;
  }

  // Show loading screen while a direct-link config is being fetched
  if (isLoading) {
    return <LoadingScreen message="Loading your guide..." />
  }

  // Fallback for the bare app.build-embr.co.uk root: guests always arrive via
  // a direct per-trip link (?client=<id> or /c/<id>, handled above), so this
  // only renders when someone lands here without one — a mistyped/expired
  // link, or the raw domain itself. No QR scanner or access-code entry here;
  // that generic multi-tenant flow doesn't match how guides are actually
  // distributed, so it isn't worth presenting as a real capability. See
  // src/components/README.md for what used to live here and why it's gone.
  return (
    <div className="min-h-screen bg-[#101926] flex flex-col justify-between items-center px-4 font-sans pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <div className="hub-reveal flex flex-col items-center mb-8 relative w-full">
          <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#0F766E] opacity-[0.16] blur-[80px] z-0" />
          <Image src="/embr_logo_transparent_dark.svg" alt="Embr" width={160} height={160} className="h-40 w-40 z-10" />
        </div>

        <h1 className="hub-reveal hub-reveal-delay-1 text-2xl font-bold text-white mb-3 text-center font-sans">
          This link isn&rsquo;t pointing at a guide
        </h1>
        <p className="hub-reveal hub-reveal-delay-1 text-[#D1D5DB] text-center mb-8 max-w-sm font-sans">
          Embr guides open from the link your organiser sent you. If you followed one here, it may be mistyped or expired.
        </p>

        {(error || (config && isExpired)) && (
          <div className="hub-reveal w-full max-w-sm mx-auto mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 text-center text-sm">
            {error}
            {config && isExpired && (
              <>
                {error && <br />}
                This event guide has expired or is no longer available. Please check with your organiser.
              </>
            )}
          </div>
        )}

        <a
          href="https://build-embr.co.uk"
          className="hub-reveal hub-reveal-delay-2 w-full max-w-sm px-8 py-4 rounded-xl text-base font-semibold text-white text-center bg-gradient-to-b from-[#13a89a] to-[#0F766E] border border-white/10 shadow-[0_4px_16px_-2px_rgba(15,118,110,0.4)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38F9E4]"
        >
          What is Embr?
        </a>
      </div>
      <footer className="text-center text-sm text-gray-400 mb-4 font-sans w-full">
        <hr className="w-1/2 border-gray-700 mb-2 opacity-40 mx-auto" />
        <p>One App. One Purpose. Fast. Branded. Brilliant.</p>
      </footer>
    </div>
  )
}