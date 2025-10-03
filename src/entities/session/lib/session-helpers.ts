import type { Session as SupabaseSession } from '@supabase/supabase-js'
import { createClient } from '@/shared/lib/supabase'

export const getSession = async (): Promise<SupabaseSession | null> => {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const refreshSession = async (): Promise<SupabaseSession | null> => {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.refreshSession()
  return session
}

export const isSessionValid = (session: SupabaseSession | null): boolean => {
  if (!session) return false
  
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = session.expires_at || 0
  
  return expiresAt > now
}

export const isSessionExpiringSoon = (session: SupabaseSession | null, thresholdMinutes = 5): boolean => {
  if (!session) return false
  
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = session.expires_at || 0
  const thresholdSeconds = thresholdMinutes * 60
  
  return (expiresAt - now) < thresholdSeconds
}