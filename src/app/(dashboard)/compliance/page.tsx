'use client'

import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { Download } from 'lucide-react'

// TODO: Replace with API calls
import complianceData from '@/data/compliance.json'
import clientsData from '@/data/clients.json'

export default function CompliancePage() {
  // Enrich compliance data with client names
  const enrichedCompliance = complianceData.map(comp => ({
    ...comp,
    clientName: clientsData.find(c => c.id === comp.clientId)?.name || 'Unknown'
  }))

  const columns = [
    {
      key: 'clientName',
      header: 'Client',
    },
    {
      key: 'type',
      header: 'Type',
      render: (comp: any) => (
        <Badge variant="default">
          {comp.type.replace(/_/g, ' ')}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (comp: any) => (
        <Badge
          variant={
            comp.status === 'PASS' ? 'success' :
            comp.status === 'FAIL' ? 'danger' : 'warning'
          }
        >
          {comp.status}
        </Badge>
      ),
    },
    {
      key: 'checkedAt',
      header: 'Checked Date',
      render: (comp: any) => comp.checkedAt ? formatDate(comp.checkedAt) : '-',
    },
    {
      key: 'fileUrl',
      header: 'Document',
      render: (comp: any) => comp.fileUrl ? (
        <a
          href={comp.fileUrl}
          onClick={(e) => {
            e.stopPropagation()
            // TODO: Implement actual file download
            console.log('TODO: Download file', comp.fileUrl)
          }}
          className="text-accent hover:underline text-sm"
        >
          View
        </a>
      ) : (
        <span className="text-text-muted text-sm">-</span>
      ),
    },
  ]

  // TODO: Implement CSV export with actual filtered data
  const handleExport = () => {
    console.log('TODO: Export compliance data as CSV')

    // Mock CSV generation
    const csv = [
      'Client,Type,Status,Checked Date,File',
      ...enrichedCompliance.map(c =>
        `${c.clientName},${c.type},${c.status},${c.checkedAt || ''},${c.fileUrl || ''}`
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'compliance-export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance</h1>
          <p className="text-text-muted mt-1">KYC, AML, and compliance tracking</p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-elevated border border-border text-text-primary rounded-xl text-sm font-medium transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <DataTable data={enrichedCompliance} columns={columns} />

      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="font-semibold mb-2">Compliance Summary</h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-2xl font-bold text-success">
              {enrichedCompliance.filter(c => c.status === 'PASS').length}
            </p>
            <p className="text-sm text-text-muted">Passed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">
              {enrichedCompliance.filter(c => c.status === 'PENDING').length}
            </p>
            <p className="text-sm text-text-muted">Pending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-danger">
              {enrichedCompliance.filter(c => c.status === 'FAIL').length}
            </p>
            <p className="text-sm text-text-muted">Failed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
