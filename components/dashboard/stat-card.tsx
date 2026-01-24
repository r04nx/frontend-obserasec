import { cn } from '@/lib/utils'
import type { SVGProps } from 'react'
import { Icon } from '@iconify/react' // Declare the Icon variable

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  variant?: 'default' | 'primary' | 'danger' | 'warning'
}

export function StatCard({ title, value, subtitle, icon: IconComponent, trend, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/30 bg-primary/5',
    danger: 'border-danger/30 bg-danger/5',
    warning: 'border-warning/30 bg-warning/5'
  }

  const iconColors = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    danger: 'text-danger',
    warning: 'text-warning'
  }

  return (
    <div className={cn("bg-card border p-4", variantStyles[variant])}>
      <div className="flex items-start justify-between mb-3">
        <IconComponent className={cn("w-5 h-5", iconColors[variant])} />
        {trend && (
          <span className={cn(
            "font-mono text-xs",
            trend.direction === 'up' ? 'text-danger' : 'text-success'
          )}>
            {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="font-mono text-2xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="font-mono text-xs text-muted-foreground uppercase-text">
          {title}
        </p>
        {subtitle && (
          <p className="font-sans text-[10px] text-muted-foreground/60 uppercase-text">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
