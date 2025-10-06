import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session as SupabaseSession } from '@supabase/supabase-js'
import type { SessionState, SessionActions } from './types'

interface SessionStore extends SessionState, SessionActions {}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      // Initial state
      session: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setSession: (session: SupabaseSession | null) => {
        set({
          session,
          isAuthenticated: !!session,
          isLoading: false,
        })
      },

      clearSession: () => {
        set({
          session: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading })
      },
    }),
    {
      name: 'pgadmit-session-storage',
      partialize: (state) => ({
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)