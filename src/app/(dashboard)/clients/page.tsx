'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Search, ListFilter as Filter } from 'lucide-react'

// TODO: Replace with API calls
import clientsData from '@/data/clients.json'
import usersData from '@/data/users.json'

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter clients
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
                         client.primaryEmail.toLowerCase().includes(search.toLowerCase())
    const matchesTier = tierFilter === 'all' || client.tier === tierFilter
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter

    return matchesSearch && matchesTier && matchesStatus
  })

  // Add owner name to clients
  const enrichedClients = filteredClients.map(client => ({
    ...client,
    ownerName: usersData.find(u => u.id === client.ownerId)?.name || 'Unknown'
  }))

  const columns = [
    {
      key: 'name',
      header: 'Client Name',
      render: (client: any) => (
        <div>
          <div className="font-medium">{client.name}</div>
          <div className="text-xs text-text-muted">{client.primaryEmail}</div>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      render: (client: any) => (
        <Badge variant={client.tier === 'A' ? 'success' : client.tier === 'B' ? 'accent' : 'default'}>
          Tier {client.tier}
        </Badge>
      ),
    },
    {
      key: 'ownerName',
      header: 'Assigned RM',
    },
    {
      key: 'aum',
      header: 'AUM',
      render: (client: any) => formatCurrency(client.aum),
    },
    {
      key: 'lastTouch',
      header: 'Last Touch',
      render: (client: any) => formatDate(client.lastTouch),
    },
    {
      key: 'status',
      header: 'Status',
      render: (client: any) => (
        <Badge variant={client.status === 'ACTIVE' ? 'success' : 'default'}>
          {client.status}
        </Badge>
      ),
    },
  ]

  // TODO: Implement client detail drawer
  const handleRowClick = (client: any) => {
    console.log('TODO: Open client drawer', client)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-text-muted mt-1">Manage your client relationships</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-sm focus-visible:ring-2 ring-accent ring-offset-0 outline-none"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-4 py-2 bg-surface border border-border rounded-xl text-sm focus-visible:ring-2 ring-accent ring-offset-0 outline-none"
        >
          <option value="all">All Tiers</option>
          <option value="A">Tier A</option>
          <option value="B">Tier B</option>
          <option value="C">Tier C</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-surface border border-border rounded-xl text-sm focus-visible:ring-2 ring-accent ring-offset-0 outline-none"
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PROSPECT">Prospect</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <DataTable
        data={enrichedClients}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
