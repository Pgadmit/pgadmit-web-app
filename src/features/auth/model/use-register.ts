import { useState } from 'react'
import { signUpWithEmail, signInWithGoogle } from '../lib/auth-api'
import { handleAuthError, extractUserFromAuthResponse } from '../lib/auth-helpers'
import { useUserActions } from '@/entities/user'
import { createProfile } from '@/entities/user'
import type { RegisterData } from '@/shared/lib/validations/auth'

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { setUser } = useUserActions()

    const register = async (data: Omit<RegisterData, 'confirmPassword'>, onSuccess?: () => void) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signUpWithEmail(data)

            if (result.error) {
                setError(handleAuthError(result.error))
                return
            }

            if (result.data?.user && result.data?.session) {
                setUser(result.data.session)

                const userData = extractUserFromAuthResponse(result.data)
                if (userData) {
                    await createProfile(userData.id, userData)
                    setUser(userData)
                }

                setTimeout(() => {
                    window.location.href = onSuccess ? '/onboarding' : '/onboarding'
                }, 100)
            } else if (result.data?.user && !result.data?.session) {
                setError('Please check your email to confirm your account before signing in.')
            }
        } catch (err) {
            setError(handleAuthError(err))
        } finally {
            setIsLoading(false)
        }
    }

    const registerWithGoogle = async (onSuccess?: () => void) => {
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
        register,
        registerWithGoogle,
        isLoading,
        error,
    }
}
