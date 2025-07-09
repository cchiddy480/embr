import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientConfigProvider } from '@/components/providers/ClientConfigProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Embr Hub',
  description: 'Dynamic micro-app platform for events and businesses',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientConfigProvider>
          {children}
        </ClientConfigProvider>
      </body>
    </html>
  )
} 