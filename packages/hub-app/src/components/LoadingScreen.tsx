import Image from 'next/image'

export function LoadingScreen({ message = 'Opening your guide' }: { message?: string }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--embr-ink)] px-6 text-white" role="status" aria-live="polite">
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <Image src="/embr_logo_transparent_dark.svg" alt="" width={64} height={64} className="h-16 w-16 object-contain" priority />
        <p className="mt-6 text-base font-semibold">{message}</p>
        <div className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <span className="embr-loading-bar block h-full w-1/2 rounded-full bg-[var(--embr-signal)]" />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  )
}
