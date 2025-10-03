import { createBrowserClient } from "@supabase/ssr"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { fetchWithRetry } from "./retry-utils"
import { connectionMonitor } from "./connection-monitor"
import type { UserProfile, CachedProfile, UserOnboarding } from "@/types"

const PROFILE_CACHE_KEY = "pgadmit_profile_cache"
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function getCachedProfile(): UserProfile | null {
  try {
    const cached = localStorage.getItem(PROFILE_CACHE_KEY)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached) as CachedProfile

    // Check if cache is still valid
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(PROFILE_CACHE_KEY)
      return null
    }

    return data
  } catch (error) {
    console.warn("Failed to get cached profile:", error)
    localStorage.removeItem(PROFILE_CACHE_KEY)
    return null
  }
}

export function setCachedProfile(profile: UserProfile): void {
  try {
    const cached: CachedProfile = {
      data: profile,
      timestamp: Date.now(),
      version: "1.0"
    }
    localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(cached))
  } catch (error) {
    console.warn("Failed to cache profile:", error)
  }
}

export function clearCachedProfile(): void {
  localStorage.removeItem(PROFILE_CACHE_KEY)
}

export async function fetchUserProfile(
  supabaseUser: SupabaseUser,
  supabase: ReturnType<typeof createBrowserClient>
): Promise<UserProfile> {
  // Check connection status
  if (!connectionMonitor.isOnline()) {
    console.warn("No internet connection, using cached profile if available")
    const cached = getCachedProfile()
    if (cached && cached.id === supabaseUser.id) {
      return cached
    }
    throw new Error("No internet connection and no cached profile available")
  }

  // Try to get from cache first
  const cached = getCachedProfile()
  if (cached && cached.id === supabaseUser.id) {
    return cached
  }

  try {
    const { data: profileData, error: profileError } = await fetchWithRetry(async () => {
      const result = await supabase
        .from('profiles')
        .select('onboarding_complete, name, avatar_url, picture')
        .eq('id', supabaseUser.id)
        .single()

      if (result.error) throw result.error
      return result
    })

    if (profileError) {
      console.warn("Error fetching profile data:", profileError)
    }

    const userProfile: UserProfile = {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: profileData?.name ||
        supabaseUser.user_metadata?.full_name ||
        supabaseUser.user_metadata?.name ||
        supabaseUser.email!.split('@')[0],
      avatar_url: profileData?.avatar_url || supabaseUser.user_metadata?.avatar_url,
      onboardingComplete: profileData?.onboarding_complete || false,
      createdAt: supabaseUser.created_at,
    }

    setCachedProfile(userProfile)
    return userProfile

  } catch (error) {
    console.error("Error creating user profile:", error)

    const fallbackProfile: UserProfile = {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: supabaseUser.user_metadata?.full_name ||
        supabaseUser.user_metadata?.name ||
        supabaseUser.email!.split('@')[0],
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      onboardingComplete: false,
      createdAt: supabaseUser.created_at,
    }

    setCachedProfile(fallbackProfile)
    return fallbackProfile
  }
}

  export async function fetchUserOnboarding(
  userId: string,
  supabase: ReturnType<typeof createBrowserClient>
): Promise<UserOnboarding | null> {
  try {
    const { data, error } = await fetchWithRetry(async () => {
      const result = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('id', userId)
        .single()

      if (result.error) throw result.error
      return result
    })

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      console.error("Error fetching user onboarding:", error)
      return null
    }

    return data as UserOnboarding
  } catch (error) {

    if (error && typeof error === 'object' && 'code' in error && error.code === 'PGRST116') {
      return null
    }
    console.error("Error fetching user onboarding:", error)
    return null
  }
}

export async function saveUserOnboarding(
  userId: string,
  onboardingData: Partial<UserOnboarding>,
  supabase: ReturnType<typeof createBrowserClient>
): Promise<UserOnboarding | null> {
  try {
    const { data, error } = await fetchWithRetry(async () => {
      const result = await supabase
        .from('user_onboarding')
        .upsert({
          id: userId,
          ...onboardingData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (result.error) throw result.error
      return result
    })

    if (error) {
      console.error("Error saving user onboarding:", error)
      return null
    }

    return data as UserOnboarding
  } catch (error) {
    console.error("Error saving user onboarding:", error)
    return null
  }
}

export async function checkOnboardingStatus(
  userId: string,
  supabase: ReturnType<typeof createBrowserClient>
): Promise<boolean> {
  try {
    const { data, error } = await fetchWithRetry(async () => {
      const result = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', userId)
        .single()

      if (result.error) throw result.error
      return result
    })

    if (error) {
      console.error("Error checking onboarding status:", error)
      return false
    }

    return data?.onboarding_complete || false
  } catch (error) {
    console.error("Error checking onboarding status:", error)
    return false
  }
}

export async function updateOnboardingCompletion(
  userId: string,
  isCompleted: boolean,
  supabase: ReturnType<typeof createBrowserClient>
): Promise<boolean> {
  try {
    const { error } = await fetchWithRetry(async () => {
      const result = await supabase
        .from('profiles')
        .update({
          onboarding_complete: isCompleted,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (result.error) throw result.error
      return result
    })

    if (error) {
      console.error("Error updating onboarding completion:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error updating onboarding completion:", error)
    return false
  }
}