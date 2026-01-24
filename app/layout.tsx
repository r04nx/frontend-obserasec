import React from "react"
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, IBM_Plex_Sans_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const ibmPlexCondensed = IBM_Plex_Sans_Condensed({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: 'Obseraone | Unified Threat Intelligence Platform',
  description: 'Enterprise-grade cybersecurity platform for Indian BFSI and Defence sectors. Comprehensive threat intelligence, digital asset monitoring, and compliance reporting by ObseraSEC.',
  keywords: ['cybersecurity', 'threat intelligence', 'BFSI security', 'defence sector', 'compliance', 'India', 'ObseraSEC'],
  authors: [{ name: 'ObseraSEC' }],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} ${ibmPlexCondensed.variable} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
