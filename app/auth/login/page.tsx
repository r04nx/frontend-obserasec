"use client"

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { ObseraLogo } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center hex-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-card border border-border p-8">
          <div className="flex flex-col items-center mb-8">
            <ObseraLogo className="w-16 h-16 text-primary mb-4" />
            <h1 className="font-mono text-2xl font-bold text-primary uppercase-text tracking-wider">
              OBSERAONE
            </h1>
            <p className="text-muted-foreground font-sans text-sm uppercase-text mt-1">
              BY OBSERVASEC
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-xs uppercase-text text-muted-foreground">
                EMAIL ADDRESS
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@observasec.com"
                className="font-mono bg-secondary border-border focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-mono text-xs uppercase-text text-muted-foreground">
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="font-mono bg-secondary border-border focus:border-primary focus:ring-primary"
                required
              />
            </div>

            {error && (
              <div className="bg-primary/10 border border-primary/30 p-3">
                <p className="text-primary text-sm font-mono">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono uppercase-text bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? 'AUTHENTICATING...' : 'ACCESS PLATFORM'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm font-sans">
              {"Don't have an account?"}{' '}
              <Link href="/auth/register" className="text-primary hover:underline font-mono uppercase-text">
                REGISTER
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground text-xs font-mono text-center uppercase-text mb-3">
              DEMO CREDENTIALS
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span>admin@observasec.com</span>
                <span className="text-primary">admin123</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>analyst@icici.com</span>
                <span className="text-primary">analyst123</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>security@drdo.gov.in</span>
                <span className="text-primary">defence123</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs font-sans mt-6 uppercase-text">
          SECURE PLATFORM FOR INDIAN BFSI & DEFENCE SECTORS
        </p>
      </div>
    </div>
  )
}
