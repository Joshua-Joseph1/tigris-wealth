import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'

interface DealCardProps {
  deal: {
    id: string
    name: string
    clientName: string
    estValue: number
    ownerName: string
    probability: number
  }
  onClick?: () => void
}

export function DealCard({ deal, onClick }: DealCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-surface border border-border rounded-xl p-4 hover:shadow-xl hover:shadow-accent/5 transition-all cursor-pointer"
    >
      <h4 className="font-medium text-sm mb-2">{deal.name}</h4>
      <p className="text-xs text-text-muted mb-3">{deal.clientName}</p>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">{formatCurrency(deal.estValue)}</span>
        {deal.probability > 0 && (
          <Badge variant="accent" className="text-xs">
            {deal.probability}%
          </Badge>
        )}
      </div>

      <p className="text-xs text-text-muted">{deal.ownerName}</p>
    </div>
  )
}
