"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUpWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const supabase = supabaseBrowser()
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          setUser(null)
          setLoading(false)
          return
        }
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
            avatar_url: session.user.user_metadata?.avatar_url,
            onboardingComplete: session.user.user_metadata?.onboarding_complete || undefined,
            createdAt: session.user.created_at,
          })
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Unexpected error in getInitialSession:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    const supabase = supabaseBrowser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
            avatar_url: session.user.user_metadata?.avatar_url,
            onboardingComplete: session.user.user_metadata?.onboarding_complete || false,
            createdAt: session.user.created_at,
          })
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        } else if (event === 'TOKEN_REFRESHED' && !session) {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const supabase = supabaseBrowser()

    try {
      await supabase.auth.signOut()
      setUser(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('SignIn error:', error.message)
        setUser(null)
        throw error
      }

      if (!data.session || !data.user) {
        console.error('No session or user returned')
        setUser(null)
        throw new Error('Authentication failed')
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError ?? !session) {
        console.error('Session validation failed:', sessionError)
        await supabase.auth.signOut()
        setUser(null)
        throw new Error('Session validation failed')
      }

      setUser({
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.full_name || data.user.email!.split('@')[0],
        avatar_url: data.user.user_metadata?.avatar_url,
        onboardingComplete: data.user.user_metadata?.onboarding_complete || false,
        createdAt: data.user.created_at,
      })
    } catch (err) {
      setUser(null)
      await supabase.auth.signOut().catch(() => { })
      throw err
    }
  }

  const signUp = async (email: string, password: string) => {
    const supabase = supabaseBrowser()

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (!data.user) {
        throw new Error('Registration failed')
      }

    } catch (err) {
      throw err
    }
  }

  const signOut = async () => {
    const supabase = supabaseBrowser()

    try {
      // Check if there's an active session before attempting to sign out
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // No active session, just clear user state
        setUser(null)
        return
      }

      setUser(null)

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('SignOut error:', error)
        // Don't throw error for session missing - user is already signed out
        if (error.message?.toLowerCase().includes('auth session missing')) {
          return
        }
        throw error
      }
    } catch (err) {
      setUser(null)
      // Don't throw error for session missing - user is already signed out
      if (err instanceof Error && err.message?.toLowerCase().includes('auth session missing')) {
        return
      }
      throw err
    }
  }

  const signInWithGoogle = async () => {
    const supabase = supabaseBrowser()

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) {
        throw error
      }
    } catch (err) {
      console.error('Google sign in error:', err)
      throw err
    }
  }

  const signUpWithGoogle = async () => {
    return signInWithGoogle()
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      signUpWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
