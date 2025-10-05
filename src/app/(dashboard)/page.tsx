import { DollarSign, Users, TrendingUp, SquareCheck as CheckSquare } from 'lucide-react'
import { KpiCard } from '@/components/ui/KpiCard'
import { FunnelChart } from '@/components/charts/FunnelChart'
import { formatCurrency, formatDate } from '@/lib/utils'

// TODO: Replace with API calls
import clientsData from '@/data/clients.json'
import dealsData from '@/data/deals.json'
import tasksData from '@/data/tasks.json'
import activityData from '@/data/activity.json'
import usersData from '@/data/users.json'

export default function OverviewPage() {
  // Calculate KPIs from mock data
  const totalAUM = clientsData.reduce((sum, client) => sum + client.aum, 0)
  const activeClients = clientsData.filter(c => c.status === 'ACTIVE').length
  const openDeals = dealsData.filter(d => !['WON', 'LOST'].includes(d.stage)).length

  const today = new Date().toISOString().split('T')[0]
  const tasksDueToday = tasksData.filter(t =>
    t.status !== 'DONE' && t.dueAt <= today
  ).length

  // Pipeline funnel data
  const stages = ['SOURCED', 'CONTACTED', 'MEETING', 'DD', 'IC', 'WON', 'LOST']
  const pipelineData = stages.map(stage => ({
    stage,
    count: dealsData.filter(d => d.stage === stage).length
  }))

  // Recent activity with user names
  const recentActivity = activityData.slice(0, 8).map(activity => {
    const user = usersData.find(u => u.id === activity.actorId)
    return { ...activity, userName: user?.name || 'Unknown' }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-text-muted mt-1">Welcome back to Investment Ops</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Assets Under Management"
          value={formatCurrency(totalAUM)}
          icon={DollarSign}
        />
        <KpiCard
          title="Active Clients"
          value={activeClients}
          icon={Users}
        />
        <KpiCard
          title="Open Deals"
          value={openDeals}
          icon={TrendingUp}
        />
        <KpiCard
          title="Tasks Due Today"
          value={tasksDueToday}
          icon={CheckSquare}
        />
      </div>

      {/* Pipeline & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Pipeline by Stage</h2>
          <FunnelChart data={pipelineData} />
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.userName}</span>{' '}
                    <span className="text-text-muted">{activity.action}</span>
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {formatDate(activity.createdAt.split('T')[0])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
