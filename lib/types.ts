export interface Asset {
  id: string
  name: string
  type: 'domain' | 'ip' | 'endpoint' | 'application' | 'database' | 'api'
  riskScore: number
  status: 'secure' | 'warning' | 'critical' | 'unknown'
  lastScanned: string
  findings: number
  piiExposures: number
}

export interface Finding {
  id: string
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  category: string
  asset: string
  discovered: string
  status: 'open' | 'in_progress' | 'resolved' | 'false_positive'
  description: string
  cve?: string
}

export interface ThreatAlert {
  id: string
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: 'dark_web' | 'intel_feed' | 'internal' | 'partner'
  timestamp: string
  description: string
  indicators: string[]
  status: 'new' | 'investigating' | 'resolved'
}

export interface AttackVector {
  id: string
  name: string
  blastRadius: number
  affectedAssets: string[]
  probability: number
  impact: 'catastrophic' | 'severe' | 'moderate' | 'minor'
  mitigations: string[]
}

export interface ComplianceReport {
  id: string
  name: string
  framework: 'RBI' | 'SEBI' | 'IRDAI' | 'CERT-In' | 'ISO27001' | 'PCI-DSS' | 'GDPR'
  period: string
  status: 'ready' | 'generating' | 'scheduled'
  score: number
  downloadUrl?: string
}

export interface DarkWebMention {
  id: string
  source: string
  content: string
  timestamp: string
  relevance: 'high' | 'medium' | 'low'
  category: 'credential_leak' | 'data_sale' | 'threat_actor' | 'vulnerability' | 'brand_mention'
  indicators: string[]
}

export interface PIIExposure {
  id: string
  type: 'email' | 'phone' | 'aadhaar' | 'pan' | 'passport' | 'credit_card' | 'bank_account'
  count: number
  source: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  discovered: string
}

export type ModuleType = 'dashboard' | 'scout' | 'foundry' | 'insight' | 'shadow' | 'compliance'
