"use client"

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  ShieldIcon, 
  AlertIcon, 
  ServerIcon, 
  TargetIcon, 
  TrendUpIcon, 
  EyeIcon,
  ShadowIcon,
  ChevronRightIcon
} from '@/components/icons'
import { 
  mockAssets, 
  mockFindings, 
  mockThreatAlerts, 
  dashboardStats 
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const criticalAssets = mockAssets.filter(a => a.status === 'critical')
  const criticalFindings = mockFindings.filter(f => f.severity === 'critical')
  const newAlerts = mockThreatAlerts.filter(a => a.status === 'new' || a.status === 'investigating')

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header 
          title="SECURITY DASHBOARD" 
          subtitle="UNIFIED THREAT OVERVIEW"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-6 space-y-6 grid-pattern">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="TOTAL ASSETS"
              value={dashboardStats.totalAssets}
              icon={ServerIcon}
              trend={{ value: 12, direction: 'up' }}
            />
            <StatCard
              title="CRITICAL FINDINGS"
              value={dashboardStats.criticalFindings}
              icon={AlertIcon}
              variant="danger"
              trend={{ value: 8, direction: 'up' }}
            />
            <StatCard
              title="ACTIVE THREATS"
              value={dashboardStats.activeThreats}
              icon={TargetIcon}
              variant="danger"
            />
            <StatCard
              title="COMPLIANCE SCORE"
              value={`${dashboardStats.complianceScore}%`}
              icon={ShieldIcon}
              variant="primary"
              trend={{ value: 3, direction: 'down' }}
            />
          </div>

          {/* Risk Score Banner */}
          <div className="bg-card border border-border p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-secondary"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${dashboardStats.riskScore * 2.51} 251`}
                      strokeLinecap="square"
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-2xl font-bold text-primary">{dashboardStats.riskScore}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold text-foreground uppercase-text">
                    OVERALL RISK SCORE
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground uppercase-text">
                    MODERATE RISK - IMMEDIATE ACTION REQUIRED
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 lg:gap-8">
                <div className="text-center">
                  <p className="font-mono text-2xl font-bold text-danger">{dashboardStats.piiExposures.toLocaleString()}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase-text">PII EXPOSED</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-2xl font-bold text-warning">{dashboardStats.darkWebAlerts}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase-text">DARK WEB ALERTS</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-2xl font-bold text-success">{dashboardStats.complianceScore}%</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase-text">COMPLIANCE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Critical Assets */}
            <div className="bg-card border border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <ServerIcon className="w-4 h-4 text-primary" />
                  CRITICAL ASSETS
                </h3>
                <Link href="/dashboard/foundry">
                  <Button variant="ghost" size="sm" className="font-mono text-xs uppercase-text text-muted-foreground hover:text-primary">
                    VIEW ALL
                    <ChevronRightIcon className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="divide-y divide-border">
                {criticalAssets.slice(0, 4).map((asset) => (
                  <div key={asset.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-foreground">{asset.name}</span>
                      <span className={cn(
                        "font-mono text-xs px-2 py-0.5",
                        asset.status === 'critical' && "bg-danger/20 text-danger",
                        asset.status === 'warning' && "bg-warning/20 text-warning",
                        asset.status === 'secure' && "bg-success/20 text-success"
                      )}>
                        {asset.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans text-muted-foreground uppercase-text">{asset.type}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-muted-foreground">
                          RISK: <span className="text-danger">{asset.riskScore}</span>
                        </span>
                        <span className="font-mono text-muted-foreground">
                          FINDINGS: <span className="text-warning">{asset.findings}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Threats */}
            <div className="bg-card border border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <ShadowIcon className="w-4 h-4 text-primary" />
                  ACTIVE THREATS
                </h3>
                <Link href="/dashboard/shadow">
                  <Button variant="ghost" size="sm" className="font-mono text-xs uppercase-text text-muted-foreground hover:text-primary">
                    VIEW ALL
                    <ChevronRightIcon className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="divide-y divide-border">
                {newAlerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span className="font-mono text-sm text-foreground line-clamp-1">{alert.title}</span>
                      <span className={cn(
                        "font-mono text-[10px] px-2 py-0.5 shrink-0",
                        alert.severity === 'critical' && "bg-danger/20 text-danger",
                        alert.severity === 'high' && "bg-warning/20 text-warning",
                        alert.severity === 'medium' && "bg-info/20 text-info"
                      )}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans text-muted-foreground uppercase-text">{alert.source.replace('_', ' ')}</span>
                      <span className={cn(
                        "font-mono text-xs",
                        alert.status === 'new' && "text-danger",
                        alert.status === 'investigating' && "text-warning"
                      )}>
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Findings */}
            <div className="bg-card border border-border lg:col-span-2">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <AlertIcon className="w-4 h-4 text-primary" />
                  RECENT CRITICAL FINDINGS
                </h3>
                <Link href="/dashboard/insight">
                  <Button variant="ghost" size="sm" className="font-mono text-xs uppercase-text text-muted-foreground hover:text-primary">
                    VIEW ALL
                    <ChevronRightIcon className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">FINDING</th>
                      <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">SEVERITY</th>
                      <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">ASSET</th>
                      <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">STATUS</th>
                      <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">CVE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {criticalFindings.slice(0, 4).map((finding) => (
                      <tr key={finding.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="p-3 font-mono text-xs text-foreground max-w-xs truncate">
                          {finding.title}
                        </td>
                        <td className="p-3">
                          <span className={cn(
                            "font-mono text-[10px] px-2 py-0.5",
                            finding.severity === 'critical' && "bg-danger/20 text-danger",
                            finding.severity === 'high' && "bg-warning/20 text-warning"
                          )}>
                            {finding.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">
                          {finding.asset}
                        </td>
                        <td className="p-3">
                          <span className={cn(
                            "font-mono text-[10px]",
                            finding.status === 'open' && "text-danger",
                            finding.status === 'in_progress' && "text-warning",
                            finding.status === 'resolved' && "text-success"
                          )}>
                            {finding.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-xs text-primary">
                          {finding.cve || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/dashboard/scout" className="bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
              <EyeIcon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-mono text-xs font-bold text-foreground uppercase-text group-hover:text-primary">
                RUN SCOUT
              </h4>
              <p className="font-sans text-[10px] text-muted-foreground uppercase-text">
                TARGET RECON
              </p>
            </Link>
            
            <Link href="/dashboard/foundry" className="bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
              <TrendUpIcon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-mono text-xs font-bold text-foreground uppercase-text group-hover:text-primary">
                VIEW METRICS
              </h4>
              <p className="font-sans text-[10px] text-muted-foreground uppercase-text">
                PII ANALYTICS
              </p>
            </Link>
            
            <Link href="/dashboard/insight" className="bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
              <TargetIcon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-mono text-xs font-bold text-foreground uppercase-text group-hover:text-primary">
                ATTACK PATHS
              </h4>
              <p className="font-sans text-[10px] text-muted-foreground uppercase-text">
                INTELLIGENCE
              </p>
            </Link>
            
            <Link href="/dashboard/shadow" className="bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
              <ShadowIcon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-mono text-xs font-bold text-foreground uppercase-text group-hover:text-primary">
                DARK WEB
              </h4>
              <p className="font-sans text-[10px] text-muted-foreground uppercase-text">
                MONITORING
              </p>
            </Link>
            
            <Link href="/dashboard/compliance" className="bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
              <ShieldIcon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-mono text-xs font-bold text-foreground uppercase-text group-hover:text-primary">
                REPORTS
              </h4>
              <p className="font-sans text-[10px] text-muted-foreground uppercase-text">
                COMPLIANCE
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
