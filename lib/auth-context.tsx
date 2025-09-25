"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { User as SupabaseUser } from "@supabase/supabase-js"

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
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await handleSupabaseUser(session.user)
      } else {
        // Check if we have user data in localStorage but no valid session
        const savedUser = localStorage.getItem("pgadmit_user")
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser)
            setUser(userData)
          } catch (error) {
            localStorage.removeItem("pgadmit_user")
          }
        }
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        if (session?.user) {
          await handleSupabaseUser(session.user)
        } else {
          // Clear user data on sign out or token expiration
          if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
            setUser(null)
            localStorage.removeItem("pgadmit_user")
          }
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSupabaseUser = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile from Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      // If profile doesn't exist, create it
      if (error && error.code === 'PGRST116') {
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: supabaseUser.id,
            name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email!.split('@')[0],
            country: supabaseUser.user_metadata?.country || 'India',
            avatar_url: supabaseUser.user_metadata?.avatar_url,
            picture: supabaseUser.user_metadata?.picture,
          })
          .select()
          .single()

        const userData: User = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: newProfile?.name || supabaseUser.user_metadata?.full_name || supabaseUser.email!.split('@')[0],
          country: newProfile?.country || 'India',
          fieldOfStudy: newProfile?.field_of_study,
          budget: newProfile?.budget,
          profileComplete: !!(newProfile?.field_of_study && newProfile?.budget),
          onboardingComplete: newProfile?.onboarding_complete || false,
          profileData: {
            ...newProfile,
            avatar_url: supabaseUser.user_metadata?.avatar_url,
            picture: supabaseUser.user_metadata?.picture,
          },
          createdAt: supabaseUser.created_at,
        }

        setUser(userData)
        localStorage.setItem("pgadmit_user", JSON.stringify(userData))
        return
      }

      // Profile exists, use it
      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: profile?.name || supabaseUser.user_metadata?.full_name || supabaseUser.email!.split('@')[0],
        country: profile?.country || 'India',
        fieldOfStudy: profile?.field_of_study,
        budget: profile?.budget,
        profileComplete: !!(profile?.field_of_study && profile?.budget),
        onboardingComplete: profile?.onboarding_complete || false,
        profileData: {
          ...profile,
          avatar_url: supabaseUser.user_metadata?.avatar_url,
          picture: supabaseUser.user_metadata?.picture,
        },
        createdAt: supabaseUser.created_at,
      }

      setUser(userData)
      localStorage.setItem("pgadmit_user", JSON.stringify(userData))
    } catch (error) {
      console.error('Error handling Supabase user:', error)
      // Fallback to basic user data
      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.full_name || supabaseUser.email!.split('@')[0],
        country: 'India',
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
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      // User will be handled by onAuthStateChange
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        country: userData.country,
        fieldOfStudy: userData.fieldOfStudy,
        budget: userData.budget,
        profileComplete: !!(userData.fieldOfStudy && userData.budget),
        onboardingComplete: false, // New users need onboarding
        createdAt: new Date().toISOString(),
      }

      setUser(newUser)
      localStorage.setItem("pgadmit_user", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
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
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem("pgadmit_user")
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("pgadmit_user", JSON.stringify(updatedUser))
  }

  const updateUser = async (userData: User) => {
    setUser(userData)
    localStorage.setItem("pgadmit_user", JSON.stringify(userData))
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
