import { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
}

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl hover:shadow-accent/5 transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-muted text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-success' : 'text-danger'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </div>
  )
}
