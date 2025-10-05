'use client'

import { Search, Plus, User } from 'lucide-react'

export function Topbar() {
  // TODO: Implement command palette on search click
  const handleSearch = () => {
    console.log('TODO: Open command palette')
  }

  // TODO: Implement quick action menu
  const handleQuickAction = () => {
    console.log('TODO: Open quick action menu')
  }

  return (
    <div className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      {/* Search */}
      <button
        onClick={handleSearch}
        className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-elevated rounded-xl text-text-muted transition-colors w-96 text-left focus-visible:ring-2 ring-accent ring-offset-0 outline-none"
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Search...</span>
        <kbd className="ml-auto text-xs bg-surface-elevated px-2 py-1 rounded">⌘K</kbd>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleQuickAction}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-medium transition-colors focus-visible:ring-2 ring-accent ring-offset-2 ring-offset-background outline-none"
        >
          <Plus className="h-4 w-4" />
          New
        </button>

        {/* Avatar stub */}
        <button className="h-9 w-9 rounded-full bg-surface-elevated hover:bg-surface flex items-center justify-center transition-colors focus-visible:ring-2 ring-accent ring-offset-0 outline-none">
          <User className="h-5 w-5 text-text-muted" />
        </button>
      </div>
    </div>
  )
}
