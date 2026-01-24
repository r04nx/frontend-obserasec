"use client"

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  ScoutIcon, 
  SearchIcon, 
  ServerIcon, 
  TargetIcon, 
  RefreshIcon,
  ChevronRightIcon,
  EyeIcon,
  NetworkIcon,
  AlertIcon
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ScanResult {
  id: string
  type: 'subdomain' | 'ip' | 'port' | 'technology' | 'email' | 'document'
  value: string
  source: string
  risk: 'high' | 'medium' | 'low'
  timestamp: string
}

const mockScanHistory = [
  { id: '1', target: 'icicibank.com', status: 'completed', findings: 247, date: '2026-01-24' },
  { id: '2', target: '192.168.1.0/24', status: 'completed', findings: 89, date: '2026-01-23' },
  { id: '3', target: 'hdfc.com', status: 'running', findings: 156, date: '2026-01-24' },
  { id: '4', target: 'sbi.co.in', status: 'completed', findings: 312, date: '2026-01-22' },
]

const mockResults: ScanResult[] = [
  { id: '1', type: 'subdomain', value: 'api.icicibank.com', source: 'DNS Enumeration', risk: 'medium', timestamp: '2026-01-24T10:30:00Z' },
  { id: '2', type: 'subdomain', value: 'admin.icicibank.com', source: 'Certificate Transparency', risk: 'high', timestamp: '2026-01-24T10:29:00Z' },
  { id: '3', type: 'ip', value: '103.241.32.45', source: 'DNS Resolution', risk: 'low', timestamp: '2026-01-24T10:28:00Z' },
  { id: '4', type: 'port', value: '443 (HTTPS)', source: 'Port Scan', risk: 'low', timestamp: '2026-01-24T10:27:00Z' },
  { id: '5', type: 'port', value: '22 (SSH)', source: 'Port Scan', risk: 'high', timestamp: '2026-01-24T10:26:00Z' },
  { id: '6', type: 'technology', value: 'Apache/2.4.41', source: 'Banner Grabbing', risk: 'medium', timestamp: '2026-01-24T10:25:00Z' },
  { id: '7', type: 'email', value: 'admin@icicibank.com', source: 'OSINT', risk: 'medium', timestamp: '2026-01-24T10:24:00Z' },
  { id: '8', type: 'document', value: 'annual_report_2025.pdf', source: 'Google Dork', risk: 'low', timestamp: '2026-01-24T10:23:00Z' },
  { id: '9', type: 'subdomain', value: 'staging.icicibank.com', source: 'Brute Force', risk: 'high', timestamp: '2026-01-24T10:22:00Z' },
  { id: '10', type: 'technology', value: 'React 18.2.0', source: 'Wappalyzer', risk: 'low', timestamp: '2026-01-24T10:21:00Z' },
]

export default function ScoutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [target, setTarget] = useState('')
  const [scanType, setScanType] = useState<string>('')
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const handleStartScan = () => {
    if (!target) return
    setIsScanning(true)
    setShowResults(false)
    
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false)
      setShowResults(true)
    }, 3000)
  }

  const filteredResults = selectedFilter === 'all' 
    ? mockResults 
    : mockResults.filter(r => r.type === selectedFilter)

  const typeIcons: Record<string, typeof ServerIcon> = {
    subdomain: NetworkIcon,
    ip: ServerIcon,
    port: TargetIcon,
    technology: ScoutIcon,
    email: EyeIcon,
    document: AlertIcon
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header 
          title="SCOUT" 
          subtitle="AI-POWERED RECONNAISSANCE & INTELLIGENCE"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-6 space-y-6 hex-pattern">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="TOTAL SCANS" value={156} icon={ScoutIcon} />
            <StatCard title="ASSETS DISCOVERED" value={2847} icon={ServerIcon} variant="primary" />
            <StatCard title="HIGH RISK FINDINGS" value={89} icon={AlertIcon} variant="danger" />
            <StatCard title="ACTIVE SCANS" value={3} icon={RefreshIcon} variant="warning" />
          </div>

          {/* New Scan Panel */}
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                <ScoutIcon className="w-4 h-4 text-primary" />
                NEW RECONNAISSANCE SCAN
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2 space-y-2">
                  <Label className="font-mono text-xs uppercase-text text-muted-foreground">
                    TARGET (DOMAIN / IP / CIDR)
                  </Label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="e.g., example.com or 192.168.1.0/24"
                      className="pl-10 font-mono text-sm bg-secondary border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-mono text-xs uppercase-text text-muted-foreground">
                    SCAN TYPE
                  </Label>
                  <Select value={scanType} onValueChange={setScanType}>
                    <SelectTrigger className="font-mono text-sm bg-secondary border-border">
                      <SelectValue placeholder="Select scan type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="full" className="font-mono">FULL RECONNAISSANCE</SelectItem>
                      <SelectItem value="passive" className="font-mono">PASSIVE ONLY</SelectItem>
                      <SelectItem value="subdomain" className="font-mono">SUBDOMAIN ENUM</SelectItem>
                      <SelectItem value="port" className="font-mono">PORT SCAN</SelectItem>
                      <SelectItem value="osint" className="font-mono">OSINT GATHERING</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleStartScan}
                  disabled={!target || isScanning}
                  className="font-mono uppercase-text bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isScanning ? (
                    <>
                      <RefreshIcon className="w-4 h-4 mr-2 animate-spin" />
                      SCANNING...
                    </>
                  ) : (
                    <>
                      <TargetIcon className="w-4 h-4 mr-2" />
                      START SCAN
                    </>
                  )}
                </Button>
              </div>
              
              {/* AI Suggestions */}
              <div className="mt-4 p-3 bg-primary/5 border border-primary/20">
                <p className="font-mono text-xs text-primary uppercase-text mb-2">AI SUGGESTIONS</p>
                <p className="font-sans text-sm text-muted-foreground">
                  Based on your sector (BFSI), we recommend running a full reconnaissance scan with OSINT modules enabled. 
                  This will help identify exposed APIs, subdomains, and potential data leaks specific to banking infrastructure.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Scan History */}
            <div className="bg-card border border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text">
                  RECENT SCANS
                </h3>
              </div>
              
              <div className="divide-y divide-border">
                {mockScanHistory.map((scan) => (
                  <div key={scan.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-foreground">{scan.target}</span>
                      <span className={cn(
                        "font-mono text-[10px] px-2 py-0.5",
                        scan.status === 'completed' && "bg-success/20 text-success",
                        scan.status === 'running' && "bg-warning/20 text-warning"
                      )}>
                        {scan.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans text-muted-foreground">{scan.date}</span>
                      <span className="font-mono text-primary">{scan.findings} FINDINGS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan Results */}
            <div className="lg:col-span-2 bg-card border border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text">
                  SCAN RESULTS - ICICIBANK.COM
                </h3>
                
                <div className="flex items-center gap-2">
                  {['all', 'subdomain', 'ip', 'port', 'technology'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={cn(
                        "font-mono text-[10px] px-2 py-1 uppercase-text transition-colors",
                        selectedFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              {isScanning ? (
                <div className="p-12 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-2 border-primary/30 animate-ping" />
                    <div className="absolute inset-2 border-2 border-primary animate-pulse" />
                    <ScoutIcon className="absolute inset-4 text-primary" />
                  </div>
                  <p className="font-mono text-sm text-foreground uppercase-text mb-2">
                    SCANNING TARGET...
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Running DNS enumeration, port scanning, and OSINT modules
                  </p>
                </div>
              ) : showResults ? (
                <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                  {filteredResults.map((result) => {
                    const IconComponent = typeIcons[result.type] || ServerIcon
                    return (
                      <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-8 h-8 flex items-center justify-center shrink-0",
                            result.risk === 'high' && "bg-danger/20",
                            result.risk === 'medium' && "bg-warning/20",
                            result.risk === 'low' && "bg-success/20"
                          )}>
                            <IconComponent className={cn(
                              "w-4 h-4",
                              result.risk === 'high' && "text-danger",
                              result.risk === 'medium' && "text-warning",
                              result.risk === 'low' && "text-success"
                            )} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-mono text-sm text-foreground truncate">
                                {result.value}
                              </span>
                              <span className={cn(
                                "font-mono text-[10px] px-2 py-0.5 shrink-0",
                                result.risk === 'high' && "bg-danger/20 text-danger",
                                result.risk === 'medium' && "bg-warning/20 text-warning",
                                result.risk === 'low' && "bg-success/20 text-success"
                              )}>
                                {result.risk.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-sans text-muted-foreground uppercase-text">
                                {result.type} - {result.source}
                              </span>
                              <span className="font-mono text-muted-foreground">
                                {new Date(result.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
                            <ChevronRightIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <ScoutIcon className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="font-mono text-sm text-muted-foreground uppercase-text">
                    NO ACTIVE SCAN
                  </p>
                  <p className="font-sans text-xs text-muted-foreground/60 mt-1">
                    Enter a target and start a new scan
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
