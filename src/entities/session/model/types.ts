import type { Session as SupabaseSession } from '@supabase/supabase-js'

export interface SessionState {
  session: SupabaseSession | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface Session {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number
  token_type: string
  user: {
    id: string
    email?: string
    user_metadata?: Record<string, any>
  }
}

export interface SessionActions {
  setSession: (session: SupabaseSession | null) => void
  clearSession: () => void
  setLoading: (isLoading: boolean) => void
}