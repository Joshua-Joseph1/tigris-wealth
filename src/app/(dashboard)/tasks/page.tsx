'use client'

import { useState } from 'react'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { Plus } from 'lucide-react'

// TODO: Replace with API calls
import tasksData from '@/data/tasks.json'
import usersData from '@/data/users.json'

export default function TasksPage() {
  const [view, setView] = useState<'my' | 'team'>('my')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // TODO: Replace with actual current user ID from auth
  const currentUserId = '2' // Mock current user

  // Filter tasks
  const filteredTasks = tasksData.filter(task => {
    const matchesView = view === 'team' || task.assigneeId === currentUserId
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesView && matchesStatus
  })

  // Enrich with assignee names
  const enrichedTasks = filteredTasks.map(task => ({
    ...task,
    assigneeName: usersData.find(u => u.id === task.assigneeId)?.name || 'Unassigned'
  }))

  const columns = [
    {
      key: 'title',
      header: 'Task',
      render: (task: any) => (
        <div className="max-w-md">
          <div className="font-medium">{task.title}</div>
          {task.entityType && (
            <div className="text-xs text-text-muted mt-1">
              {task.entityType}: {task.entityId}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (task: any) => (
        <Badge
          variant={
            task.priority === 'HIGH' ? 'danger' :
            task.priority === 'MED' ? 'warning' : 'default'
          }
        >
          {task.priority}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (task: any) => (
        <Badge variant={task.status === 'DONE' ? 'success' : 'accent'}>
          {task.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'assigneeName',
      header: 'Assignee',
    },
    {
      key: 'dueAt',
      header: 'Due Date',
      render: (task: any) => task.dueAt ? formatDate(task.dueAt) : '-',
    },
  ]

  // TODO: Implement task drawer with checklist
  const handleRowClick = (task: any) => {
    console.log('TODO: Open task drawer', task)
  }

  // TODO: Implement quick-add task
  const handleAddTask = () => {
    console.log('TODO: Open add task modal')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-text-muted mt-1">Manage and track your tasks</p>
        </div>

        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex bg-surface border border-border rounded-xl p-1">
          <button
            onClick={() => setView('my')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'my'
                ? 'bg-accent text-white'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            My Tasks
          </button>
          <button
            onClick={() => setView('team')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'team'
                ? 'bg-accent text-white'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Team Tasks
          </button>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-surface border border-border rounded-xl text-sm"
        >
          <option value="all">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <DataTable
        data={enrichedTasks}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
