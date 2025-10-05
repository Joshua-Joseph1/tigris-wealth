import { create } from 'zustand'

interface UIStore {
  // Mobile
  isMobileSidebarOpen: boolean
  openMobileSidebar: () => void
  closeMobileSidebar: () => void

  // Modals
  isClientModalOpen: boolean
  isDealModalOpen: boolean
  isTaskModalOpen: boolean
  selectedClientId: string | null
  selectedDealId: string | null

  // Filters
  clientFilters: {
    tier: string | null
    status: string | null
    rm: string | null
    search: string
  }
  taskFilters: {
    view: 'my' | 'team'
    status: string | null
    assignee: string | null
  }

  // Actions
  openClientModal: (clientId?: string) => void
  closeClientModal: () => void
  openDealModal: (dealId?: string) => void
  closeDealModal: () => void
  openTaskModal: () => void
  closeTaskModal: () => void
  setClientFilters: (filters: Partial<UIStore['clientFilters']>) => void
  setTaskFilters: (filters: Partial<UIStore['taskFilters']>) => void
  resetFilters: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileSidebarOpen: false,
  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),

  isClientModalOpen: false,
  isDealModalOpen: false,
  isTaskModalOpen: false,
  selectedClientId: null,
  selectedDealId: null,

  clientFilters: {
    tier: null,
    status: null,
    rm: null,
    search: '',
  },

  taskFilters: {
    view: 'my',
    status: null,
    assignee: null,
  },

  openClientModal: (clientId) => set({ isClientModalOpen: true, selectedClientId: clientId || null }),
  closeClientModal: () => set({ isClientModalOpen: false, selectedClientId: null }),
  openDealModal: (dealId) => set({ isDealModalOpen: true, selectedDealId: dealId || null }),
  closeDealModal: () => set({ isDealModalOpen: false, selectedDealId: null }),
  openTaskModal: () => set({ isTaskModalOpen: true }),
  closeTaskModal: () => set({ isTaskModalOpen: false }),

  setClientFilters: (filters) => set((state) => ({
    clientFilters: { ...state.clientFilters, ...filters }
  })),

  setTaskFilters: (filters) => set((state) => ({
    taskFilters: { ...state.taskFilters, ...filters }
  })),

  resetFilters: () => set({
    clientFilters: { tier: null, status: null, rm: null, search: '' },
    taskFilters: { view: 'my', status: null, assignee: null },
  }),
}))
