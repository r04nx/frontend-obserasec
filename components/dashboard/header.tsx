"use client"

import { useAuth } from '@/lib/auth-context'
import { MenuIcon, BellIcon, RefreshIcon, SearchIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title: string
  subtitle?: string
  onMenuClick: () => void
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={onMenuClick}
          >
            <MenuIcon className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="font-mono text-lg font-bold text-foreground uppercase-text tracking-wide">
              {title}
            </h1>
            {subtitle && (
              <p className="font-sans text-xs text-muted-foreground uppercase-text">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search - hidden on mobile */}
          <div className="hidden md:flex relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search assets, threats..."
              className="w-64 pl-9 font-mono text-xs bg-secondary border-border focus:border-primary"
            />
          </div>

          {/* Refresh button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshIcon className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-mono flex items-center justify-center">
              8
            </span>
          </Button>

          {/* User badge */}
          <div className="hidden sm:flex items-center gap-2 bg-secondary px-3 py-1.5 border border-border">
            <span className="font-mono text-xs text-muted-foreground uppercase-text">
              {user?.sector || 'SECTOR'}
            </span>
            <span className="w-1.5 h-1.5 bg-success rounded-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
