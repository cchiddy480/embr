import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProviders from './ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Embr Hub',
  description: 'Dynamic micro-app platform for events and businesses',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#0F766E', // Embr teal
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={`${inter.className} min-h-screen w-full flex flex-col`} style={{ background: 'var(--embr-background)', color: 'var(--embr-text)' }}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
} 