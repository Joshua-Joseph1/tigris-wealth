# Investment Ops Dashboard

A fully responsive, UI-only MVP Investment Operations Dashboard with mobile-first design and modern dark theme.

## Features

- **✨ Fully Mobile Responsive**: Optimized for devices from 320px to desktop
- **Dark-first UI**: Mostly black surfaces with high contrast
- **Responsive Navigation**: Hamburger menu on mobile, fixed sidebar on desktop
- **8 Dashboard Pages**:
  - Overview: KPIs, pipeline funnel, recent activity
  - Clients: Searchable table with filters
  - Pipeline: Kanban board by deal stage
  - Staff: Team capacity tracking
  - Investments: Funds with IRR metrics
  - Tasks: My tasks / team view with filters
  - Compliance: KYC/AML tracking with CSV export
  - Settings: Firm profile, API keys, email templates, roles matrix

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (mobile-first, dark theme)
- Lucide React icons
- Recharts for charts
- Zustand for UI state
- Mock JSON data (no backend)

## Mobile Optimization

✅ **Fully responsive across all devices:**
- 📱 iPhone SE (320px) to iPad Pro (1024px+)
- ✅ 44px minimum touch targets
- ✅ No horizontal scrolling (except intentional Kanban)
- ✅ Mobile-optimized data tables with card view
- ✅ Hamburger navigation menu
- ✅ Responsive filters and forms

See `MOBILE_AUDIT_REPORT.md` for comprehensive testing results.

## Quick Start

No backend required. Just install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Mock Data

All data is stored in `src/data/*.json`:
- users.json (6 staff members)
- clients.json (10 clients)
- deals.json (10 deals across pipeline stages)
- tasks.json (10 tasks)
- investments.json (5 funds)
- allocations.json (10 client allocations)
- compliance.json (10 compliance checks)
- activity.json (10 recent activities)

## Development Notes

### TODO Comments

Throughout the codebase, you'll find `// TODO:` comments marking where real integrations would go:

- **API Integration**: Data fetching from real APIs
- **Authentication**: User auth and role-based access
- **Drag & Drop**: Pipeline deal movement
- **File Uploads**: Document and logo uploads
- **Modals**: Client/deal detail drawers
- **Command Palette**: Quick actions (⌘K)

### State Management

- Zustand store in `src/lib/store.ts` handles UI-only state:
  - Mobile sidebar open/close
  - Modal open/close states
  - Filters for clients and tasks
  - Selected entity IDs

### Styling

**Mobile-First Responsive Design:**
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly 44px minimum targets
- Responsive spacing and typography

**Custom colors** defined in `tailwind.config.ts`:
- `background`: #000 (pure black)
- `surface`: #111, #141414
- `border`: #262626
- `accent`: #0EA5E9
- High contrast text with accessible focus rings

## Project Structure

```
src/
├── app/(dashboard)/       # Dashboard pages
│   ├── page.tsx          # Overview
│   ├── clients/
│   ├── pipeline/
│   ├── staff/
│   ├── investments/
│   ├── tasks/
│   ├── compliance/
│   └── settings/
├── components/
│   ├── layout/           # Sidebar (responsive), Topbar
│   ├── ui/               # KpiCard, DataTable (mobile/desktop), Badge, MobileCard
│   ├── pipeline/         # DealCard
│   └── charts/           # FunnelChart (responsive)
├── data/                 # Mock JSON data
└── lib/
    ├── store.ts          # Zustand UI state
    └── utils.ts          # Formatting helpers
```

## Next Steps

To connect to a real backend:

1. Replace JSON imports with API calls
2. Implement authentication with Clerk/Auth0
3. Add drag & drop with @dnd-kit
4. Wire up modals for create/edit operations
5. Implement file uploads for documents
6. Add toast notifications with sonner
7. Build command palette with cmdk

## Build

```bash
npm run build
```

## Testing

**Mobile Testing:**
```bash
# Test on various screen sizes
# - iPhone SE: 320px
# - iPhone 12: 390px
# - iPad: 768px
# - Desktop: 1024px+

npm run dev
# Then use browser dev tools to test responsive breakpoints
```

**Desktop Testing:**
```bash
npm run dev
# Open http://localhost:3000
```

See `MOBILE_AUDIT_REPORT.md` for detailed testing results and cross-browser compatibility.

## Documentation

- `README.md` - This file (quick start guide)
- `MOBILE_AUDIT_REPORT.md` - Comprehensive mobile optimization report
  - Issues found and solutions
  - Testing results
  - Implementation patterns
  - Future recommendations

## License

MIT
