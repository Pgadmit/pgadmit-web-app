import { createClient } from '@/shared/lib/supabase'
import type { UserProfile } from '../model/types'

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
    const supabase = createClient()

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('onboarding_complete, name, avatar_url, picture')
            .eq('id', userId)
            .single()

        if (error) {
            console.warn('Error fetching profile data:', error)
            return null
        }

        return {
            id: userId,
            email: '', // Will be filled from session
            name: data?.name || '',
            avatar_url: data?.avatar_url,
            onboardingComplete: data?.onboarding_complete || false,
            createdAt: '', // Will be filled from session
        }
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}

export const updateProfile = async (userId: string, data: Partial<UserProfile>): Promise<boolean> => {
    const supabase = createClient()

    try {
        const { error } = await supabase
            .from('profiles')
            .update({
                name: data.name,
                avatar_url: data.avatar_url,
                onboarding_complete: data.onboardingComplete,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId)

        if (error) {
            console.error('Error updating profile:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error updating profile:', error)
        return false
    }
}

export const createProfile = async (userId: string, data: Partial<UserProfile>): Promise<boolean> => {
    const supabase = createClient()

    try {
        const { error } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                name: data.name,
                avatar_url: data.avatar_url,
                onboarding_complete: data.onboardingComplete || false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })

        if (error) {
            console.error('Error creating profile:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error creating profile:', error)
        return false
    }
}