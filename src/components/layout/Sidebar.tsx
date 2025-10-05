'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, TrendingUp, UserCheck, Briefcase, SquareCheck as CheckSquare, Shield, Settings, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store'

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/pipeline', label: 'Pipeline', icon: TrendingUp },
  { href: '/staff', label: 'Staff', icon: UserCheck },
  { href: '/investments', label: 'Investments', icon: Briefcase },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/compliance', label: 'Compliance', icon: Shield },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isMobileSidebarOpen, closeMobileSidebar } = useUIStore()

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen w-[280px] bg-surface-near border-r border-border flex flex-col z-50 transition-transform duration-300",
          "lg:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border">
        <div className="flex items-center">
          <Briefcase className="h-7 w-7 text-accent mr-2" />
          <span className="text-xl font-bold">InvestOps</span>
        </div>
        <button
          onClick={closeMobileSidebar}
          className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => closeMobileSidebar()}
                className={cn(
                  'flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-text-muted hover:bg-surface hover:text-text-primary'
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-text-muted">Investment Ops Dashboard v1.0</p>
      </div>
    </div>
    </>
  )
}
