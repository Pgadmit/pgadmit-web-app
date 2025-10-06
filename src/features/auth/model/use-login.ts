import { useState } from 'react'
import { signInWithEmail, signInWithGoogle } from '../lib/auth-api'
import { handleAuthError, extractUserFromAuthResponse } from '../lib/auth-helpers'
import { useSessionActions } from '@/entities/session'
import { useUserActions } from '@/entities/user'
import { getProfile, createProfile } from '@/entities/user'
import type { LoginCredentials } from '@/shared/lib/validations/auth'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { setSession } = useSessionActions()
    const { setUser } = useUserActions()

    const login = async (credentials: LoginCredentials, onSuccess?: () => void) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signInWithEmail(credentials)

            if (result.error) {
                setError(handleAuthError(result.error))
                return
            }

            if (result.data?.session) {
                setSession(result.data.session)

                const userData = extractUserFromAuthResponse(result.data)
                if (userData) {
                    const profile = await getProfile(userData.id)
                    if (profile) {
                        setUser({ ...userData, ...profile })
                    } else {
                        await createProfile(userData.id, userData)
                        setUser(userData)
                    }
                }

                setTimeout(() => {
                    window.location.href = onSuccess ? '/dashboard' : '/dashboard'
                }, 100)
            }
        } catch (err) {
            setError(handleAuthError(err))
        } finally {
            setIsLoading(false)
        }
    }

    const loginWithGoogle = async (onSuccess?: () => void) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signInWithGoogle()

            if (result.error) {
                setError(handleAuthError(result.error))
            }
            // Note: Google login redirects, so no need to handle success here
        } catch (err) {
            setError(handleAuthError(err))
        } finally {
            setIsLoading(false)
        }
    }

    return {
        login,
        loginWithGoogle,
        isLoading,
        error,
    }
}
