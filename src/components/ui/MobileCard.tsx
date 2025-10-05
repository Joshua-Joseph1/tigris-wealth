import { ReactNode } from 'react'

interface MobileCardProps {
  children: ReactNode
  onClick?: () => void
}

export function MobileCard({ children, onClick }: MobileCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-border rounded-xl p-4 ${
        onClick ? 'cursor-pointer hover:bg-surface-elevated' : ''
      } transition-colors`}
    >
      {children}
    </div>
  )
}

interface MobileCardRowProps {
  label: string
  value: ReactNode
}

export function MobileCardRow({ label, value }: MobileCardRowProps) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-border last:border-0">
      <span className="text-sm text-text-muted font-medium">{label}</span>
      <div className="text-sm text-right">{value}</div>
    </div>
  )
}
