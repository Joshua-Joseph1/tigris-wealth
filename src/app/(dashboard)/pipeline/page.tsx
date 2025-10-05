'use client'

import { useState } from 'react'
import { DealCard } from '@/components/pipeline/DealCard'

// TODO: Replace with API calls
import dealsData from '@/data/deals.json'
import clientsData from '@/data/clients.json'
import usersData from '@/data/users.json'

const STAGES = [
  { id: 'SOURCED', name: 'Sourced' },
  { id: 'CONTACTED', name: 'Contacted' },
  { id: 'MEETING', name: 'Meeting' },
  { id: 'DD', name: 'Due Diligence' },
  { id: 'IC', name: 'IC' },
  { id: 'WON', name: 'Won' },
  { id: 'LOST', name: 'Lost' },
]

export default function PipelinePage() {
  // Enrich deals with client and owner names
  const enrichedDeals = dealsData.map(deal => ({
    ...deal,
    clientName: clientsData.find(c => c.id === deal.clientId)?.name || 'Unknown',
    ownerName: usersData.find(u => u.id === deal.ownerId)?.name || 'Unknown',
  }))

  // Group deals by stage
  const dealsByStage = STAGES.map(stage => ({
    ...stage,
    deals: enrichedDeals.filter(deal => deal.stage === stage.id)
  }))

  // TODO: Implement drag and drop
  // TODO: Implement deal detail modal
  const handleDealClick = (deal: any) => {
    console.log('TODO: Open deal modal', deal)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Pipeline</h1>
        <p className="text-text-muted mt-1 text-sm sm:text-base">Track deals through your pipeline</p>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-3 sm:gap-4 min-w-max">
          {dealsByStage.map((stage) => (
            <div key={stage.id} className="w-64 sm:w-72 flex-shrink-0">
              {/* Stage Header */}
              <div className="mb-4">
                <h3 className="font-semibold text-sm">{stage.name}</h3>
                <p className="text-xs text-text-muted mt-1">
                  {stage.deals.length} {stage.deals.length === 1 ? 'deal' : 'deals'}
                </p>
              </div>

              {/* Deals */}
              <div className="space-y-3">
                {stage.deals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onClick={() => handleDealClick(deal)}
                  />
                ))}

                {stage.deals.length === 0 && (
                  <div className="bg-surface-near border border-border border-dashed rounded-xl p-4 text-center text-text-muted text-sm">
                    No deals
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-text-muted">
        {/* TODO: Implement drag & drop to move deals between stages */}
        Tip: Click on a deal to view details
      </div>
    </div>
  )
}
