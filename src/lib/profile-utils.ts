import { createBrowserClient } from "@supabase/ssr"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { fetchWithRetry } from "./retry-utils"
import { connectionMonitor } from "./connection-monitor"
import type { UserProfile, UserOnboarding } from "@/types"


export async function fetchUserProfile(
  supabaseUser: SupabaseUser,
  supabase: ReturnType<typeof createBrowserClient>
): Promise<UserProfile> {
  if (!connectionMonitor.isOnline()) {
    console.warn("No internet connection, using cached profile if available")
    throw new Error("No internet connection and no cached profile available")
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
      onboardingComplete: profileData?.onboardingComplete || supabaseUser.onboarding_complete,
      createdAt: supabaseUser.created_at,
    }
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
      onboardingComplete: supabaseUser.onboarding_complete,
      createdAt: supabaseUser.created_at,
    }

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