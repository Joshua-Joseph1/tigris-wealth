'use client'

import { Search, Plus, User, Menu } from 'lucide-react'
import { useUIStore } from '@/lib/store'

export function Topbar() {
  const { openMobileSidebar } = useUIStore()

  // TODO: Implement command palette on search click
  const handleSearch = () => {
    console.log('TODO: Open command palette')
  }

  // TODO: Implement quick action menu
  const handleQuickAction = () => {
    console.log('TODO: Open quick action menu')
  }

  return (
    <div className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={openMobileSidebar}
        className="lg:hidden p-2 hover:bg-surface rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <button
        onClick={handleSearch}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-elevated rounded-xl text-text-muted transition-colors w-full max-w-md text-left focus-visible:ring-2 ring-accent ring-offset-0 outline-none min-h-[44px]"
      >
        <Search className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm">Search...</span>
        <kbd className="ml-auto text-xs bg-surface-elevated px-2 py-1 rounded hidden lg:inline">⌘K</kbd>
      </button>

      {/* Mobile Search Icon */}
      <button
        onClick={handleSearch}
        className="md:hidden p-2 hover:bg-surface rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={handleQuickAction}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-medium transition-colors focus-visible:ring-2 ring-accent ring-offset-2 ring-offset-background outline-none min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Avatar stub */}
        <button className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-surface-elevated hover:bg-surface flex items-center justify-center transition-colors focus-visible:ring-2 ring-accent ring-offset-0 outline-none">
          <User className="h-5 w-5 text-text-muted" />
        </button>
      </div>
    </div>
  )
}
