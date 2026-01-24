"use client"

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  ShadowIcon, 
  AlertIcon, 
  EyeIcon, 
  TargetIcon,
  BellIcon,
  SearchIcon,
  ChevronRightIcon,
  ShieldIcon
} from '@/components/icons'
import { mockDarkWebMentions, mockThreatAlerts } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const threatFeeds = [
  { id: '1', name: 'CERT-In Advisory', status: 'active', lastUpdate: '5 min ago', alerts: 3 },
  { id: '2', name: 'FS-ISAC Intel', status: 'active', lastUpdate: '12 min ago', alerts: 7 },
  { id: '3', name: 'Dark Web Monitor', status: 'active', lastUpdate: '2 min ago', alerts: 4 },
  { id: '4', name: 'Brand Protection', status: 'active', lastUpdate: '8 min ago', alerts: 2 },
  { id: '5', name: 'Malware Intel', status: 'warning', lastUpdate: '45 min ago', alerts: 0 },
]

const monitoredKeywords = [
  'ICICI Bank', 'customer data', 'employee credentials', 'database dump', 
  'API keys', 'source code', 'internal documents', 'VPN access'
]

export default function ShadowPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(mockThreatAlerts[0].id)
  const [searchQuery, setSearchQuery] = useState('')

  const alert = selectedAlert ? mockThreatAlerts.find(a => a.id === selectedAlert) : mockThreatAlerts[0]

  const filteredMentions = searchQuery 
    ? mockDarkWebMentions.filter(m => 
        m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockDarkWebMentions

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header 
          title="OBERASHADOW" 
          subtitle="DARK WEB & THREAT MONITORING"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-6 space-y-6 grid-pattern">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="ACTIVE THREATS" value={8} icon={AlertIcon} variant="danger" />
            <StatCard title="DARK WEB MENTIONS" value={47} icon={ShadowIcon} variant="warning" />
            <StatCard title="MONITORED KEYWORDS" value={24} icon={SearchIcon} variant="primary" />
            <StatCard title="INTEL FEEDS" value={12} icon={EyeIcon} />
          </div>

          {/* Live Threat Banner */}
          <div className="bg-danger/10 border border-danger/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-3 h-3 bg-danger rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-danger rounded-full animate-ping" />
              </div>
              <div>
                <p className="font-mono text-sm text-danger uppercase-text font-bold">
                  ACTIVE THREAT DETECTED
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Credential dump containing bank employee data found on BreachForums - Investigating
                </p>
              </div>
            </div>
            <Button size="sm" className="font-mono uppercase-text text-xs bg-danger hover:bg-danger/90">
              VIEW DETAILS
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Threat Feeds */}
            <div className="bg-card border border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <EyeIcon className="w-4 h-4 text-primary" />
                  INTELLIGENCE FEEDS
                </h3>
              </div>
              
              <div className="divide-y divide-border">
                {threatFeeds.map((feed) => (
                  <div key={feed.id} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          feed.status === 'active' && "bg-success",
                          feed.status === 'warning' && "bg-warning"
                        )} />
                        <span className="font-mono text-xs text-foreground uppercase-text">
                          {feed.name}
                        </span>
                      </div>
                      {feed.alerts > 0 && (
                        <span className="font-mono text-[10px] bg-danger/20 text-danger px-2 py-0.5">
                          {feed.alerts} NEW
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[10px] text-muted-foreground">
                      Last update: {feed.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Monitored Keywords */}
              <div className="p-4 border-t border-border">
                <h4 className="font-mono text-xs text-muted-foreground uppercase-text mb-3">
                  MONITORED KEYWORDS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {monitoredKeywords.slice(0, 6).map((keyword, i) => (
                    <span 
                      key={i}
                      className="font-mono text-[10px] bg-primary/10 text-primary px-2 py-1"
                    >
                      {keyword}
                    </span>
                  ))}
                  <span className="font-mono text-[10px] text-muted-foreground">
                    +{monitoredKeywords.length - 6} more
                  </span>
                </div>
              </div>
            </div>

            {/* Threat Alerts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dark Web Mentions */}
              <div className="bg-card border border-border">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                    <ShadowIcon className="w-4 h-4 text-primary" />
                    DARK WEB MENTIONS
                  </h3>
                  
                  <div className="relative">
                    <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search mentions..."
                      className="w-48 pl-7 h-8 font-mono text-xs bg-secondary border-border"
                    />
                  </div>
                </div>
                
                <div className="divide-y divide-border max-h-80 overflow-y-auto">
                  {filteredMentions.map((mention) => (
                    <div key={mention.id} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-mono text-[10px] px-2 py-0.5",
                            mention.relevance === 'high' && "bg-danger/20 text-danger",
                            mention.relevance === 'medium' && "bg-warning/20 text-warning",
                            mention.relevance === 'low' && "bg-info/20 text-info"
                          )}>
                            {mention.relevance.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-primary">
                            {mention.source}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                          {new Date(mention.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="font-sans text-sm text-foreground mb-3 line-clamp-2">
                        {mention.content}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "font-mono text-[10px] uppercase-text",
                          mention.category === 'data_sale' && "text-danger",
                          mention.category === 'credential_leak' && "text-warning",
                          mention.category === 'threat_actor' && "text-info"
                        )}>
                          {mention.category.replace('_', ' ')}
                        </span>
                        <div className="flex-1" />
                        <Button variant="ghost" size="sm" className="font-mono text-[10px] uppercase-text text-muted-foreground hover:text-primary h-6 px-2">
                          INVESTIGATE
                          <ChevronRightIcon className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Alerts */}
              <div className="bg-card border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                    <BellIcon className="w-4 h-4 text-primary" />
                    THREAT ALERTS
                  </h3>
                </div>
                
                <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                  {/* Alert List */}
                  <div className="divide-y divide-border">
                    {mockThreatAlerts.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAlert(a.id)}
                        className={cn(
                          "w-full p-4 text-left hover:bg-secondary/50 transition-colors",
                          selectedAlert === a.id && "bg-primary/10 border-l-2 border-primary"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={cn(
                            "font-mono text-[10px] px-2 py-0.5",
                            a.severity === 'critical' && "bg-danger/20 text-danger",
                            a.severity === 'high' && "bg-warning/20 text-warning",
                            a.severity === 'medium' && "bg-info/20 text-info"
                          )}>
                            {a.severity.toUpperCase()}
                          </span>
                          <span className={cn(
                            "font-mono text-[10px]",
                            a.status === 'new' && "text-danger",
                            a.status === 'investigating' && "text-warning",
                            a.status === 'resolved' && "text-success"
                          )}>
                            {a.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-foreground line-clamp-2">
                          {a.title}
                        </p>
                      </button>
                    ))}
                  </div>
                  
                  {/* Alert Details */}
                  {alert && (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={cn(
                          "font-mono text-[10px] px-2 py-0.5",
                          alert.severity === 'critical' && "bg-danger/20 text-danger",
                          alert.severity === 'high' && "bg-warning/20 text-warning"
                        )}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase-text">
                          {alert.source.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <h4 className="font-mono text-sm font-bold text-foreground mb-3">
                        {alert.title}
                      </h4>
                      
                      <p className="font-sans text-sm text-muted-foreground mb-4">
                        {alert.description}
                      </p>
                      
                      <div className="mb-4">
                        <p className="font-mono text-xs text-muted-foreground uppercase-text mb-2">
                          INDICATORS OF COMPROMISE
                        </p>
                        <div className="space-y-1">
                          {alert.indicators.map((ioc, i) => (
                            <div 
                              key={i}
                              className="font-mono text-xs text-primary bg-secondary px-2 py-1"
                            >
                              {ioc}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="font-mono uppercase-text text-[10px] bg-primary hover:bg-primary/90">
                          TAKE ACTION
                        </Button>
                        <Button size="sm" variant="outline" className="font-mono uppercase-text text-[10px] bg-transparent">
                          DISMISS
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
