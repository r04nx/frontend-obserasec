"use client"

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  ComplianceIcon, 
  ShieldIcon, 
  DownloadIcon, 
  AlertIcon,
  RefreshIcon,
  ChevronRightIcon,
  TrendUpIcon
} from '@/components/icons'
import { mockComplianceReports } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer,
  PolarAngleAxis
} from 'recharts'

const frameworkScores = [
  { name: 'RBI CYBER SECURITY', score: 92, total: 156, passed: 143, failed: 13 },
  { name: 'SEBI CSCRF', score: 88, total: 89, passed: 78, failed: 11 },
  { name: 'CERT-IN GUIDELINES', score: 85, total: 45, passed: 38, failed: 7 },
  { name: 'PCI-DSS V4.0', score: 78, total: 312, passed: 243, failed: 69 },
  { name: 'ISO 27001:2022', score: 81, total: 114, passed: 92, failed: 22 },
  { name: 'IRDAI IT GUIDELINES', score: 90, total: 67, passed: 60, failed: 7 },
]

const recentAudits = [
  { id: '1', name: 'Quarterly RBI Assessment', date: '2026-01-15', status: 'completed', score: 92 },
  { id: '2', name: 'SEBI Cyber Resilience Audit', date: '2026-01-10', status: 'completed', score: 88 },
  { id: '3', name: 'PCI-DSS Annual Assessment', date: '2026-01-05', status: 'in_progress', score: 0 },
  { id: '4', name: 'ISO 27001 Surveillance Audit', date: '2025-12-20', status: 'completed', score: 81 },
]

export default function CompliancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [generatingReport, setGeneratingReport] = useState<string | null>(null)

  const overallScore = Math.round(frameworkScores.reduce((acc, f) => acc + f.score, 0) / frameworkScores.length)

  const handleDownload = (reportId: string) => {
    setGeneratingReport(reportId)
    setTimeout(() => {
      setGeneratingReport(null)
      // Simulate download
      alert('Report downloaded successfully!')
    }, 2000)
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header 
          title="COMPLIANCE" 
          subtitle="REGULATORY REPORTING & AUDIT MANAGEMENT"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-6 space-y-6 circuit-pattern">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="OVERALL COMPLIANCE" value={`${overallScore}%`} icon={ShieldIcon} variant="primary" />
            <StatCard title="ACTIVE FRAMEWORKS" value={6} icon={ComplianceIcon} />
            <StatCard title="CONTROLS PASSED" value={654} icon={TrendUpIcon} variant="primary" />
            <StatCard title="GAPS IDENTIFIED" value={129} icon={AlertIcon} variant="warning" />
          </div>

          {/* Overall Score */}
          <div className="bg-card border border-border p-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Radial Chart */}
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={[{ name: 'score', value: overallScore, fill: '#dc2626' }]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background={{ fill: '#1a1a1a' }}
                      dataKey="value"
                      cornerRadius={0}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="relative -mt-32 text-center">
                  <span className="font-mono text-4xl font-bold text-primary">{overallScore}%</span>
                  <p className="font-mono text-xs text-muted-foreground uppercase-text mt-1">COMPLIANT</p>
                </div>
              </div>
              
              {/* Framework Summary */}
              <div className="flex-1 w-full">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text mb-4">
                  FRAMEWORK COMPLIANCE SUMMARY
                </h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {frameworkScores.map((framework) => (
                    <div 
                      key={framework.name}
                      className="bg-secondary p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedFramework(framework.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xl font-bold text-primary">{framework.score}%</span>
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          framework.score >= 90 && "bg-success",
                          framework.score >= 80 && framework.score < 90 && "bg-warning",
                          framework.score < 80 && "bg-danger"
                        )} />
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase-text truncate">
                        {framework.name}
                      </p>
                      <p className="font-sans text-[10px] text-muted-foreground/60 mt-1">
                        {framework.passed}/{framework.total} controls
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Reports */}
            <div className="bg-card border border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <DownloadIcon className="w-4 h-4 text-primary" />
                  COMPLIANCE REPORTS
                </h3>
              </div>
              
              <div className="divide-y divide-border">
                {mockComplianceReports.map((report) => (
                  <div key={report.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs text-foreground truncate">
                          {report.name}
                        </p>
                        <p className="font-sans text-[10px] text-muted-foreground mt-1">
                          {report.framework} | {report.period}
                        </p>
                      </div>
                      <span className={cn(
                        "font-mono text-[10px] px-2 py-0.5 shrink-0",
                        report.status === 'ready' && "bg-success/20 text-success",
                        report.status === 'generating' && "bg-warning/20 text-warning",
                        report.status === 'scheduled' && "bg-info/20 text-info"
                      )}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {report.score > 0 && (
                        <span className="font-mono text-xs text-primary">
                          SCORE: {report.score}%
                        </span>
                      )}
                      {report.status === 'ready' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(report.id)}
                          disabled={generatingReport === report.id}
                          className="font-mono text-[10px] uppercase-text text-muted-foreground hover:text-primary h-7"
                        >
                          {generatingReport === report.id ? (
                            <>
                              <RefreshIcon className="w-3 h-3 mr-1 animate-spin" />
                              GENERATING...
                            </>
                          ) : (
                            <>
                              <DownloadIcon className="w-3 h-3 mr-1" />
                              DOWNLOAD
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-border">
                <Button className="w-full font-mono uppercase-text text-xs bg-primary hover:bg-primary/90">
                  GENERATE NEW REPORT
                  <ChevronRightIcon className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>

            {/* Recent Audits */}
            <div className="bg-card border border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <ComplianceIcon className="w-4 h-4 text-primary" />
                  RECENT AUDITS
                </h3>
              </div>
              
              <div className="divide-y divide-border">
                {recentAudits.map((audit) => (
                  <div key={audit.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="font-mono text-xs text-foreground">{audit.name}</p>
                      <span className={cn(
                        "font-mono text-[10px] px-2 py-0.5",
                        audit.status === 'completed' && "bg-success/20 text-success",
                        audit.status === 'in_progress' && "bg-warning/20 text-warning"
                      )}>
                        {audit.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] text-muted-foreground">
                        {new Date(audit.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                      {audit.score > 0 && (
                        <span className={cn(
                          "font-mono text-xs",
                          audit.score >= 90 && "text-success",
                          audit.score >= 80 && audit.score < 90 && "text-warning",
                          audit.score < 80 && "text-danger"
                        )}>
                          {audit.score}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full font-mono uppercase-text text-xs bg-transparent">
                  SCHEDULE NEW AUDIT
                </Button>
              </div>
            </div>
          </div>

          {/* Framework Details */}
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-primary" />
                FRAMEWORK CONTROL STATUS
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">FRAMEWORK</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">SCORE</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">PROGRESS</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">PASSED</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">FAILED</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {frameworkScores.map((framework) => (
                    <tr key={framework.name} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3 font-mono text-xs text-foreground">
                        {framework.name}
                      </td>
                      <td className="p-3">
                        <span className={cn(
                          "font-mono text-sm font-bold",
                          framework.score >= 90 && "text-success",
                          framework.score >= 80 && framework.score < 90 && "text-warning",
                          framework.score < 80 && "text-danger"
                        )}>
                          {framework.score}%
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="w-24 h-2 bg-secondary">
                          <div 
                            className={cn(
                              "h-full",
                              framework.score >= 90 && "bg-success",
                              framework.score >= 80 && framework.score < 90 && "bg-warning",
                              framework.score < 80 && "bg-danger"
                            )}
                            style={{ width: `${framework.score}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-3 font-mono text-xs text-success">
                        {framework.passed}
                      </td>
                      <td className="p-3 font-mono text-xs text-danger">
                        {framework.failed}
                      </td>
                      <td className="p-3">
                        <span className={cn(
                          "font-mono text-[10px] px-2 py-0.5",
                          framework.score >= 80 && "bg-success/20 text-success",
                          framework.score < 80 && "bg-warning/20 text-warning"
                        )}>
                          {framework.score >= 80 ? 'COMPLIANT' : 'NEEDS ATTENTION'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regulatory Updates */}
          <div className="bg-primary/5 border border-primary/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertIcon className="w-5 h-5 text-primary" />
              <h4 className="font-mono text-sm font-bold text-primary uppercase-text">
                REGULATORY UPDATES - INDIA
              </h4>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="bg-card p-4 border border-border">
                <span className="font-mono text-[10px] text-danger">NEW</span>
                <h5 className="font-mono text-xs text-foreground mt-2 mb-1">RBI Master Direction 2026</h5>
                <p className="font-sans text-[10px] text-muted-foreground">
                  Updated cyber security framework for banks effective April 2026
                </p>
              </div>
              
              <div className="bg-card p-4 border border-border">
                <span className="font-mono text-[10px] text-warning">UPCOMING</span>
                <h5 className="font-mono text-xs text-foreground mt-2 mb-1">SEBI CSCRF Update</h5>
                <p className="font-sans text-[10px] text-muted-foreground">
                  New incident reporting requirements for market participants
                </p>
              </div>
              
              <div className="bg-card p-4 border border-border">
                <span className="font-mono text-[10px] text-info">ADVISORY</span>
                <h5 className="font-mono text-xs text-foreground mt-2 mb-1">CERT-In Directive</h5>
                <p className="font-sans text-[10px] text-muted-foreground">
                  6-hour incident reporting mandate for critical infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
