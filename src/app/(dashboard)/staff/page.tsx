'use client'

import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'

// TODO: Replace with API calls
import usersData from '@/data/users.json'
import dealsData from '@/data/deals.json'
import tasksData from '@/data/tasks.json'

export default function StaffPage() {
  // Calculate active deals and capacity for each user
  const enrichedStaff = usersData.map(user => {
    const activeDeals = dealsData.filter(d =>
      d.ownerId === user.id && !['WON', 'LOST'].includes(d.stage)
    ).length

    const openTasks = tasksData.filter(t =>
      t.assigneeId === user.id && t.status !== 'DONE'
    ).length

    // Simple capacity calculation: max 20 tasks = 100%
    const capacity = Math.min(100, (openTasks / 20) * 100)

    return { ...user, activeDeals, openTasks, capacity }
  })

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (user: any) => (
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-text-muted">{user.email}</div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: any) => (
        <Badge variant={user.role === 'ADMIN' ? 'accent' : 'default'}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'activeDeals',
      header: 'Active Deals',
    },
    {
      key: 'openTasks',
      header: 'Open Tasks',
    },
    {
      key: 'capacity',
      header: 'Capacity',
      render: (user: any) => (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                user.capacity > 75 ? 'bg-danger' :
                user.capacity > 50 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${user.capacity}%` }}
            />
          </div>
          <span className="text-xs text-text-muted w-10 text-right">
            {Math.round(user.capacity)}%
          </span>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Staff</h1>
        <p className="text-text-muted mt-1">Team members and capacity</p>
      </div>

      <DataTable data={enrichedStaff} columns={columns} />

      <div className="text-xs text-text-muted">
        {/* TODO: Implement staff assignment to clients/deals */}
        Capacity is calculated based on open tasks (max 20 = 100%)
      </div>
    </div>
  )
}
