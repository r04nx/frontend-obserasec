"use client"

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth, type User } from '@/lib/auth-context'
import { ObseraLogo } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    sector: '' as User['sector'] | ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!formData.sector) {
      setError('Please select a sector')
      return
    }

    setIsLoading(true)

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      organization: formData.organization,
      sector: formData.sector as User['sector']
    })
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Registration failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center circuit-pattern py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-card border border-border p-8">
          <div className="flex flex-col items-center mb-8">
            <ObseraLogo className="w-12 h-12 text-primary mb-3" />
            <h1 className="font-mono text-xl font-bold text-primary uppercase-text tracking-wider">
              CREATE ACCOUNT
            </h1>
            <p className="text-muted-foreground font-sans text-sm uppercase-text mt-1">
              JOIN OBSERAONE PLATFORM
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-mono text-xs uppercase-text text-muted-foreground">
                FULL NAME
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rahul Kumar"
                className="font-mono bg-secondary border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-xs uppercase-text text-muted-foreground">
                CORPORATE EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="font-mono bg-secondary border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization" className="font-mono text-xs uppercase-text text-muted-foreground">
                ORGANIZATION
              </Label>
              <Input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Company/Organization Name"
                className="font-mono bg-secondary border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase-text text-muted-foreground">
                SECTOR
              </Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({ ...formData, sector: value as User['sector'] })}
              >
                <SelectTrigger className="font-mono bg-secondary border-border">
                  <SelectValue placeholder="Select your sector" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="BFSI" className="font-mono">BFSI - Banking & Financial Services</SelectItem>
                  <SelectItem value="Defence" className="font-mono">Defence & Aerospace</SelectItem>
                  <SelectItem value="IT" className="font-mono">IT & Technology</SelectItem>
                  <SelectItem value="Government" className="font-mono">Government & PSU</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs uppercase-text text-muted-foreground">
                  PASSWORD
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 6 chars"
                  className="font-mono bg-secondary border-border focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-mono text-xs uppercase-text text-muted-foreground">
                  CONFIRM
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter"
                  className="font-mono bg-secondary border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-primary/10 border border-primary/30 p-3">
                <p className="text-primary text-sm font-mono">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono uppercase-text bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm font-sans">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-mono uppercase-text">
                LOGIN
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs font-sans mt-6 uppercase-text">
          ENTERPRISE THREAT INTELLIGENCE BY OBSERVASEC
        </p>
      </div>
    </div>
  )
}
