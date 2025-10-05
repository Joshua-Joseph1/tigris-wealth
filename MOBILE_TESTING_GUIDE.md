# Mobile Testing Quick Guide

## Quick Test Checklist

### 1. Visual Test (5 minutes)
```bash
npm run dev
```

Open Chrome DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M)

**Test these breakpoints:**
- [ ] 320px (iPhone SE)
- [ ] 390px (iPhone 12)
- [ ] 768px (iPad)
- [ ] 1024px (Desktop)

### 2. Navigation Test
- [ ] Click hamburger menu (mobile only)
- [ ] Navigate to each page
- [ ] Menu closes after clicking
- [ ] Sidebar visible on desktop

### 3. Touch Target Test
**All buttons should be easy to tap (44px+):**
- [ ] Menu hamburger button
- [ ] Navigation links in sidebar
- [ ] "New" button in topbar
- [ ] Search button
- [ ] Filter dropdowns
- [ ] Table/card rows

### 4. Content Test
- [ ] No horizontal scroll on any page (except Pipeline Kanban)
- [ ] All text readable without zoom
- [ ] KPI cards stack nicely on mobile
- [ ] Tables become cards on mobile
- [ ] Filters stack vertically on mobile

### 5. Form Test (Clients page)
- [ ] Search input full width on mobile
- [ ] Filter dropdowns easy to use
- [ ] Can tap and select options
- [ ] Clear button accessible

### 6. Specific Page Tests

**Overview:**
- [ ] 4 KPI cards → 1 column on mobile
- [ ] Chart still interactive
- [ ] Activity feed readable

**Clients:**
- [ ] Table → Card view on mobile
- [ ] Client name and email visible
- [ ] Can tap cards to open (console log)

**Pipeline:**
- [ ] Horizontal scroll works smoothly
- [ ] Deal cards readable
- [ ] Can tap deals

**Tasks:**
- [ ] My/Team toggle works
- [ ] Filter dropdowns accessible
- [ ] Task cards readable

## Browser Testing

### iOS Safari (iPhone)
```
Open Safari → Settings → Develop → Enable Web Inspector
Connect iPhone → Safari on Mac → Develop menu
```

### Chrome Mobile
```
chrome://inspect on desktop
Enable USB debugging on Android device
```

### Quick Desktop Test
```
Just resize browser window:
- Start at 320px width
- Slowly expand to 1440px
- Watch layout adapt at breakpoints
```

## Common Issues to Check

### ❌ Bad Signs
- Text too small to read
- Buttons hard to tap
- Horizontal scroll bar (except Pipeline)
- Content cut off
- Overlapping elements

### ✅ Good Signs
- Text readable without zoom
- Easy to tap all buttons
- Content fits viewport
- Smooth transitions
- No layout shifts

## Performance Check

**Mobile should load fast:**
```bash
npm run build
npm start

# Open Chrome DevTools
# Network tab → Slow 3G
# Should still load < 5 seconds
```

## Automated Testing Commands

```bash
# Build test
npm run build

# Should see: ✓ Compiled successfully

# Type check (if needed)
npx tsc --noEmit

# Lint check
npm run lint
```

## Report Issues

If you find mobile issues:
1. Note the device/browser
2. Note the screen width
3. Screenshot the problem
4. Describe expected vs actual behavior

## Quick Fixes Reference

**Text too small?**
```tsx
// Add responsive text sizes
className="text-sm sm:text-base"
```

**Button too small?**
```tsx
// Add minimum height
className="min-h-[44px] min-w-[44px]"
```

**Content overflowing?**
```tsx
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="lg:hidden"
```

**Need different mobile layout?**
```tsx
// Stack on mobile, row on desktop
className="flex-col sm:flex-row"
```

## Testing Matrix

| Feature | Mobile (< 768px) | Tablet (768px+) | Desktop (1024px+) |
|---------|------------------|-----------------|-------------------|
| Menu | Hamburger | Hamburger | Fixed Sidebar |
| Tables | Cards | Cards | Tables |
| Filters | Stacked | Row | Row |
| Touch | 44px+ | 44px+ | Mouse hover |

## Done Testing?

If all checks pass:
- ✅ Mobile optimization complete
- ✅ Ready for production
- ✅ No issues found

If issues found:
- 📝 Document in GitHub issue
- 🔧 Fix and retest
- ✅ Verify fix works
