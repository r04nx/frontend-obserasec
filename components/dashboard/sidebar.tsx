"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'
import {
  ObseraLogo,
  DashboardIcon,
  ScoutIcon,
  FoundryIcon,
  InsightIcon,
  ShadowIcon,
  ComplianceIcon,
  UserIcon,
  LogoutIcon,
  BellIcon,
  CloseIcon
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import type { ModuleType } from '@/lib/types'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems: { href: string; icon: typeof DashboardIcon; label: string; module: ModuleType }[] = [
  { href: '/dashboard', icon: DashboardIcon, label: 'DASHBOARD', module: 'dashboard' },
  { href: '/dashboard/scout', icon: ScoutIcon, label: 'SCOUT', module: 'scout' },
  { href: '/dashboard/foundry', icon: FoundryIcon, label: 'FOUNDRY', module: 'foundry' },
  { href: '/dashboard/insight', icon: InsightIcon, label: 'OBSERAINSIGHT', module: 'insight' },
  { href: '/dashboard/shadow', icon: ShadowIcon, label: 'OBERASHADOW', module: 'shadow' },
  { href: '/dashboard/compliance', icon: ComplianceIcon, label: 'COMPLIANCE', module: 'compliance' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <ObseraLogo className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-sidebar-foreground uppercase-text tracking-wider">
                OBSERAONE
              </span>
              <span className="font-sans text-[10px] text-muted-foreground uppercase-text">
                BY OBSERVASEC
              </span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <CloseIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase-text transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Alerts indicator */}
        <div className="px-4 py-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between bg-primary/10 px-3 py-2">
            <div className="flex items-center gap-2">
              <BellIcon className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-primary uppercase-text">ALERTS</span>
            </div>
            <span className="font-mono text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5">
              8
            </span>
          </div>
        </div>

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-primary/20 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-sidebar-foreground uppercase-text truncate">
                {user?.name || 'USER'}
              </p>
              <p className="font-sans text-[10px] text-muted-foreground uppercase-text truncate">
                {user?.organization || 'ORGANIZATION'}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start gap-2 font-mono text-xs uppercase-text text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <LogoutIcon className="w-4 h-4" />
            LOGOUT
          </Button>
        </div>
      </aside>
    </>
  )
}
