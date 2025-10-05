'use client'

import { cn } from '@/lib/utils'
import { MobileCard, MobileCardRow } from './MobileCard'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
  mobileLabel?: string
  hiddenOnMobile?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  mobileConfig?: {
    primaryField: (item: T) => React.ReactNode
    secondaryField?: (item: T) => React.ReactNode
  }
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  emptyMessage = 'No data available',
  mobileConfig,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-12 text-center text-text-muted">
        {emptyMessage}
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-elevated border-b border-border">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap',
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    'hover:bg-surface-elevated transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={cn('px-6 py-4 text-sm', column.className)}>
                      {column.render
                        ? column.render(item)
                        : String((item as any)[column.key] || '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {data.map((item) => (
          <MobileCard key={item.id} onClick={() => onRowClick?.(item)}>
            {mobileConfig ? (
              <>
                <div className="font-medium text-base mb-2">
                  {mobileConfig.primaryField(item)}
                </div>
                {mobileConfig.secondaryField && (
                  <div className="text-sm text-text-muted mb-3">
                    {mobileConfig.secondaryField(item)}
                  </div>
                )}
                <div className="space-y-2">
                  {columns
                    .filter(col => !col.hiddenOnMobile)
                    .slice(0, 4)
                    .map((column) => (
                      <MobileCardRow
                        key={column.key}
                        label={column.mobileLabel || column.header}
                        value={
                          column.render
                            ? column.render(item)
                            : String((item as any)[column.key] || '-')
                        }
                      />
                    ))}
                </div>
              </>
            ) : (
              <div className="space-y-2">
                {columns.filter(col => !col.hiddenOnMobile).map((column) => (
                  <MobileCardRow
                    key={column.key}
                    label={column.header}
                    value={
                      column.render
                        ? column.render(item)
                        : String((item as any)[column.key] || '-')
                    }
                  />
                ))}
              </div>
            )}
          </MobileCard>
        ))}
      </div>
    </>
  )
}
