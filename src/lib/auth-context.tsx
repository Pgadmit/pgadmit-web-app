"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { fetchUserProfile, clearCachedProfile, getCachedProfile, setCachedProfile } from "./profile-utils"
import { useAuthLoading } from "./loading-context"
import { clearAllStores } from "./stores/clear-all-stores"
import type { SignupData, User } from "@/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signupWithGoogle: () => Promise<void>
  logout: () => void
  loading: boolean
  updateProfile: (data: Partial<User>) => Promise<void>
  updateUser: (userData: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { loading, setLoading } = useAuthLoading()
  const supabase = createClient()

  const updateUserState = (userData: User | null) => {
    if (user && !userData) {
      clearAllStores()
    }

    setUser(userData)
    if (userData) {
      setCachedProfile(userData)
    } else {
      clearCachedProfile()
    }
  }

  const handleSupabaseUser = useCallback(async (supabaseUser: SupabaseUser): Promise<User> => {
    try {
      const userData = await fetchUserProfile(supabaseUser, supabase)
      return userData
    } catch (error) {
      console.error('Error fetching profile:', error)
      return {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.full_name ||
          supabaseUser.user_metadata?.name ||
          supabaseUser.email!.split('@')[0],
        onboardingComplete: false,
        avatar_url: supabaseUser.user_metadata?.avatar_url,
        createdAt: supabaseUser.created_at,
      }
    }
  }, [])

  const syncOnboarding = useCallback(async (userData: User) => {
    try {
      const { syncOnboardingData } = await import("./auth-sync")
      const syncedUserData = await syncOnboardingData(userData)
      if (syncedUserData && syncedUserData.id !== userData.id) {
        updateUserState(syncedUserData)
      }
    } catch (error) {
      console.error('Error syncing onboarding:', error)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    let authChangeTimeout: NodeJS.Timeout | null = null

    const initAuth = async () => {
      try {
        const cached = getCachedProfile()
        if (cached && isMounted) {
          setUser(cached)
          setLoading(false)
          return
        }

        const { data: { session } } = await supabase.auth.getSession()

        if (!isMounted) return

        if (session?.user) {
          const userData = await handleSupabaseUser(session.user)
          updateUserState(userData)
          await syncOnboarding(userData)
        } else if (!cached) {
          updateUserState(null)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initAuth()

    const handleAuthStateChange = async (event: string, session: any) => {
      if (!isMounted) return

      if (authChangeTimeout) {
        clearTimeout(authChangeTimeout)
      }

      if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        return
      }


      authChangeTimeout = setTimeout(async () => {
        if (!isMounted) return

        if (event === 'SIGNED_OUT') {
          updateUserState(null)
          setLoading(false)
          return
        }

        if (session?.user) {
          const currentUser = getCachedProfile()
          if (!currentUser || currentUser.id !== session.user.id) {
            setLoading(true)
          }

          try {
            const userData = await handleSupabaseUser(session.user)
            updateUserState(userData)
            await syncOnboarding(userData)
          } catch (error) {
            console.error("Auth state change error:", error)
          } finally {
            if (isMounted) {
              setLoading(false)
            }
          }
        } else {
          updateUserState(null)
          setLoading(false)
        }
      }, 100)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange)

    return () => {
      isMounted = false
      if (authChangeTimeout) {
        clearTimeout(authChangeTimeout)
      }
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw new Error(error.message || "Login failed")

      if (data.user) {
        const userData = await handleSupabaseUser(data.user)
        updateUserState(userData)
        await syncOnboarding(userData)
      }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            avatar_url: userData.avatar_url,
          }
        }
      })

      if (error) throw new Error(error.message || "Signup failed")
      if (data.user && !data.session) {
        throw new Error("Please check your email to confirm your account")
      }

      if (data.user && data.session) {
        const newUser = await handleSupabaseUser(data.user)
        updateUserState(newUser)
        await syncOnboarding(newUser)
      }
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    const redirectUrl = `${window.location.origin}/auth/callback`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl }
    })
    if (error) throw new Error("Google login failed")
  }

  const signupWithGoogle = loginWithGoogle

  const logout = async () => {
    try {
      clearAllStores()

      await supabase.auth.signOut()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      updateUserState(null)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...data }
    updateUserState(updatedUser)
  }

  const updateUser = (userData: User) => {
    updateUserState(userData)
  }

  const contextValue = useMemo(() => ({
    user,
    login,
    signup,
    loginWithGoogle,
    signupWithGoogle,
    logout,
    loading,
    updateProfile,
    updateUser,
  }), [user, loading])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}