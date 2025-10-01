"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { fetchUserProfile, clearCachedProfile, getCachedProfile } from "./profile-utils"

export interface User {
  id: string
  email: string
  name: string
  country: string
  fieldOfStudy?: string
  budget?: string
  profileComplete: boolean
  onboardingComplete?: boolean // Added onboarding completion tracking
  profileData?: any // Added storage for detailed profile data from onboarding
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signupWithGoogle: () => Promise<void>
  logout: () => void
  loading: boolean
  updateProfile: (data: Partial<User>) => Promise<void>
  updateUser: (userData: User) => Promise<void> // Added updateUser method for onboarding
}

interface SignupData {
  email: string
  password: string
  name: string
  country: string
  fieldOfStudy?: string
  budget?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          await handleSupabaseUser(session.user)
        } else {
          const cachedProfile = getCachedProfile()
          if (cachedProfile) {
            setUser(cachedProfile)
          } else {
            // Check if we have user data in localStorage but no valid session
            const savedUser = localStorage.getItem("pgadmit_user")
            if (savedUser) {
              try {
                const userData = JSON.parse(savedUser)
                setUser(userData)
              } catch (error) {
                console.warn("Failed to parse saved user data:", error)
                localStorage.removeItem("pgadmit_user")
              }
            }
          }
        }
      } catch (error) {
        console.error("Error getting initial session:", error)
        // Try to use cached data as fallback
        const cachedProfile = getCachedProfile()
        if (cachedProfile) {
          setUser(cachedProfile)
        }
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id)

        if (session?.user) {
          setLoading(true)
          try {
            await handleSupabaseUser(session.user)
          } catch (error) {
            console.error("Error handling auth state change:", error)
            // Try to use cached data as fallback
            const cachedProfile = getCachedProfile()
            if (cachedProfile) {
              setUser(cachedProfile)
            }
          } finally {
            setLoading(false)
          }
        } else {
          // Clear user data on sign out or token expiration
          if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
            console.log("Clearing user data due to:", event)
            setUser(null)
            localStorage.removeItem("pgadmit_user")
            clearCachedProfile()
          }
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSupabaseUser = async (supabaseUser: SupabaseUser) => {
    try {
      const userData = await fetchUserProfile(supabaseUser, supabase)

      setUser(userData)
      localStorage.setItem("pgadmit_user", JSON.stringify(userData))
    } catch (error) {
      console.error('Error handling Supabase user:', error)

      // Fallback to basic user data from Supabase user metadata
      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.full_name ||
          supabaseUser.user_metadata?.name ||
          supabaseUser.email!.split('@')[0],
        country: supabaseUser.user_metadata?.country || 'South Asia',
        profileComplete: false,
        onboardingComplete: false,
        profileData: {
          avatar_url: supabaseUser.user_metadata?.avatar_url,
          picture: supabaseUser.user_metadata?.picture,
        },
        createdAt: supabaseUser.created_at,
      }

      setUser(userData)
      localStorage.setItem("pgadmit_user", JSON.stringify(userData))
      console.log("Using fallback user data for:", userData.id)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })


      if (error) {
        console.error('Login error:', error)
        throw new Error(error.message || "Login failed")
      }

      if (data.user) {
        await handleSupabaseUser(data.user)
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
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
            country: userData.country,
            field_of_study: userData.fieldOfStudy,
            budget: userData.budget,
          }
        }
      })


      if (error) {
        console.error('Signup error:', error)
        throw new Error(error.message || "Signup failed")
      }

      // Check if user needs email confirmation
      if (data.user && !data.session) {
        throw new Error("Please check your email to confirm your account")
      }

      if (data.user && data.session) {
        await handleSupabaseUser(data.user)
      }
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      // Get the correct base URL for current environment
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${baseUrl}/auth/callback`
        }
      })

      if (error) throw error
      // User will be handled by onAuthStateChange
    } catch (error) {
      throw new Error("Google login failed")
    } finally {
      setLoading(false)
    }
  }

  const signupWithGoogle = async () => {
    // For OAuth, signup and login are the same flow
    return loginWithGoogle()
  }

  const logout = async () => {
    setLoading(true)
    try {
      console.log("Logging out user")
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error)
        throw error
      }

      setUser(null)
      localStorage.removeItem("pgadmit_user")
      clearCachedProfile()
      console.log("User logged out successfully")
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear local data
      setUser(null)
      localStorage.removeItem("pgadmit_user")
      clearCachedProfile()
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("pgadmit_user", JSON.stringify(updatedUser))

    try {
      const { setCachedProfile } = await import("./profile-utils")
      setCachedProfile(updatedUser)
    } catch (error) {
      console.warn("Failed to update cached profile:", error)
    }
  }

  const updateUser = async (userData: User) => {
    setUser(userData)
    localStorage.setItem("pgadmit_user", JSON.stringify(userData))

    try {
      const { setCachedProfile } = await import("./profile-utils")
      setCachedProfile(userData)
    } catch (error) {
      console.warn("Failed to update cached user data:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithGoogle,
        signupWithGoogle,
        logout,
        loading,
        updateProfile,
        updateUser,
      }}
    >
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
