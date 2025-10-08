# 🧩 Universities Feature Documentation

## Summary
- **Purpose:** Manage university data, search, filtering, and CRUD operations
- **Scope:** University search, filtering, detailed views, bookmarking, data management
- **Stack:** Next.js 15, TypeScript, Supabase, Zustand, React Hook Form, Tailwind CSS
- **Status:** 🧩 In Progress (v0.8.0)

## Overview
The Universities feature provides comprehensive university management capabilities including search, filtering, detailed information display, and user bookmarking. This feature serves as the core data management system for the PGAdmit platform.

## Architecture

```
src/features/universities/
├── model/
│   ├── types.ts              # TypeScript interfaces
│   └── store.ts              # Zustand state management
├── ui/
│   ├── university-grid.tsx   # Grid view component
│   ├── university-search.tsx # Search and filters
│   └── university-detail.tsx # Detailed view
└── api/
    └── universities-api.ts   # API calls and data fetching
```

## Implementation Details

### Key Components
- **UniversityGrid** - Displays universities in a responsive grid layout
- **UniversitySearch** - Search and filtering interface
- **UniversityDetail** - Detailed university information view
- **UniversityCard** - Individual university card component

### State Management
Uses Zustand for global state management with the following structure:

```typescript
interface UniversityStore {
  universities: University[]
  filteredUniversities: University[]
  searchQuery: string
  filters: SearchFilters
  loading: boolean
  bookmarkedIds: Set<number>
  
  // Actions
  setUniversities: (universities: University[]) => void
  updateSearchQuery: (query: string) => void
  updateFilters: (filters: Partial<SearchFilters>) => void
  toggleBookmark: (id: number) => void
  searchUniversities: () => Promise<void>
}
```

### Data Flow
1. **Initial Load** - Fetch universities from Supabase
2. **Search/Filter** - Update store state and re-render components
3. **Bookmarking** - Update local state and persist to database
4. **Real-time Updates** - Supabase subscriptions for live data

## Dependencies

This feature depends on the following shared utilities and components:

- `lib/supabase/client.ts` — Supabase client for data fetching
- `lib/supabase/server.ts` — Server-side data operations
- `entities/universities/model/types.ts` — University type definitions
- `shared/api/universities/api.ts` — API layer for university operations
- `useToast()` — Global toast notification hook
- `useAuth()` — Authentication context for user-specific features
- `shared/ui/*` — Common UI components (Card, Button, Badge, etc.)
- `components/ui/input` — Search input component
- `components/ui/select` — Filter dropdown components
- `components/ui/dialog` — Modal dialogs for detailed views

## Flows

### University Search Flow
1. User enters search query
2. Debounced search triggers API call
3. Results update in Zustand store
4. Grid component re-renders with new data
5. Loading states and error handling

### University Detail Flow
1. User clicks on university card
2. Navigate to detail page with university ID
3. Fetch detailed university data
4. Display comprehensive information
5. Enable bookmarking and sharing

### Bookmarking Flow
1. User clicks bookmark button
2. Update local state optimistically
3. Call API to update database
4. Show success/error feedback
5. Persist state across sessions

## Security & Validation

- **Input Validation:** All search queries and filters are validated
- **Authorization:** User-specific features require authentication
- **Data Protection:** Sensitive university data is properly handled
- **SQL Injection:** Supabase provides built-in protection
- **XSS Prevention:** All user input is sanitized

## UX Features

### Loading States
- **Skeleton Loading** - Placeholder content during data fetch
- **Progressive Loading** - Load critical data first
- **Infinite Scroll** - Load more universities as user scrolls

### Error Handling
- **Network Errors** - Retry mechanisms and fallback UI
- **Empty States** - Helpful messages when no results found
- **Validation Errors** - Clear feedback for invalid inputs

### Responsiveness
- **Mobile-First** - Optimized for mobile devices
- **Tablet Layout** - Adaptive grid for tablet screens
- **Desktop** - Full-featured desktop experience

### Accessibility
- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Proper ARIA labels and semantic HTML
- **Color Contrast** - WCAG compliant color schemes
- **Focus Management** - Clear focus indicators

## Performance

### Bundle Size
- **Code Splitting** - Lazy load university detail pages
- **Tree Shaking** - Only import used components
- **Image Optimization** - Next.js Image component for logos

### Rendering
- **Virtual Scrolling** - Handle large university lists efficiently
- **Memoization** - React.memo for expensive components
- **Debounced Search** - Prevent excessive API calls

### Data Fetching
- **Caching** - Supabase built-in caching
- **Pagination** - Load universities in chunks
- **Real-time** - Efficient real-time subscriptions

## Testing

### Test Types
- **Unit Tests** - Component logic and utility functions
- **Integration Tests** - API integration and state management
- **E2E Tests** - Complete user journeys

### Test Coverage
- **Components** - All UI components tested
- **Hooks** - Custom hooks and state management
- **API** - Data fetching and error handling
- **User Flows** - Search, filter, and bookmark flows

## Maintenance

### Known Issues
- **Search Performance** - Large datasets may cause slow searches
- **Mobile UX** - Filter UI needs mobile optimization
- **Real-time Sync** - Occasional sync issues with bookmarks

### Future Enhancements
- **Advanced Filters** - More sophisticated filtering options
- **Comparison Tool** - Side-by-side university comparison
- **Recommendations** - AI-powered university suggestions
- **Export Features** - Export search results and bookmarks

### Monitoring
- **Search Analytics** - Track popular search terms
- **Performance Metrics** - Monitor load times and user interactions
- **Error Tracking** - Monitor and alert on errors

## API Reference

### Endpoints
```
GET /api/universities          - List universities with pagination
GET /api/universities/search   - Search universities
GET /api/universities/:id      - Get university details
POST /api/universities/bookmark - Bookmark university
DELETE /api/universities/bookmark/:id - Remove bookmark
```

### Data Types
```typescript
interface University {
  id: number
  name: string
  country?: string
  city?: string
  university_type?: string
  qs_world_ranking?: number
  us_news_ranking?: number
  students_total?: string
  international_students_percent?: number
  // ... other fields
}

interface SearchFilters {
  query: string
  country: string
  university_type: string
  min_ranking: number
  max_ranking: number
}
```

## Troubleshooting

### Common Problems
- **Search Not Working** - Check network connection and API status
- **Slow Loading** - Verify database indexes and query optimization
- **Bookmark Issues** - Check authentication status and permissions

### Debug Tips
- **Network Tab** - Monitor API calls and responses
- **Redux DevTools** - Inspect Zustand store state
- **Console Logs** - Check for JavaScript errors

## Related Documentation
- [Authentication System](../auth/AUTHENTICATION.md)
- [Database Schema](../../scripts/supabase-universities-setup.sql)
- [API Documentation](../../shared/api/universities/)

---

**Author:** gmoinbong  
**Version:** 0.8.0  
**Last Updated:** 2025-10-08  
**Status:** In Progress
