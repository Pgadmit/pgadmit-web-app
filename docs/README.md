# 📚 PGAdmit Documentation

Welcome to the PGAdmit web application documentation. This comprehensive guide covers all aspects of the project, from architecture to deployment.

## Summary

- **Purpose:** Comprehensive documentation for PGAdmit university admission platform
- **Scope:** Authentication, universities management, dashboard, user onboarding
- **Stack:** Next.js 15, React 19, TypeScript, Supabase, Zustand, Tailwind CSS
- **Status:** ✅ Production-ready (v1.0.0)

## 📖 Table of Contents

- [🔗 Feature Documentation Index](#-feature-documentation-index)
- [🚀 Getting Started](#getting-started)
- [🏛️ Project Structure](#project-structure)
- [🛠️ Development Guide](#development-guide)
- [📦 Deployment](#deployment)
- [🤝 Contributing](#contributing)

## 🔗 Feature Documentation Index

| Feature             | Description                                   | Status         | Last Updated | Documentation                                    |
| ------------------- | --------------------------------------------- | -------------- | ------------ | ------------------------------------------------ |
| **Authentication**  | Login, registration, OAuth, route protection  | ✅ Completed   | 2025-10-08   | [Auth System](./auth/AUTHENTICATION.md)          |
| **Universities**    | University search, filtering, CRUD operations | 🧩 In Progress | 2025-10-08   | [Universities Guide](./features/UNIVERSITIES.md) |
| **Dashboard**       | User dashboard, metrics, analytics            | 📋 Planned     | —            | [Dashboard Guide](./features/DASHBOARD.md)       |
| **User Onboarding** | Multi-step user registration flow             | 📋 Planned     | —            | [Onboarding Guide](./features/ONBOARDING.md)     |
| **AI Chat**         | AI-powered university recommendations         | 📋 Planned     | —            | [AI Chat Guide](./features/AI_CHAT.md)           |
| **Community**       | User community features                       | 📋 Planned     | —            | [Community Guide](./features/COMMUNITY.md)       |

### 📋 Documentation Templates

- [Feature Template](./templates/feature-template.md) - Standard template for new features
- [API Template](./templates/api-template.md) - Template for API documentation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- Google OAuth credentials (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pgadmit-web-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run the development server
pnpm dev
```

### Environment Setup

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Additional services
HUBSPOT_API_KEY=your_hubspot_key
STRAPI_URL=your_strapi_url
```

## 🏛️ Project Structure

```
pgadmit-web-app/
├── 📁 docs/                          # Documentation
│   ├── AUTHENTICATION.md            # Auth system guide
│   ├── AUTHENTICATION_ARCHITECTURE.md # Auth diagrams
│   └── README.md                    # This file
├── 📁 scripts/                       # SQL scripts and utilities
│   ├── supabase-complete-setup.sql  # Complete DB setup
│   └── supabase-universities-setup.sql # Universities table
├── 📁 data/                          # Data files
│   └── 150-universites.csv          # University data
├── 📁 src/                           # Source code
│   ├── 📁 app/                       # Next.js app router
│   ├── 📁 components/                # Reusable components
│   ├── 📁 features/                  # Feature modules
│   ├── 📁 entities/                  # Business entities
│   ├── 📁 shared/                    # Shared utilities
│   └── 📁 lib/                       # Library configurations
└── 📁 public/                        # Static assets
```

### Key Directories

- **`src/features/`** - Feature-based modules (auth, universities, dashboard)
- **`src/entities/`** - Business domain entities and types
- **`src/shared/`** - Shared utilities, components, and configurations
- **`src/app/`** - Next.js 14 app router pages and layouts
- **`docs/`** - Comprehensive project documentation
- **`scripts/`** - Database setup and migration scripts
- **`data/`** - CSV files and data imports

## 🛠️ Development Guide

### Technology Stack

#### Core Framework & Language

- **Next.js 15.2.4** - React framework with App Router for server-side rendering and static generation
- **React 19** - Modern React with concurrent features and improved performance
- **TypeScript 5** - Type-safe JavaScript with strict mode enabled
- **Node.js 18+** - JavaScript runtime environment

#### Styling & UI

- **Tailwind CSS 4.1.9** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Accessible, unstyled UI primitives for building design systems
- **shadcn/ui** - Pre-built components built on Radix UI and Tailwind CSS
- **Lucide React** - Beautiful, customizable SVG icons
- **Geist Font** - Modern, clean typography
- **next-themes** - Theme switching with system preference detection

#### State Management & Data

- **Zustand 5.0.8** - Lightweight state management for complex application state
- **React Context** - Built-in state management for authentication and global state
- **React Hook Form 7.60.0** - Performant forms with easy validation
- **Zod 3.25.67** - TypeScript-first schema validation

#### Backend & Database

- **Supabase** - Backend-as-a-Service platform
  - **Supabase Auth** - Authentication and user management
  - **Supabase PostgreSQL** - Relational database with real-time subscriptions
  - **Supabase SSR** - Server-side rendering support
- **Server Actions** - Next.js server-side functions for data mutations

#### External Services & APIs

- **OpenAI 5.23.0** - AI integration for intelligent features
- **HubSpot API** - CRM integration for lead management
- **Strapi** - Headless CMS for content management

#### UI Components & Interactions

- **Radix UI Components** - Complete set of accessible UI primitives:
  - Accordion, Alert Dialog, Avatar, Checkbox, Collapsible
  - Context Menu, Dialog, Dropdown Menu, Hover Card, Label
  - Menubar, Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider, Switch, Tabs
  - Toast, Toggle, Tooltip, and more
- **Embla Carousel** - Lightweight carousel library
- **React Day Picker** - Date picker component
- **React Resizable Panels** - Resizable panel layouts
- **Vaul** - Drawer component for mobile-friendly interfaces
- **CMDK** - Command palette component
- **Input OTP** - One-time password input component

#### Data Visualization & Content

- **Recharts 2.15.4** - Composable charting library for data visualization
- **React Markdown** - Markdown rendering with React components
- **Remark GFM** - GitHub Flavored Markdown support
- **Rehype Raw & Sanitize** - HTML processing and sanitization
- **World Countries** - Country data for international features

#### Utilities & Helpers

- **clsx** - Utility for constructing className strings conditionally
- **tailwind-merge** - Merge Tailwind CSS classes without conflicts
- **class-variance-authority** - Component variant styling
- **date-fns 4.1.0** - Modern JavaScript date utility library
- **Sonner** - Toast notification system

#### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **PostCSS** - CSS processing and transformation
- **Autoprefixer** - Automatic vendor prefixing

### Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript checks
pnpm format           # Format code with Prettier

# Database
pnpm db:setup         # Setup database (if script exists)
pnpm db:migrate       # Run migrations (if script exists)
```

### Code Organization

The project follows a **Feature-Driven Development** approach:

1. **Features** (`src/features/`) - Self-contained feature modules
2. **Entities** (`src/entities/`) - Business domain models
3. **Shared** (`src/shared/`) - Reusable utilities and components
4. **App** (`src/app/`) - Next.js pages and routing

### State Management Architecture

The application uses a **hybrid state management approach** combining multiple strategies:

#### 1. Zustand Stores (`src/lib/stores/`)

- **Global Application State** - Cross-feature state management
- **Persistent State** - Data that survives page refreshes
- **Complex State Logic** - Business logic and derived state
- **Performance Critical** - High-frequency updates and subscriptions

**Example Zustand Store:**

```typescript
interface UniversityStore {
  universities: University[];
  filters: SearchFilters;
  loading: boolean;
  setUniversities: (universities: University[]) => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  searchUniversities: (query: string) => Promise<void>;
}
```

#### 2. React Context (`src/features/auth/`)

- **Authentication State** - User session and auth status
- **Theme Management** - Dark/light mode preferences
- **Global UI State** - Modals, notifications, loading states

#### 3. Local Component State

- **Form State** - React Hook Form for form management
- **UI Interactions** - Toggle states, animations, temporary data
- **Component-specific** - State that doesn't need to be shared

### Technology Integration Patterns

#### Form Management

```typescript
// React Hook Form + Zod validation
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '' },
});
```

#### State Synchronization

```typescript
// Zustand store with Supabase real-time
useEffect(() => {
  const subscription = supabase
    .channel('universities')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'universities' },
      payload => updateUniversities(payload)
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, []);
```

#### Server State Management

```typescript
// Server Actions with optimistic updates
const updateUniversity = async (id: number, data: UniversityUpdate) => {
  // Optimistic update
  setUniversities(prev => prev.map(u => (u.id === id ? { ...u, ...data } : u)));

  try {
    await updateUniversityAction(id, data);
  } catch (error) {
    // Revert on error
    setUniversities(prev => prev.map(u => (u.id === id ? originalData : u)));
  }
};
```

### Key Libraries & Their Usage

#### UI Component Libraries

**Radix UI** - The foundation of our design system

- **Accessibility First** - WCAG compliant components out of the box
- **Headless Components** - Unstyled primitives for maximum customization
- **Keyboard Navigation** - Full keyboard support for all interactions
- **Screen Reader Support** - Proper ARIA attributes and semantic HTML

**shadcn/ui** - Pre-built component library

- **Copy-Paste Components** - Own your components, customize freely
- **TypeScript Native** - Full type safety and IntelliSense support
- **Tailwind Integration** - Seamless styling with utility classes
- **Consistent API** - Unified component interface across the app

#### State Management Solutions

**Zustand** - Lightweight global state management

- **Minimal Boilerplate** - Simple API with powerful features
- **TypeScript Support** - Full type inference and safety
- **DevTools Integration** - Redux DevTools support for debugging
- **Middleware Support** - Persist, subscribe, and custom middleware

**React Hook Form** - Performant form management

- **Uncontrolled Components** - Better performance with large forms
- **Built-in Validation** - Integration with Zod, Yup, and custom validators
- **Error Handling** - Comprehensive error management and display
- **Field Arrays** - Dynamic form fields and complex form structures

#### Data & API Management

**Supabase** - Backend-as-a-Service platform

- **Real-time Subscriptions** - Live data updates across the application
- **Row Level Security** - Database-level security policies
- **Edge Functions** - Serverless functions for custom business logic
- **Storage** - File upload and management capabilities

**Zod** - Schema validation and type inference

- **Runtime Validation** - Validate data at runtime with TypeScript types
- **Form Integration** - Seamless integration with React Hook Form
- **API Validation** - Validate API responses and user input
- **Type Safety** - Generate TypeScript types from schemas

#### Styling & Theming

**Tailwind CSS** - Utility-first CSS framework

- **Responsive Design** - Mobile-first responsive utilities
- **Dark Mode** - Built-in dark mode support with next-themes
- **Custom Design System** - Consistent spacing, colors, and typography
- **Performance** - Purged CSS for optimal bundle size

**next-themes** - Theme management

- **System Preference** - Automatic theme detection
- **Persistence** - Theme preference saved across sessions
- **Smooth Transitions** - CSS transitions for theme changes
- **SSR Support** - Server-side rendering compatibility

#### Data Visualization

**Recharts** - Composable charting library

- **Responsive Charts** - Automatic responsive behavior
- **Customizable** - Highly customizable appearance and behavior
- **TypeScript Support** - Full type safety for chart configurations
- **Animation** - Smooth animations and transitions

#### Development Experience

**TypeScript** - Type-safe JavaScript

- **Strict Mode** - Maximum type safety and error prevention
- **IntelliSense** - Enhanced IDE support and autocomplete
- **Refactoring** - Safe code refactoring with type checking
- **Documentation** - Self-documenting code with type annotations

**ESLint + Prettier** - Code quality and formatting

- **Consistent Style** - Enforced coding standards across the team
- **Error Prevention** - Catch common mistakes and anti-patterns
- **Auto-formatting** - Automatic code formatting on save
- **Custom Rules** - Project-specific linting rules

### Dependencies

This project depends on the following shared utilities and external services:

#### Core Dependencies

- `lib/supabase/*` — Supabase client and server configurations
- `lib/stores/*` — Zustand state management stores
- `shared/ui/*` — Common UI components and utilities
- `shared/lib/validations.ts` — Form validation schemas
- `shared/types/*` — TypeScript type definitions

#### External Services

- **Supabase** — Backend-as-a-Service platform
- **Vercel** — Deployment and hosting platform
- **Google OAuth** — Authentication provider
- **OpenAI** — AI integration services
- **HubSpot** — CRM integration

#### Development Dependencies

- `@types/*` — TypeScript type definitions
- `eslint` — Code linting and quality assurance
- `prettier` — Code formatting
- `tailwindcss` — CSS framework
- `postcss` — CSS processing

### Authentication Development

See [Authentication Documentation](./auth/AUTHENTICATION.md) for detailed implementation guide.

### Technology Usage Examples

#### Zustand Store Implementation

```typescript
// src/lib/stores/university-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UniversityStore {
  universities: University[];
  filters: SearchFilters;
  loading: boolean;
  setUniversities: (universities: University[]) => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  searchUniversities: (query: string) => Promise<void>;
}

export const useUniversityStore = create<UniversityStore>()(
  persist(
    (set, get) => ({
      universities: [],
      filters: { query: '', country: '', type: '' },
      loading: false,

      setUniversities: universities => set({ universities }),

      updateFilters: newFilters =>
        set(state => ({
          filters: { ...state.filters, ...newFilters },
        })),

      searchUniversities: async query => {
        set({ loading: true });
        try {
          const results = await searchUniversitiesAPI(query);
          set({ universities: results, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
    }),
    { name: 'university-store' }
  )
);
```

#### Form Management with React Hook Form + Zod

```typescript
// src/features/auth/ui/login-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password)
    } catch (error) {
      form.setError('root', { message: 'Login failed' })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}
      {/* ... */}
    </form>
  )
}
```

#### Real-time Data with Supabase

```typescript
// src/hooks/use-realtime-universities.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useRealtimeUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const subscription = supabase
      .channel('universities')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'universities' },
        payload => {
          switch (payload.eventType) {
            case 'INSERT':
              setUniversities(prev => [...prev, payload.new as University]);
              break;
            case 'UPDATE':
              setUniversities(prev =>
                prev.map(u =>
                  u.id === payload.new.id ? (payload.new as University) : u
                )
              );
              break;
            case 'DELETE':
              setUniversities(prev =>
                prev.filter(u => u.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return universities;
}
```

#### Server Actions with Optimistic Updates

```typescript
// src/actions/university-actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateUniversity(id: number, data: Partial<University>) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('universities')
    .update(data)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/universities');
  return { success: true };
}

// Client-side usage with optimistic updates
export function useUpdateUniversity() {
  const updateStore = useUniversityStore(state => state.setUniversities);

  return useMutation({
    mutationFn: updateUniversity,
    onMutate: async variables => {
      // Optimistic update
      updateStore(prev =>
        prev.map(u => (u.id === variables.id ? { ...u, ...variables.data } : u))
      );
    },
    onError: (error, variables, context) => {
      // Revert on error
      // Implementation depends on your error handling strategy
    },
  });
}
```

### Database Development

1. **Setup**: Run scripts in `scripts/` directory
2. **Migrations**: Use Supabase dashboard or CLI
3. **Types**: Generate TypeScript types from schema
4. **Testing**: Use Supabase local development

## 📦 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables
3. **Build Settings**: Vercel auto-detects Next.js configuration
4. **Deploy**: Automatic deployment on push to main branch

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Or use PM2 for process management
pm2 start npm --name "pgadmit" -- start
```

### Environment Configuration

Ensure all environment variables are properly configured:

- **Development**: `.env.local`
- **Staging**: Vercel environment variables
- **Production**: Vercel environment variables

## 🔧 Configuration

### Supabase Setup

1. **Create Project**: Set up new Supabase project
2. **Authentication**: Enable email and Google OAuth
3. **Database**: Run setup scripts from `scripts/` directory
4. **Policies**: Configure Row Level Security policies
5. **Storage**: Set up file storage buckets if needed

### Google OAuth Setup

1. **Google Console**: Create OAuth 2.0 credentials
2. **Supabase Dashboard**: Add Google provider
3. **Redirect URIs**: Configure callback URLs
4. **Environment**: Add client ID and secret

## 🧪 Testing

### Test Structure

```
src/
├── __tests__/              # Test files
├── features/
│   └── auth/
│       └── __tests__/      # Feature-specific tests
└── shared/
    └── __tests__/          # Shared utility tests
```

### Running Tests

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

## 📊 Monitoring & Analytics

### Error Tracking

- **Client-side**: Console logging and error boundaries
- **Server-side**: Server action error handling
- **Database**: Supabase error logging

### Performance Monitoring

- **Core Web Vitals**: Vercel Analytics
- **Database Performance**: Supabase dashboard
- **API Performance**: Server action monitoring

## 🤝 Contributing

### Development Workflow

1. **Fork Repository**: Create your fork
2. **Create Branch**: `git checkout -b feature/your-feature`
3. **Make Changes**: Follow coding standards
4. **Test Changes**: Ensure all tests pass
5. **Submit PR**: Create pull request with description

### Coding Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Pull Request Process

1. **Description**: Clear description of changes
2. **Testing**: Include test results
3. **Documentation**: Update docs if needed
4. **Review**: Address reviewer feedback
5. **Merge**: Squash and merge when approved

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Backend-as-a-Service platform
- **Vercel** - Deployment and hosting platform
- **Next.js Team** - React framework
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework

---

**Author:** gmoinbong  
**Version:** 1.0.0  
**Last Updated:** 2025-10-08  
**Status:** Production-ready
