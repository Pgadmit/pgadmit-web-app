"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("pgadmit_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in real app this would come from API
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        country: "Nigeria",
        profileComplete: false,
        onboardingComplete: false, // Initialize onboarding status
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("pgadmit_user", JSON.stringify(mockUser))
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
      // Simulate Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock Google user data - in real app this would come from Google OAuth
      const googleUser: User = {
        id: "google_" + Date.now().toString(),
        email: "user@gmail.com", // This would come from Google
        name: "Google User", // This would come from Google
        country: "Nigeria", // Default, user can update later
        profileComplete: false,
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
      }

      setUser(googleUser)
      localStorage.setItem("pgadmit_user", JSON.stringify(googleUser))
    } catch (error) {
      throw new Error("Google login failed")
    } finally {
      setLoading(false)
    }
  }

  const signupWithGoogle = async () => {
    setLoading(true)
    try {
      // Simulate Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock Google user data - in real app this would come from Google OAuth
      const googleUser: User = {
        id: "google_" + Date.now().toString(),
        email: "newuser@gmail.com", // This would come from Google
        name: "New Google User", // This would come from Google
        country: "Nigeria", // Default, user can update later
        profileComplete: false,
        onboardingComplete: false, // New Google users also need onboarding
        createdAt: new Date().toISOString(),
      }

      setUser(googleUser)
      localStorage.setItem("pgadmit_user", JSON.stringify(googleUser))
    } catch (error) {
      throw new Error("Google signup failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
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
