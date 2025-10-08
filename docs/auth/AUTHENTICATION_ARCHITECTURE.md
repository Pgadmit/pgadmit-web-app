# 🏗️ Authentication Architecture Diagrams

## Summary
- **Purpose:** Visual representation of authentication system architecture and flows
- **Scope:** System diagrams, user flows, component relationships, data flow
- **Stack:** Mermaid diagrams, system architecture documentation
- **Status:** ✅ Completed (v1.0.0)

## System Overview

```mermaid
graph TB
    subgraph "Client Side"
        A[User Interface] --> B[Auth Context]
        B --> C[Login/Register Forms]
        B --> D[Protected Routes]
        B --> E[User Menu]
    end
    
    subgraph "Server Side"
        F[Next.js Middleware] --> G[Server Actions]
        G --> H[Supabase Client]
        H --> I[Supabase Auth]
    end
    
    subgraph "External Services"
        J[Google OAuth]
        K[Email Service]
    end
    
    A --> F
    C --> G
    D --> F
    E --> G
    H --> J
    H --> K
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as UI Component
    participant AC as Auth Context
    participant SA as Server Action
    participant SB as Supabase
    participant DB as Database
    
    U->>UI: Enter credentials
    UI->>AC: signIn(email, password)
    AC->>SA: signInWithEmail()
    SA->>SB: auth.signInWithPassword()
    SB->>DB: Validate credentials
    DB-->>SB: User data
    SB-->>SA: Session + User
    SA-->>AC: Success
    AC->>UI: Update user state
    UI->>U: Redirect to dashboard
```

## OAuth Flow (Google)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as UI Component
    participant AC as Auth Context
    participant SB as Supabase
    participant GO as Google OAuth
    participant CB as Callback Handler
    
    U->>UI: Click Google login
    UI->>AC: signInWithGoogle()
    AC->>SB: auth.signInWithOAuth()
    SB->>GO: Redirect to Google
    GO->>U: Authorization page
    U->>GO: Grant permission
    GO->>CB: Redirect with code
    CB->>SB: exchangeCodeForSession()
    SB-->>CB: Session created
    CB->>UI: Redirect to dashboard
```

## Route Protection Flow

```mermaid
flowchart TD
    A[User visits route] --> B{Is protected route?}
    B -->|No| C[Allow access]
    B -->|Yes| D{User authenticated?}
    D -->|No| E[Redirect to /login]
    D -->|Yes| F{Onboarding required?}
    F -->|No| G[Allow access]
    F -->|Yes| H{Onboarding complete?}
    H -->|No| I[Redirect to /onboarding]
    H -->|Yes| G
```

## Component Hierarchy

```mermaid
graph TD
    A[App Root] --> B[AuthProvider]
    B --> C[Layout]
    C --> D[ConditionalHeader]
    C --> E[Main Content]
    
    E --> F[Public Routes]
    E --> G[Protected Routes]
    
    F --> H[Home Page]
    F --> I[Login Page]
    
    G --> J[Dashboard]
    G --> K[Profile]
    G --> L[Settings]
    
    I --> M[LoginForm]
    I --> N[RegisterForm]
    
    M --> O[Auth Context]
    N --> O
    J --> P[ProtectedRoute]
    P --> O
```

## Data Flow

```mermaid
graph LR
    subgraph "Client State"
        A[Auth Context] --> B[User Object]
        A --> C[Loading State]
        A --> D[Error State]
    end
    
    subgraph "Server State"
        E[Supabase Session] --> F[Access Token]
        E --> G[Refresh Token]
        E --> H[User Metadata]
    end
    
    subgraph "Database"
        I[Users Table] --> J[Profile Data]
        I --> K[Onboarding Status]
        I --> L[Preferences]
    end
    
    A <--> E
    E <--> I
    B --> J
    B --> K
    B --> L
```

## Security Layers

```mermaid
graph TB
    subgraph "Client Security"
        A[Input Validation]
        B[XSS Protection]
        C[CSRF Tokens]
    end
    
    subgraph "Network Security"
        D[HTTPS Only]
        E[Secure Cookies]
        F[CORS Policy]
    end
    
    subgraph "Server Security"
        G[Session Validation]
        H[Rate Limiting]
        I[Input Sanitization]
    end
    
    subgraph "Database Security"
        J[Row Level Security]
        K[Encrypted Storage]
        L[Access Policies]
    end
    
    A --> D
    B --> E
    C --> F
    D --> G
    E --> H
    F --> I
    G --> J
    H --> K
    I --> L
```

## Error Handling Flow

```mermaid
flowchart TD
    A[Auth Operation] --> B{Success?}
    B -->|Yes| C[Update State]
    B -->|No| D[Error Type?]
    
    D --> E[Network Error]
    D --> F[Validation Error]
    D --> G[Auth Error]
    D --> H[Server Error]
    
    E --> I[Show Network Message]
    F --> J[Show Field Errors]
    G --> K[Show Auth Message]
    H --> L[Show Server Message]
    
    I --> M[Retry Option]
    J --> N[Fix Input]
    K --> O[Try Again]
    L --> P[Contact Support]
    
    C --> Q[Redirect/Continue]
    M --> A
    N --> A
    O --> A
```

## Session Management

```mermaid
stateDiagram-v2
    [*] --> Initializing: App Start
    Initializing --> Loading: Check Session
    Loading --> Authenticated: Valid Session
    Loading --> Unauthenticated: No Session
    Authenticated --> Refreshing: Token Expiry
    Refreshing --> Authenticated: Refresh Success
    Refreshing --> Unauthenticated: Refresh Failed
    Authenticated --> LoggingOut: User Logout
    LoggingOut --> Unauthenticated: Logout Complete
    Unauthenticated --> Authenticating: User Login
    Authenticating --> Authenticated: Login Success
    Authenticating --> Unauthenticated: Login Failed
```

## File Structure

```
src/
├── features/auth/                    # Authentication feature
│   ├── model/
│   │   ├── auth-context.tsx         # React Context
│   │   ├── types.ts                 # TypeScript types
│   │   └── store.ts                 # State management
│   └── ui/                          # UI components
│       ├── login-form/              # Login form
│       ├── register-form/           # Registration form
│       ├── protected-route/         # Route protection
│       └── user-menu/               # User dropdown
├── actions/auth.ts                  # Server actions
├── app/
│   ├── (auth)/                      # Auth routes
│   │   └── login/                   # Login page
│   ├── auth/
│   │   └── callback/                # OAuth callback
│   └── (protected)/                 # Protected routes
└── lib/supabase/                    # Supabase config
    ├── client.ts                    # Client config
    ├── server.ts                    # Server config
    └── middleware.ts                # Auth middleware
```

---

**Note**: These diagrams are created using Mermaid syntax and can be rendered in any Mermaid-compatible viewer or documentation platform.

---

**Author:** gmoinbong 
**Version:** 1.0.0  
**Last Updated:** 2025-10-08  
**Status:** Production-ready
