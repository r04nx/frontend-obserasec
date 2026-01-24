"use client"

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { 
  InsightIcon, 
  AlertIcon, 
  TargetIcon, 
  GraphIcon,
  NetworkIcon,
  ShieldIcon,
  ChevronRightIcon,
  ServerIcon
} from '@/components/icons'
import { mockAttackVectors, mockFindings, mockAssets } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// Intelligence graph nodes
const graphNodes = [
  { id: 'attacker', label: 'THREAT ACTOR', x: 50, y: 200, type: 'threat' },
  { id: 'phishing', label: 'PHISHING', x: 180, y: 100, type: 'vector' },
  { id: 'exploit', label: 'API EXPLOIT', x: 180, y: 200, type: 'vector' },
  { id: 'supply', label: 'SUPPLY CHAIN', x: 180, y: 300, type: 'vector' },
  { id: 'creds', label: 'CREDENTIALS', x: 320, y: 150, type: 'asset' },
  { id: 'api', label: 'API GATEWAY', x: 320, y: 250, type: 'asset' },
  { id: 'internal', label: 'INTERNAL NET', x: 460, y: 150, type: 'system' },
  { id: 'database', label: 'CORE DB', x: 460, y: 250, type: 'system' },
  { id: 'pii', label: 'PII DATA', x: 600, y: 200, type: 'target' },
]

const graphEdges = [
  { from: 'attacker', to: 'phishing' },
  { from: 'attacker', to: 'exploit' },
  { from: 'attacker', to: 'supply' },
  { from: 'phishing', to: 'creds' },
  { from: 'exploit', to: 'api' },
  { from: 'supply', to: 'api' },
  { from: 'creds', to: 'internal' },
  { from: 'api', to: 'database' },
  { from: 'internal', to: 'database' },
  { from: 'database', to: 'pii' },
]

export default function InsightPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedVector, setSelectedVector] = useState<string | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const vector = selectedVector ? mockAttackVectors.find(v => v.id === selectedVector) : mockAttackVectors[0]

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'threat': return '#dc2626'
      case 'vector': return '#ea580c'
      case 'asset': return '#ca8a04'
      case 'system': return '#2563eb'
      case 'target': return '#dc2626'
      default: return '#666'
    }
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header 
          title="OBSERAINSIGHT" 
          subtitle="ATTACK VECTOR & INTELLIGENCE ANALYSIS"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-6 space-y-6 hex-pattern">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="ATTACK VECTORS" value={mockAttackVectors.length} icon={TargetIcon} variant="danger" />
            <StatCard title="AVG BLAST RADIUS" value="72%" icon={AlertIcon} variant="warning" />
            <StatCard title="AFFECTED ASSETS" value={12} icon={ServerIcon} variant="primary" />
            <StatCard title="MITIGATIONS" value={18} icon={ShieldIcon} />
          </div>

          {/* Intelligence Graph */}
          <div className="bg-card border border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                <GraphIcon className="w-4 h-4 text-primary" />
                ATTACK PATH INTELLIGENCE GRAPH
              </h3>
            </div>
            
            <div className="p-6">
              <div className="relative w-full h-80 bg-secondary/30 overflow-hidden">
                {/* Grid pattern overlay */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Edges */}
                  {graphEdges.map((edge, i) => {
                    const fromNode = graphNodes.find(n => n.id === edge.from)
                    const toNode = graphNodes.find(n => n.id === edge.to)
                    if (!fromNode || !toNode) return null
                    
                    const isActive = activeNode === edge.from || activeNode === edge.to
                    
                    return (
                      <line
                        key={i}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isActive ? '#dc2626' : '#444'}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray={isActive ? '' : '4 2'}
                        className="transition-all duration-300"
                      />
                    )
                  })}
                  
                  {/* Nodes */}
                  {graphNodes.map((node) => {
                    const isActive = activeNode === node.id
                    return (
                      <g 
                        key={node.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                      >
                        <rect
                          x={node.x - 45}
                          y={node.y - 20}
                          width="90"
                          height="40"
                          fill={isActive ? getNodeColor(node.type) : '#1a1a1a'}
                          stroke={getNodeColor(node.type)}
                          strokeWidth={isActive ? 2 : 1}
                          className="transition-all duration-300"
                        />
                        <text
                          x={node.x}
                          y={node.y + 4}
                          textAnchor="middle"
                          fill={isActive ? '#fff' : getNodeColor(node.type)}
                          fontSize="10"
                          fontFamily="JetBrains Mono"
                          className="uppercase"
                        >
                          {node.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex items-center gap-4">
                  {[
                    { type: 'threat', label: 'THREAT' },
                    { type: 'vector', label: 'VECTOR' },
                    { type: 'asset', label: 'ASSET' },
                    { type: 'system', label: 'SYSTEM' },
                    { type: 'target', label: 'TARGET' },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center gap-1">
                      <div className="w-3 h-3" style={{ backgroundColor: getNodeColor(item.type) }} />
                      <span className="font-mono text-[10px] text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Attack Vectors List */}
            <div className="bg-card border border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-mono text-sm font-bold text-foreground uppercase-text flex items-center gap-2">
                  <TargetIcon className="w-4 h-4 text-primary" />
                  IDENTIFIED ATTACK VECTORS
                </h3>
              </div>
              
              <div className="divide-y divide-border">
                {mockAttackVectors.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => setSelectedVector(av.id)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-secondary/50 transition-colors",
                      selectedVector === av.id && "bg-primary/10 border-l-2 border-primary"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-foreground line-clamp-1">
                        {av.name.split(' → ')[0]}
                      </span>
                      <span className={cn(
                        "font-mono text-[10px] px-2 py-0.5",
                        av.impact === 'catastrophic' && "bg-danger/20 text-danger",
                        av.impact === 'severe' && "bg-warning/20 text-warning",
                        av.impact === 'moderate' && "bg-info/20 text-info"
                      )}>
                        {av.impact.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans text-muted-foreground">
                        BLAST: {av.blastRadius}%
                      </span>
                      <span className="font-mono text-primary">
                        P: {(av.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vector Details */}
            <div className="lg:col-span-2 space-y-6">
              {vector && (
                <>
                  {/* Vector Info */}
                  <div className="bg-card border border-border p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-mono text-lg font-bold text-foreground uppercase-text mb-2">
                          {vector.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "font-mono text-xs px-2 py-1",
                            vector.impact === 'catastrophic' && "bg-danger/20 text-danger",
                            vector.impact === 'severe' && "bg-warning/20 text-warning"
                          )}>
                            {vector.impact.toUpperCase()} IMPACT
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {vector.affectedAssets.length} ASSETS AFFECTED
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase-text mb-2">
                          BLAST RADIUS
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-3 bg-secondary">
                            <div 
                              className="h-full bg-danger"
                              style={{ width: `${vector.blastRadius}%` }}
                            />
                          </div>
                          <span className="font-mono text-xl font-bold text-danger">
                            {vector.blastRadius}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase-text mb-2">
                          PROBABILITY
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-3 bg-secondary">
                            <div 
                              className="h-full bg-warning"
                              style={{ width: `${vector.probability * 100}%` }}
                            />
                          </div>
                          <span className="font-mono text-xl font-bold text-warning">
                            {(vector.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Affected Assets */}
                    <div className="mb-6">
                      <p className="font-mono text-xs text-muted-foreground uppercase-text mb-3">
                        AFFECTED ASSETS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {vector.affectedAssets.map((asset, i) => (
                          <span 
                            key={i}
                            className="font-mono text-xs bg-secondary px-3 py-1 text-foreground"
                          >
                            {asset}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mitigations */}
                    <div>
                      <p className="font-mono text-xs text-muted-foreground uppercase-text mb-3">
                        RECOMMENDED MITIGATIONS
                      </p>
                      <div className="space-y-2">
                        {vector.mitigations.map((mitigation, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-3 p-3 bg-success/10 border border-success/20"
                          >
                            <ShieldIcon className="w-4 h-4 text-success shrink-0" />
                            <span className="font-sans text-sm text-foreground">
                              {mitigation}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="bg-primary/5 border border-primary/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <InsightIcon className="w-5 h-5 text-primary" />
                      <h4 className="font-mono text-sm font-bold text-primary uppercase-text">
                        AI THREAT ANALYSIS
                      </h4>
                    </div>
                    
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                      This attack vector represents a <span className="text-danger font-bold">{vector.impact}</span> risk 
                      to your infrastructure. Based on current threat intelligence and your asset configuration, 
                      the probability of exploitation is <span className="text-warning font-bold">{(vector.probability * 100).toFixed(0)}%</span>.
                    </p>
                    
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      Immediate action is recommended on the following assets: {' '}
                      <span className="text-primary">{vector.affectedAssets.join(', ')}</span>. 
                      Implementing the suggested mitigations could reduce blast radius by approximately 40%.
                    </p>
                    
                    <Button className="mt-4 font-mono uppercase-text text-xs bg-primary hover:bg-primary/90">
                      GENERATE DETAILED REPORT
                      <ChevronRightIcon className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
