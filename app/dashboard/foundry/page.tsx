"use client"

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  FoundryIcon, 
  AlertIcon, 
  ServerIcon, 
  EyeIcon,
  FilterIcon,
  TrendUpIcon
} from '@/components/icons'
import { mockAssets, mockPIIExposures, mockFindings } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  AreaChart,
  Area
} from 'recharts'

const severityData = [
  { name: 'CRITICAL', value: 23, color: '#dc2626' },
  { name: 'HIGH', value: 45, color: '#ea580c' },
  { name: 'MEDIUM', value: 78, color: '#ca8a04' },
  { name: 'LOW', value: 112, color: '#16a34a' },
]

const piiTrendData = [
  { month: 'AUG', aadhaar: 12000, pan: 8000, email: 35000, phone: 25000 },
  { month: 'SEP', aadhaar: 14500, pan: 9200, email: 38000, phone: 28000 },
  { month: 'OCT', aadhaar: 11800, pan: 7500, email: 32000, phone: 24000 },
  { month: 'NOV', aadhaar: 16200, pan: 10500, email: 42000, phone: 31000 },
  { month: 'DEC', aadhaar: 13800, pan: 8800, email: 40000, phone: 29000 },
  { month: 'JAN', aadhaar: 15420, pan: 8750, email: 45230, phone: 32100 },
]

const assetTypeData = [
  { name: 'API', count: 45, risk: 72 },
  { name: 'DATABASE', count: 23, risk: 58 },
  { name: 'DOMAIN', count: 67, risk: 34 },
  { name: 'ENDPOINT', count: 89, risk: 81 },
  { name: 'APPLICATION', count: 34, risk: 67 },
]

const riskTrendData = [
  { date: 'W1', score: 68 },
  { date: 'W2', score: 72 },
  { date: 'W3', score: 65 },
  { date: 'W4', score: 78 },
]

export default function FoundryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedAssetType, setSelectedAssetType] = useState<string>('all')

  const totalPII = mockPIIExposures.reduce((acc, p) => acc + p.count, 0)
  const criticalPII = mockPIIExposures.filter(p => p.severity === 'critical').reduce((acc, p) => acc + p.count, 0)

  const filteredAssets = selectedAssetType === 'all' 
    ? mockAssets 
    : mockAssets.filter(a => a.type === selectedAssetType)

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header 
          title="FOUNDRY" 
          subtitle="PII DETECTION & FINDINGS ANALYTICS"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-6 space-y-6 circuit-pattern">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="TOTAL PII EXPOSED" value={totalPII.toLocaleString()} icon={EyeIcon} variant="danger" />
            <StatCard title="CRITICAL EXPOSURES" value={criticalPII.toLocaleString()} icon={AlertIcon} variant="danger" />
            <StatCard title="MONITORED ASSETS" value={156} icon={ServerIcon} variant="primary" />
            <StatCard title="AVG RISK SCORE" value="72" icon={TrendUpIcon} variant="warning" />
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Severity Distribution */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text mb-6 flex items-center gap-2">
                <AlertIcon className="w-4 h-4 text-primary" />
                FINDINGS BY SEVERITY
              </h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                {severityData.map((item) => (
                  <div key={item.name} className="text-center">
                    <div className="w-3 h-3 mx-auto mb-1" style={{ backgroundColor: item.color }} />
                    <p className="font-mono text-[10px] text-muted-foreground uppercase-text">{item.name}</p>
                    <p className="font-mono text-sm font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PII Exposure Trend */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text mb-6 flex items-center gap-2">
                <EyeIcon className="w-4 h-4 text-primary" />
                PII EXPOSURE TREND
              </h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={piiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      tick={{ fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '11px'
                      }}
                    />
                    <Area type="monotone" dataKey="aadhaar" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} name="AADHAAR" />
                    <Area type="monotone" dataKey="pan" stackId="1" stroke="#ea580c" fill="#ea580c" fillOpacity={0.6} name="PAN" />
                    <Area type="monotone" dataKey="email" stackId="1" stroke="#ca8a04" fill="#ca8a04" fillOpacity={0.4} name="EMAIL" />
                    <Area type="monotone" dataKey="phone" stackId="1" stroke="#16a34a" fill="#16a34a" fillOpacity={0.4} name="PHONE" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Asset Types */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text mb-6 flex items-center gap-2">
                <ServerIcon className="w-4 h-4 text-primary" />
                ASSETS BY TYPE
              </h3>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetTypeData} layout="vertical">
                    <XAxis type="number" tick={{ fill: '#666', fontSize: 10 }} axisLine={{ stroke: '#333' }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#333' }}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '11px'
                      }}
                    />
                    <Bar dataKey="count" fill="#dc2626" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Trend */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text mb-6 flex items-center gap-2">
                <TrendUpIcon className="w-4 h-4 text-primary" />
                RISK SCORE TREND
              </h3>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '11px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#dc2626" 
                      strokeWidth={2}
                      dot={{ fill: '#dc2626', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PII Breakdown */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text mb-6 flex items-center gap-2">
                <FoundryIcon className="w-4 h-4 text-primary" />
                PII BREAKDOWN
              </h3>
              
              <div className="space-y-4">
                {mockPIIExposures.slice(0, 5).map((pii) => (
                  <div key={pii.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-muted-foreground uppercase-text">
                        {pii.type.replace('_', ' ')}
                      </span>
                      <span className={cn(
                        "font-mono text-xs",
                        pii.severity === 'critical' && "text-danger",
                        pii.severity === 'high' && "text-warning"
                      )}>
                        {pii.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary">
                      <div 
                        className={cn(
                          "h-full",
                          pii.severity === 'critical' && "bg-danger",
                          pii.severity === 'high' && "bg-warning"
                        )}
                        style={{ width: `${(pii.count / 50000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assets Table */}
          <div className="bg-card border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                <ServerIcon className="w-4 h-4 text-primary" />
                DIGITAL ASSETS INVENTORY
              </h3>
              
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-muted-foreground" />
                {['all', 'api', 'database', 'domain', 'endpoint'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedAssetType(type)}
                    className={cn(
                      "font-mono text-[10px] px-2 py-1 uppercase-text transition-colors",
                      selectedAssetType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">ASSET</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">TYPE</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">STATUS</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">RISK SCORE</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">FINDINGS</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">PII EXPOSED</th>
                    <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase-text">LAST SCAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3 font-mono text-xs text-foreground">{asset.name}</td>
                      <td className="p-3">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase-text">
                          {asset.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={cn(
                          "font-mono text-[10px] px-2 py-0.5",
                          asset.status === 'critical' && "bg-danger/20 text-danger",
                          asset.status === 'warning' && "bg-warning/20 text-warning",
                          asset.status === 'secure' && "bg-success/20 text-success"
                        )}>
                          {asset.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary">
                            <div 
                              className={cn(
                                "h-full",
                                asset.riskScore >= 80 && "bg-danger",
                                asset.riskScore >= 50 && asset.riskScore < 80 && "bg-warning",
                                asset.riskScore < 50 && "bg-success"
                              )}
                              style={{ width: `${asset.riskScore}%` }}
                            />
                          </div>
                          <span className={cn(
                            "font-mono text-xs",
                            asset.riskScore >= 80 && "text-danger",
                            asset.riskScore >= 50 && asset.riskScore < 80 && "text-warning",
                            asset.riskScore < 50 && "text-success"
                          )}>
                            {asset.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-xs text-warning">{asset.findings}</td>
                      <td className="p-3 font-mono text-xs text-danger">{asset.piiExposures}</td>
                      <td className="p-3 font-mono text-[10px] text-muted-foreground">
                        {new Date(asset.lastScanned).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
