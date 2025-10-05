'use client'

import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatPercent } from '@/lib/utils'

// TODO: Replace with API calls
import investmentsData from '@/data/investments.json'
import allocationsData from '@/data/allocations.json'

export default function InvestmentsPage() {
  // Add allocation count to each investment
  const enrichedInvestments = investmentsData.map(inv => ({
    ...inv,
    allocationCount: allocationsData.filter(a => a.investmentId === inv.id).length
  }))

  const columns = [
    {
      key: 'name',
      header: 'Investment',
      render: (inv: any) => (
        <div>
          <div className="font-medium">{inv.name}</div>
          <div className="text-xs text-text-muted">{inv.strategy}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (inv: any) => (
        <Badge variant={inv.status === 'OPEN' ? 'success' : 'default'}>
          {inv.status}
        </Badge>
      ),
    },
    {
      key: 'irr',
      header: 'IRR',
      render: (inv: any) => inv.irr ? formatPercent(inv.irr) : '-',
    },
    {
      key: 'minTicket',
      header: 'Min Ticket',
      render: (inv: any) => inv.minTicket ? formatCurrency(inv.minTicket) : '-',
    },
    {
      key: 'allocationCount',
      header: 'Allocations',
    },
  ]

  // TODO: Implement investment detail drawer
  const handleRowClick = (inv: any) => {
    console.log('TODO: Open investment drawer', inv)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Investments</h1>
        <p className="text-text-muted mt-1">Investment vehicles and funds</p>
      </div>

      <DataTable
        data={enrichedInvestments}
        columns={columns}
        onRowClick={handleRowClick}
      />

      <div className="text-xs text-text-muted">
        {/* TODO: Link investments to client allocations */}
        Click on an investment to view allocation details
      </div>
    </div>
  )
}
