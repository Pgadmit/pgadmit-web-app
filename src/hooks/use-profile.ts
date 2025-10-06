import { useState, useEffect, useCallback, useMemo } from 'react'
import { getProfile } from '@/entities/user/api'
import type { UserProfile } from '@/entities/user/model/types'

const PROFILE_STORAGE_KEY = 'pgadmit_user_profile'

export const useProfile = (userId: string | null) => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const memoizedUserId = useMemo(() => userId, [userId])

    useEffect(() => {
        if (!memoizedUserId) {
            setProfile(null)
            setIsLoading(false)
            setError(null)
            return
        }

        const loadProfileData = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const savedProfile = localStorage.getItem(`${PROFILE_STORAGE_KEY}_${memoizedUserId}`)
                if (savedProfile) {
                    try {
                        const parsedProfile = JSON.parse(savedProfile)
                        setProfile(parsedProfile)
                    } catch (err) {
                        console.warn('Failed to parse saved profile:', err)
                        localStorage.removeItem(`${PROFILE_STORAGE_KEY}_${memoizedUserId}`)
                    }
                }

                const profileData = await getProfile(memoizedUserId)
                setProfile(profileData)

                if (profileData) {
                    localStorage.setItem(`${PROFILE_STORAGE_KEY}_${memoizedUserId}`, JSON.stringify(profileData))
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load profile'
                setError(errorMessage)
                console.error('Error loading profile:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadProfileData()
    }, [memoizedUserId])

    const saveProfileToStorage = useCallback((profileData: UserProfile | null) => {
        if (memoizedUserId && profileData) {
            localStorage.setItem(`${PROFILE_STORAGE_KEY}_${memoizedUserId}`, JSON.stringify(profileData))
        }
    }, [memoizedUserId])

    const reloadProfile = useCallback(async () => {
        if (!memoizedUserId) return

        try {
            setIsLoading(true)
            setError(null)
            const profileData = await getProfile(memoizedUserId)
            setProfile(profileData)

            if (profileData) {
                saveProfileToStorage(profileData)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to reload profile'
            setError(errorMessage)
            console.error('Error reloading profile:', err)
        } finally {
            setIsLoading(false)
        }
    }, [memoizedUserId, saveProfileToStorage])

    const clearProfile = useCallback(() => {
        setProfile(null)
        setError(null)
        if (memoizedUserId) {
            localStorage.removeItem(`${PROFILE_STORAGE_KEY}_${memoizedUserId}`)
        }
    }, [memoizedUserId])

    return {
        profile,
        isLoading,
        error,
        reloadProfile,
        clearProfile,
        saveProfileToStorage
    }
}