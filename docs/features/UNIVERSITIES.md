# 🧩 Universities Feature Documentation

## Summary

- **Purpose:** Comprehensive university management system with search, filtering, detailed views, and user bookmarking
- **Scope:** University discovery, search, filtering, detailed information display, saved universities management
- **Stack:** Next.js 15, TypeScript, Supabase, React Context, Tailwind CSS, Lucide Icons
- **Status:** ✅ Completed (v1.0.0)

## Overview

The Universities feature provides a complete university management ecosystem including discovery, search, filtering, detailed information display, and user bookmarking functionality. This feature serves as the core data management system for the PGAdmit platform, enabling users to explore, save, and manage their university preferences.

## Architecture

```
src/features/universities/
├── model/
│   ├── types.ts              # TypeScript interfaces
│   └── store.ts              # Zustand state management
├── ui/
│   ├── university-grid.tsx   # Grid view component
│   ├── university-search.tsx # Search and filters
│   ├── university-detail.tsx # Detailed view
│   └── university-card.tsx   # Individual university card
├── lib/
│   └── hooks/
│       ├── use-get-universities.ts
│       └── use-get-university-by-id.ts
└── widgets/
    └── university-discovery/
        └── index.tsx         # Main discovery widget

src/features/saved-universities/
├── model/
│   └── saved-universities-context.tsx # React Context for saved universities
├── ui/
│   ├── save-university-button.tsx    # Reusable save button
│   ├── saved-universities-list.tsx    # List view of saved universities
│   └── saved-universities-grid.tsx    # Grid view of saved universities
└── index.ts                   # Public API exports
```

## Implementation Details

### Key Components

- **UniversityGrid** - Displays universities in a responsive grid layout with SaveUniversityButton integration
- **UniversitySearch** - Search and filtering interface with real-time results
- **UniversityDetail** - Comprehensive university information view with save functionality
- **UniversityCard** - Individual university card with hover effects and save button
- **SaveUniversityButton** - Reusable component for university bookmarking
- **SavedUniversitiesGrid** - Grid display of user's saved universities
- **SavedUniversitiesList** - List display of user's saved universities
- **UniversityDiscovery** - Main widget combining search and saved universities with tab persistence

### State Management

Uses React Context for saved universities management with the following structure:

```typescript
interface SavedUniversitiesContextType {
  // Data
  savedUniversities: SavedUniversityWithDetails[];
  savedCount: number;
  isLoading: boolean;
  isSaving: boolean;

  // Actions
  addUniversity: (universityId: number) => Promise<SavedUniversityResponse>;
  removeUniversity: (universityId: number) => Promise<SavedUniversityResponse>;
  toggleUniversity: (
    universityId: number
  ) => Promise<ToggleSavedUniversityResponse>;
  checkIsSaved: (universityId: number) => Promise<boolean>;
  refreshSavedUniversities: () => Promise<void>;
  refreshCount: () => Promise<void>;

  // Utilities
  isUniversityInSavedList: (universityId: number) => boolean;
}
```

### Data Flow

1. **Initial Load** - Fetch universities from Supabase via RPC functions
2. **Search/Filter** - Real-time filtering with debounced search
3. **Bookmarking** - Optimistic updates with database persistence
4. **Tab Persistence** - localStorage for maintaining user's active tab
5. **Real-time Sync** - Context-based state synchronization across components

## Dependencies

This feature depends on the following shared utilities and components:

- `lib/supabase/client.ts` — Supabase client for data fetching
- `lib/supabase/server.ts` — Server-side data operations
- `entities/universities/model/types.ts` — University type definitions
- `shared/api/saved-universities.ts` — API layer for saved university operations
- `shared/api/universities/api.ts` — API layer for university operations
- `useToast()` — Global toast notification hook
- `useAuth()` — Authentication context for user-specific features
- `shared/ui/*` — Common UI components (Card, Button, Badge, etc.)
- `components/ui/input` — Search input component
- `components/ui/select` — Filter dropdown components
- `components/ui/tabs` — Tab navigation components

## Flows

### University Discovery Flow

1. User visits university discovery page
2. Loads saved tab preference from localStorage
3. Displays search interface or saved universities based on active tab
4. Real-time search with instant results
5. Tab switching with state persistence

### University Search Flow

1. User enters search query
2. Debounced search triggers API call
3. Results update in real-time
4. Grid component re-renders with new data
5. Loading states and error handling

### University Detail Flow

1. User clicks on university card
2. Navigate to detail page with university ID
3. Fetch detailed university data
4. Display comprehensive information with save button
5. Enable bookmarking with real-time feedback

### Bookmarking Flow

1. User clicks save button (heart icon)
2. Optimistic UI update
3. Call Supabase RPC function to update database
4. Show success/error feedback via toast
5. Sync state across all components via Context
6. Prevent event bubbling to avoid navigation

### Saved Universities Management Flow

1. User switches to "Saved Universities" tab
2. Load saved universities from database
3. Display in grid format with same card design
4. Allow removal via save button
5. Real-time count updates

## Security & Validation

- **Input Validation:** All search queries and filters are validated
- **Authorization:** User-specific features require authentication via Supabase RLS
- **Data Protection:** Sensitive university data is properly handled
- **SQL Injection:** Supabase RPC functions provide built-in protection
- **XSS Prevention:** All user input is sanitized
- **Event Handling:** Proper event propagation control to prevent unwanted navigation

## UX Features

### Loading States

- **Skeleton Loading** - Placeholder content during data fetch
- **Progressive Loading** - Load critical data first
- **Button Loading** - Loading spinners on save buttons
- **Context Loading** - Global loading states for saved universities

### Error Handling

- **Network Errors** - Retry mechanisms and fallback UI
- **Empty States** - Helpful messages when no results found
- **Validation Errors** - Clear feedback for invalid inputs
- **Toast Notifications** - User-friendly success/error messages

### Responsiveness

- **Mobile-First** - Optimized for mobile devices
- **Tablet Layout** - Adaptive grid for tablet screens
- **Desktop** - Full-featured desktop experience
- **Touch-Friendly** - Proper touch targets for mobile

### Accessibility

- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Proper ARIA labels and semantic HTML
- **Color Contrast** - WCAG compliant color schemes
- **Focus Management** - Clear focus indicators
- **Cursor Pointers** - Visual feedback for interactive elements

### User Experience Enhancements

- **Tab Persistence** - Remembers user's active tab across sessions
- **Optimistic Updates** - Immediate UI feedback for better perceived performance
- **Consistent Design** - Same card design across all views
- **Hover Effects** - Smooth animations and transitions
- **Event Prevention** - Proper click handling to avoid unwanted navigation

## Performance

### Bundle Size

- **Code Splitting** - Lazy load university detail pages
- **Tree Shaking** - Only import used components
- **Image Optimization** - Next.js Image component for logos
- **Component Reuse** - Shared components reduce bundle size

### Rendering

- **Memoization** - React.memo for expensive components
- **Debounced Search** - Prevent excessive API calls
- **Context Optimization** - Efficient context updates
- **Virtual Scrolling** - Handle large university lists efficiently

### Data Fetching

- **Caching** - Supabase built-in caching
- **Pagination** - Load universities in chunks
- **RPC Functions** - Optimized database queries
- **Real-time** - Efficient real-time subscriptions

## Testing

### Test Types

- **Unit Tests** - Component logic and utility functions
- **Integration Tests** - API integration and state management
- **E2E Tests** - Complete user journeys
- **Context Tests** - React Context behavior testing

### Test Coverage

- **Components** - All UI components tested
- **Hooks** - Custom hooks and state management
- **API** - Data fetching and error handling
- **User Flows** - Search, filter, and bookmark flows
- **Context** - Saved universities context functionality

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
- **Bulk Operations** - Bulk save/remove operations
- **Offline Support** - Offline access to saved universities

### Monitoring

- **Search Analytics** - Track popular search terms
- **Performance Metrics** - Monitor load times and user interactions
- **Error Tracking** - Monitor and alert on errors
- **User Engagement** - Track bookmark usage and patterns

## API Reference

### Supabase RPC Functions

```sql
-- Add university to saved list
add_saved_university(university_id_param: integer)

-- Remove university from saved list
remove_saved_university(university_id_param: integer)

-- Toggle university saved status
toggle_saved_university(university_id_param: integer)

-- Get user's saved universities
get_saved_universities(limit_count: integer, offset_count: integer)

-- Check if university is saved
is_university_saved(university_id_param: integer)

-- Get saved universities count
get_saved_universities_count()
```

### Data Types

```typescript
interface University {
  id: number;
  name: string;
  country?: string;
  city?: string;
  university_type?: string;
  qs_world_ranking?: number;
  us_news_ranking?: number;
  students_total?: string;
  international_students_percent?: number;
  description?: string;
  website_url?: string;
  logo_url?: string;
}

interface SavedUniversityWithDetails {
  id: number;
  university_id: number;
  university_name: string;
  city?: string;
  country?: string;
  description?: string;
  qs_world_ranking?: number;
  us_news_ranking?: number;
  students_total?: string;
  international_students_percent?: number;
  university_type?: string;
  website_url?: string;
  logo_url?: string;
  created_at: string;
}

interface SavedUniversityResponse {
  success: boolean;
  error?: string;
  code?: string;
}

interface ToggleSavedUniversityResponse {
  success: boolean;
  action: 'added' | 'removed';
  is_saved: boolean;
  data: SavedUniversityResponse;
}
```

## Troubleshooting

### Common Problems

- **Save Button Not Working** - Check authentication status and Supabase connection
- **Search Not Working** - Check network connection and API status
- **Slow Loading** - Verify database indexes and query optimization
- **Tab Not Persisting** - Check localStorage availability and permissions
- **State Not Syncing** - Verify Context provider is properly wrapped

### Debug Tips

- **Network Tab** - Monitor API calls and responses
- **React DevTools** - Inspect Context state and component props
- **Console Logs** - Check for JavaScript errors and warnings
- **Supabase Dashboard** - Monitor RPC function calls and performance
- **localStorage** - Check saved tab preferences in browser dev tools

## Related Documentation

- [Authentication System](../auth/AUTHENTICATION.md)
- [Database Schema](../../scripts/supabase-saved-universities-setup.sql)
- [API Documentation](../../shared/api/saved-universities.ts)
- [UI Components](../../components/ui/)

---

**Author:** gmoinbong  
**Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Status:** Production-ready
