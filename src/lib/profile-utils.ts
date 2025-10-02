import { createBrowserClient } from "@supabase/ssr"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { fetchWithRetry } from "./retry-utils"
import { connectionMonitor } from "./connection-monitor"

export interface Profile {
  id: string
  name: string
  country: string
  field_of_study?: string
  budget?: string
  avatar_url?: string
  picture?: string
  onboarding_complete?: boolean
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  country: string
  fieldOfStudy?: string
  budget?: string
  profileComplete: boolean
  onboardingComplete?: boolean
  profileData?: any
  createdAt: string
}

const PROFILE_CACHE_KEY = "pgadmit_profile_cache"
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

interface CachedProfile {
  data: UserProfile
  timestamp: number
  version: string
}

export function getCachedProfile(): UserProfile | null {
  try {
    const cached = localStorage.getItem(PROFILE_CACHE_KEY)
    if (!cached) return null

    const { data, timestamp, version }: CachedProfile = JSON.parse(cached)

    // Check if cache is still valid
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(PROFILE_CACHE_KEY)
      return null
    }

    // Check if version matches (for cache invalidation)
    if (version !== "1.0") {
      localStorage.removeItem(PROFILE_CACHE_KEY)
      return null
    }

    return data
  } catch (error) {
    console.warn("Failed to read cached profile:", error)
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
    // Fetch profile with retry logic
    const { data: profile, error } = await fetchWithRetry(async () => {
      const result = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (result.error) throw result.error
      return result
    })

    // If profile doesn't exist, create it
    if (error && error.code === 'PGRST116') {

      const { data: newProfile, error: createError } = await fetchWithRetry(async () => {
        const result = await supabase
          .from('profiles')
          .insert({
            id: supabaseUser.id,
            name: supabaseUser.user_metadata?.full_name ||
              supabaseUser.user_metadata?.name ||
              supabaseUser.email!.split('@')[0],
            country: supabaseUser.user_metadata?.country || 'South Asia',
            avatar_url: supabaseUser.user_metadata?.avatar_url,
            picture: supabaseUser.user_metadata?.picture,
          })
          .select()
          .single()

        if (result.error) throw result.error
        return result
      })

      if (createError) {
        console.error("Failed to create profile:", createError)
        throw createError
      }

      const userProfile = mapProfileToUser(newProfile, supabaseUser)
      setCachedProfile(userProfile)
      return userProfile
    }

    if (error) {
      console.error("Failed to fetch profile:", error)
      throw error
    }

    const userProfile = mapProfileToUser(profile, supabaseUser)
    setCachedProfile(userProfile)
    return userProfile

  } catch (error) {
    console.error("Error fetching user profile:", error)

    // Fallback to basic user data from Supabase user
    const fallbackProfile: UserProfile = {
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

    // Cache the fallback profile for a shorter duration
    try {
      const cached: CachedProfile = {
        data: fallbackProfile,
        timestamp: Date.now(),
        version: "1.0"
      }
      localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(cached))
    } catch (cacheError) {
      console.warn("Failed to cache fallback profile:", cacheError)
    }

    return fallbackProfile
  }
}

function mapProfileToUser(profile: Profile, supabaseUser: SupabaseUser): UserProfile {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email!,
    name: profile?.name ||
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.email!.split('@')[0],
    country: profile?.country || 'South Asia',
    fieldOfStudy: profile?.field_of_study,
    budget: profile?.budget,
    profileComplete: !!(profile?.field_of_study && profile?.budget),
    onboardingComplete: profile?.onboarding_complete ?? false,
    profileData: {
      ...profile,
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      picture: supabaseUser.user_metadata?.picture,
    },
    createdAt: supabaseUser.created_at,
  }
}
