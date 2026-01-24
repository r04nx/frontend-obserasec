"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { ObseraLogo, ShieldIcon, ScoutIcon, FoundryIcon, InsightIcon, ShadowIcon, ComplianceIcon, ChevronRightIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: ScoutIcon,
    title: 'SCOUT',
    description: 'AI-powered reconnaissance and target intelligence gathering with automated data crawling.'
  },
  {
    icon: FoundryIcon,
    title: 'FOUNDRY',
    description: 'Comprehensive PII detection, findings metrics, and advanced data visualizations.'
  },
  {
    icon: InsightIcon,
    title: 'OBSERAINSIGHT',
    description: 'Attack vector identification, path analysis, and intelligence graph visualization.'
  },
  {
    icon: ShadowIcon,
    title: 'OBERASHADOW',
    description: 'Dark web monitoring, threat detection, and real-time security alerts.'
  },
  {
    icon: ComplianceIcon,
    title: 'COMPLIANCE',
    description: 'RBI, SEBI, CERT-In compliance reporting for Indian regulatory requirements.'
  }
]

const stats = [
  { value: '500+', label: 'ORGANIZATIONS PROTECTED' },
  { value: '10M+', label: 'THREATS DETECTED' },
  { value: '99.9%', label: 'UPTIME SLA' },
  { value: '24/7', label: 'SOC MONITORING' }
]

export default function LandingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <ObseraLogo className="w-16 h-16 text-primary animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 hex-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-3">
            <ObseraLogo className="w-10 h-10 text-primary" />
            <div>
              <span className="font-mono text-lg font-bold text-foreground uppercase-text tracking-wider">OBSERAONE</span>
              <span className="hidden sm:inline text-muted-foreground text-xs font-sans ml-2 uppercase-text">BY OBSERVASEC</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-mono uppercase-text text-sm text-foreground hover:text-primary">
                LOGIN
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="font-mono uppercase-text text-sm bg-primary hover:bg-primary/90 text-primary-foreground">
                GET STARTED
              </Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-24 lg:px-12 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-8">
            <ShieldIcon className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs uppercase-text text-primary">ENTERPRISE THREAT INTELLIGENCE</span>
          </div>
          
          <h1 className="font-sans text-4xl lg:text-6xl font-bold text-foreground uppercase-text tracking-tight mb-6 text-balance">
            UNIFIED CYBERSECURITY<br />
            <span className="text-primary text-glow">FOR INDIA</span>
          </h1>
          
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-10 uppercase-text">
            COMPREHENSIVE THREAT INTELLIGENCE, DIGITAL ASSET MONITORING, AND COMPLIANCE REPORTING FOR BFSI & DEFENCE SECTORS
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="font-mono uppercase-text bg-primary hover:bg-primary/90 text-primary-foreground glow-red">
                START FREE TRIAL
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="font-mono uppercase-text border-border hover:border-primary hover:text-primary bg-transparent">
                VIEW DEMO
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-8 text-center border-r border-border last:border-r-0">
              <div className="font-mono text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-sans text-xs text-muted-foreground uppercase-text">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 lg:px-12 circuit-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl lg:text-4xl font-bold text-foreground uppercase-text mb-4">
              UNIFIED SECURITY MODULES
            </h2>
            <p className="font-sans text-muted-foreground uppercase-text max-w-xl mx-auto">
              FIVE INTEGRATED MODULES PROVIDING COMPLETE VISIBILITY INTO YOUR DIGITAL ATTACK SURFACE
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 hover:border-primary/50 transition-colors group"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:text-glow transition-all" />
                <h3 className="font-mono text-lg font-bold text-foreground uppercase-text mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground uppercase-text leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
            
            {/* CTA Card */}
            <div className="bg-primary/10 border border-primary/30 p-6 flex flex-col justify-center items-center text-center">
              <ObseraLogo className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-mono text-lg font-bold text-primary uppercase-text mb-2">
                ALL-IN-ONE PLATFORM
              </h3>
              <p className="font-sans text-sm text-muted-foreground uppercase-text mb-4">
                INTEGRATED SECURITY FOR THE INDIAN IT ECOSYSTEM
              </p>
              <Link href="/auth/register">
                <Button size="sm" className="font-mono uppercase-text text-xs bg-primary hover:bg-primary/90">
                  GET ACCESS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="px-6 py-24 lg:px-12 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-3xl lg:text-4xl font-bold text-foreground uppercase-text mb-6">
                BUILT FOR INDIAN<br />
                <span className="text-primary">REGULATORY COMPLIANCE</span>
              </h2>
              <p className="font-sans text-muted-foreground uppercase-text mb-8 leading-relaxed">
                AUTOMATED COMPLIANCE REPORTING FOR RBI, SEBI, IRDAI, AND CERT-IN FRAMEWORKS. GENERATE AUDIT-READY REPORTS WITH ONE CLICK.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {['RBI', 'SEBI', 'CERT-IN', 'IRDAI', 'ISO 27001', 'PCI-DSS'].map((framework) => (
                  <div key={framework} className="bg-secondary border border-border p-3 text-center">
                    <span className="font-mono text-xs text-foreground uppercase-text">{framework}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-secondary border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <ComplianceIcon className="w-8 h-8 text-primary" />
                <span className="font-mono text-lg font-bold text-foreground uppercase-text">COMPLIANCE SCORE</span>
              </div>
              
              <div className="relative h-4 bg-background mb-4">
                <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: '87%' }} />
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-4xl font-bold text-primary">87%</span>
                <span className="font-sans text-xs text-muted-foreground uppercase-text">OVERALL SCORE</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">RBI FRAMEWORK</span>
                  <span className="font-mono text-sm text-success">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">CERT-IN GUIDELINES</span>
                  <span className="font-mono text-sm text-success">88%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">PCI-DSS V4.0</span>
                  <span className="font-mono text-sm text-warning">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-12 hex-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ObseraLogo className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-sans text-3xl lg:text-4xl font-bold text-foreground uppercase-text mb-6">
            SECURE YOUR DIGITAL ASSETS TODAY
          </h2>
          <p className="font-sans text-muted-foreground uppercase-text mb-8">
            JOIN 500+ INDIAN ENTERPRISES PROTECTING THEIR INFRASTRUCTURE WITH OBSERAONE
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="font-mono uppercase-text bg-primary hover:bg-primary/90 text-primary-foreground glow-red">
                START 14-DAY FREE TRIAL
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="font-mono uppercase-text border-border hover:border-primary hover:text-primary bg-transparent">
                SCHEDULE DEMO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 lg:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ObseraLogo className="w-8 h-8 text-primary" />
            <span className="font-mono text-sm text-muted-foreground uppercase-text">
              2026 OBSERVASEC. ALL RIGHTS RESERVED.
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-muted-foreground uppercase-text">MADE IN INDIA</span>
            <span className="font-mono text-xs text-muted-foreground">|</span>
            <span className="font-mono text-xs text-muted-foreground uppercase-text">FOR INDIA</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
