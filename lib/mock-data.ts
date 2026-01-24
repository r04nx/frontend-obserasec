import type { Asset, Finding, ThreatAlert, AttackVector, ComplianceReport, DarkWebMention, PIIExposure } from './types'

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'api.icicibank.com',
    type: 'api',
    riskScore: 78,
    status: 'warning',
    lastScanned: '2026-01-24T10:30:00Z',
    findings: 12,
    piiExposures: 3
  },
  {
    id: '2',
    name: 'core-banking-db',
    type: 'database',
    riskScore: 45,
    status: 'secure',
    lastScanned: '2026-01-24T09:15:00Z',
    findings: 4,
    piiExposures: 0
  },
  {
    id: '3',
    name: '192.168.1.100',
    type: 'ip',
    riskScore: 92,
    status: 'critical',
    lastScanned: '2026-01-24T08:00:00Z',
    findings: 23,
    piiExposures: 8
  },
  {
    id: '4',
    name: 'payments.icicibank.com',
    type: 'domain',
    riskScore: 34,
    status: 'secure',
    lastScanned: '2026-01-24T11:00:00Z',
    findings: 2,
    piiExposures: 0
  },
  {
    id: '5',
    name: 'mobile-banking-app',
    type: 'application',
    riskScore: 67,
    status: 'warning',
    lastScanned: '2026-01-24T07:30:00Z',
    findings: 9,
    piiExposures: 2
  },
  {
    id: '6',
    name: 'trading-endpoint-01',
    type: 'endpoint',
    riskScore: 85,
    status: 'critical',
    lastScanned: '2026-01-23T23:45:00Z',
    findings: 18,
    piiExposures: 5
  }
]

export const mockFindings: Finding[] = [
  {
    id: '1',
    title: 'SQL Injection Vulnerability in Login Endpoint',
    severity: 'critical',
    category: 'Application Security',
    asset: 'api.icicibank.com',
    discovered: '2026-01-23T14:30:00Z',
    status: 'open',
    description: 'Unparameterized SQL query detected in authentication module allowing potential data extraction.',
    cve: 'CVE-2026-1234'
  },
  {
    id: '2',
    title: 'Exposed AWS S3 Bucket with Customer Data',
    severity: 'critical',
    category: 'Cloud Security',
    asset: 'core-banking-db',
    discovered: '2026-01-22T09:15:00Z',
    status: 'in_progress',
    description: 'S3 bucket containing customer PAN and Aadhaar data found publicly accessible.'
  },
  {
    id: '3',
    title: 'Outdated TLS 1.0 Protocol in Use',
    severity: 'high',
    category: 'Network Security',
    asset: 'payments.icicibank.com',
    discovered: '2026-01-21T16:00:00Z',
    status: 'open',
    description: 'Legacy TLS protocol detected which is vulnerable to POODLE and BEAST attacks.'
  },
  {
    id: '4',
    title: 'Missing Rate Limiting on OTP Endpoint',
    severity: 'high',
    category: 'API Security',
    asset: 'mobile-banking-app',
    discovered: '2026-01-20T11:30:00Z',
    status: 'resolved',
    description: 'OTP verification endpoint lacks rate limiting enabling brute force attacks.'
  },
  {
    id: '5',
    title: 'Hardcoded API Keys in Mobile Application',
    severity: 'medium',
    category: 'Application Security',
    asset: 'mobile-banking-app',
    discovered: '2026-01-19T08:45:00Z',
    status: 'open',
    description: 'Static analysis revealed hardcoded API credentials in APK decompilation.'
  },
  {
    id: '6',
    title: 'Cross-Site Scripting in Search Function',
    severity: 'medium',
    category: 'Web Security',
    asset: 'trading-endpoint-01',
    discovered: '2026-01-18T15:20:00Z',
    status: 'in_progress',
    description: 'Reflected XSS vulnerability found in transaction search functionality.',
    cve: 'CVE-2026-5678'
  }
]

export const mockThreatAlerts: ThreatAlert[] = [
  {
    id: '1',
    title: 'Active Ransomware Campaign Targeting Indian Banks',
    severity: 'critical',
    source: 'intel_feed',
    timestamp: '2026-01-24T06:00:00Z',
    description: 'CERT-In advisory: BlackCat ransomware variant specifically targeting BFSI sector with spear-phishing campaigns.',
    indicators: ['185.220.101.45', 'malware-c2.evil.com', 'SHA256:a1b2c3d4...'],
    status: 'investigating'
  },
  {
    id: '2',
    title: 'Credential Dump Containing Bank Employee Data',
    severity: 'critical',
    source: 'dark_web',
    timestamp: '2026-01-23T22:15:00Z',
    description: '50,000+ credentials from Indian banking employees found on dark web marketplace.',
    indicators: ['stealer-logs-2026.onion', 'combolist-india-banks.txt'],
    status: 'new'
  },
  {
    id: '3',
    title: 'Zero-Day Exploit for Core Banking Software',
    severity: 'high',
    source: 'partner',
    timestamp: '2026-01-23T18:30:00Z',
    description: 'Unpatched vulnerability in Finacle CBS allowing unauthorized fund transfers.',
    indicators: ['CVE-2026-9999', 'finacle-exploit.py'],
    status: 'investigating'
  },
  {
    id: '4',
    title: 'DDoS Attack Pattern Detected',
    severity: 'medium',
    source: 'internal',
    timestamp: '2026-01-23T14:00:00Z',
    description: 'Volumetric attack pattern observed targeting UPI payment gateway infrastructure.',
    indicators: ['botnet-c2-01.ru', '45.33.32.156'],
    status: 'resolved'
  }
]

export const mockAttackVectors: AttackVector[] = [
  {
    id: '1',
    name: 'API Gateway Compromise → Core Banking Access',
    blastRadius: 95,
    affectedAssets: ['api.icicibank.com', 'core-banking-db', 'payments.icicibank.com'],
    probability: 0.72,
    impact: 'catastrophic',
    mitigations: ['Implement API Gateway WAF', 'Enable mutual TLS', 'Deploy API rate limiting']
  },
  {
    id: '2',
    name: 'Phishing → Employee Credentials → Internal Network',
    blastRadius: 78,
    affectedAssets: ['trading-endpoint-01', 'mobile-banking-app'],
    probability: 0.85,
    impact: 'severe',
    mitigations: ['Security awareness training', 'Implement MFA everywhere', 'Deploy email security gateway']
  },
  {
    id: '3',
    name: 'Supply Chain Attack via Third-Party Vendor',
    blastRadius: 65,
    affectedAssets: ['core-banking-db', 'api.icicibank.com'],
    probability: 0.45,
    impact: 'severe',
    mitigations: ['Vendor security assessments', 'Network segmentation', 'Continuous monitoring']
  },
  {
    id: '4',
    name: 'Mobile App Reverse Engineering → API Abuse',
    blastRadius: 52,
    affectedAssets: ['mobile-banking-app', 'api.icicibank.com'],
    probability: 0.68,
    impact: 'moderate',
    mitigations: ['Code obfuscation', 'Certificate pinning', 'Runtime application self-protection']
  }
]

export const mockComplianceReports: ComplianceReport[] = [
  {
    id: '1',
    name: 'RBI Cyber Security Framework Assessment Q4 2025',
    framework: 'RBI',
    period: 'Q4 2025',
    status: 'ready',
    score: 87,
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'SEBI CSCRF Compliance Report 2025',
    framework: 'SEBI',
    period: 'FY 2025-26',
    status: 'ready',
    score: 92,
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'CERT-In Incident Response Audit',
    framework: 'CERT-In',
    period: 'January 2026',
    status: 'generating',
    score: 0
  },
  {
    id: '4',
    name: 'PCI-DSS v4.0 Compliance Assessment',
    framework: 'PCI-DSS',
    period: 'Q1 2026',
    status: 'scheduled',
    score: 0
  },
  {
    id: '5',
    name: 'ISO 27001:2022 Gap Analysis',
    framework: 'ISO27001',
    period: 'FY 2025-26',
    status: 'ready',
    score: 78,
    downloadUrl: '#'
  }
]

export const mockDarkWebMentions: DarkWebMention[] = [
  {
    id: '1',
    source: 'Russian Forum XSS',
    content: 'Selling fresh Indian bank customer database - 2M records with PAN, Aadhaar...',
    timestamp: '2026-01-24T04:30:00Z',
    relevance: 'high',
    category: 'data_sale',
    indicators: ['PAN numbers', 'Aadhaar data', 'Bank account details']
  },
  {
    id: '2',
    source: 'BreachForums',
    content: 'Leaked employee credentials from major Indian PSU bank...',
    timestamp: '2026-01-23T19:45:00Z',
    relevance: 'high',
    category: 'credential_leak',
    indicators: ['Corporate emails', 'VPN credentials', 'Internal portal access']
  },
  {
    id: '3',
    source: 'Telegram Channel',
    content: 'New exploit kit targeting Indian mobile banking apps...',
    timestamp: '2026-01-23T12:00:00Z',
    relevance: 'medium',
    category: 'vulnerability',
    indicators: ['Android malware', 'Banking trojan', 'SMS interception']
  },
  {
    id: '4',
    source: 'Tor Marketplace',
    content: 'Threat actor "IndiaHacker" claiming successful breach of fintech...',
    timestamp: '2026-01-22T08:15:00Z',
    relevance: 'medium',
    category: 'threat_actor',
    indicators: ['APT group', 'Fintech targeting', 'Data exfiltration']
  }
]

export const mockPIIExposures: PIIExposure[] = [
  {
    id: '1',
    type: 'aadhaar',
    count: 15420,
    source: 'Exposed S3 Bucket',
    severity: 'critical',
    discovered: '2026-01-24T06:00:00Z'
  },
  {
    id: '2',
    type: 'pan',
    count: 8750,
    source: 'Database Leak',
    severity: 'critical',
    discovered: '2026-01-23T14:30:00Z'
  },
  {
    id: '3',
    type: 'email',
    count: 45230,
    source: 'Dark Web Dump',
    severity: 'high',
    discovered: '2026-01-23T09:15:00Z'
  },
  {
    id: '4',
    type: 'phone',
    count: 32100,
    source: 'Partner Breach',
    severity: 'high',
    discovered: '2026-01-22T18:00:00Z'
  },
  {
    id: '5',
    type: 'credit_card',
    count: 2340,
    source: 'Skimmer Detection',
    severity: 'critical',
    discovered: '2026-01-22T11:45:00Z'
  },
  {
    id: '6',
    type: 'bank_account',
    count: 5670,
    source: 'Phishing Campaign',
    severity: 'high',
    discovered: '2026-01-21T16:30:00Z'
  }
]

export const dashboardStats = {
  totalAssets: 156,
  criticalFindings: 23,
  activeThreats: 8,
  complianceScore: 87,
  piiExposures: 109510,
  darkWebAlerts: 12,
  riskScore: 72,
  lastScanTime: '2026-01-24T11:30:00Z'
}
