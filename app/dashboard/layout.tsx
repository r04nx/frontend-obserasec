"use client"

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Sidebar } from '@/components/dashboard/sidebar'
import { ObseraLogo } from '@/components/icons'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <ObseraLogo className="w-16 h-16 text-primary animate-pulse" />
          <p className="font-mono text-xs text-muted-foreground uppercase-text">
            INITIALIZING PLATFORM...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <main className="min-h-screen">
          {/* Pass setSidebarOpen to children via context or props would be cleaner, 
              but for simplicity we'll handle menu in each page */}
          {children}
        </main>
      </div>
    </div>
  )
}
