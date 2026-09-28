'use client'

import Image from 'next/image'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ClientApp } from '../components/ClientApp'
import { LoadingScreen } from '../components/LoadingScreen'
import { useClientConfig } from '../hooks/useClientConfig'

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen message="Opening your guide" />}>
      <HomePageContent />
    </Suspense>
  )
}

function HomePageContent() {
  const [requestedLoad, setRequestedLoad] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { config, loadConfig, isExpired, loading } = useClientConfig()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const requestedClientId = useMemo(() => {
    const queryClient = searchParams?.get('client') || searchParams?.get('clientId')
    if (queryClient) return queryClient
    const parts = pathname?.split('/').filter(Boolean) || []
    const clientIndex = parts.indexOf('c')
    return clientIndex >= 0 ? parts[clientIndex + 1] || null : null
  }, [pathname, searchParams])

  useEffect(() => {
    if (!requestedClientId || requestedLoad === requestedClientId) return
    if (config?.clientId === requestedClientId) {
      setRequestedLoad(requestedClientId)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)
    loadConfig(requestedClientId)
      .then(() => {
        if (!cancelled) setRequestedLoad(requestedClientId)
      })
      .catch(() => {
        if (!cancelled) {
          setRequestedLoad(requestedClientId)
          setError('We could not open this guide.')
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [config?.clientId, loadConfig, requestedClientId, requestedLoad])

  const hasRequestedConfig = Boolean(
    config && (config.clientId === requestedClientId || requestedLoad === requestedClientId)
  )

  if (requestedClientId && hasRequestedConfig && config && !isExpired && !error) {
    return <ClientApp config={config} />
  }

  if (requestedClientId && !hasRequestedConfig && (loading || isLoading || !error)) {
    return <LoadingScreen message="Opening your guide" />
  }

  const hasBrokenGuide = Boolean(requestedClientId)

  return (
    <div className="min-h-[100dvh] bg-[var(--embr-ink)] px-5 text-white">
      <header className="mx-auto flex h-[72px] w-full max-w-5xl items-center border-b border-[var(--embr-ink-border)]">
        <a href="https://build-embr.co.uk" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--embr-signal)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--embr-ink)]">
          <Image src="/embr_logo_transparent_dark.svg" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />
          <span className="text-lg font-semibold tracking-tight">Embr</span>
        </a>
      </header>

      <main className="mx-auto flex min-h-[calc(100dvh-144px)] w-full max-w-5xl items-center py-12">
        <div className="max-w-xl hub-reveal">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--embr-signal)]">
            {hasBrokenGuide ? 'Guide unavailable' : 'Live event guides'}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
            {hasBrokenGuide ? 'This guide link is not working.' : 'This address needs an event link.'}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[var(--embr-ink-muted)] sm:text-lg">
            {hasBrokenGuide
              ? 'The guide may have expired or the link may be incomplete. Ask your organiser for the latest event link.'
              : 'Embr guides open from the private link shared by your organiser. There is no code or app to install.'}
          </p>

          {(error || isExpired) ? (
            <div role="alert" className="mt-6 rounded-xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100">
              {error || 'This event guide has expired.'}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="https://build-embr.co.uk" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--embr-signal)] px-6 font-semibold text-[var(--embr-ink)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--embr-signal)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--embr-ink)]">
              Learn about Embr
            </a>
            {hasBrokenGuide ? <span className="text-sm text-[var(--embr-ink-muted)]">Your organiser can send a fresh link.</span> : null}
          </div>
        </div>
      </main>

      <footer className="mx-auto flex h-[72px] w-full max-w-5xl items-center border-t border-[var(--embr-ink-border)] text-xs text-[var(--embr-ink-muted)]">
        Event guides that stay current.
      </footer>
    </div>
  )
}
