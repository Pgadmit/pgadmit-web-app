import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '../lib/auth-api'
import { handleAuthError } from '../lib/auth-helpers'
import { useSessionActions } from '@/entities/session'
import { useUserActions } from '@/entities/user'

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const { clearSession } = useSessionActions()
    const { clearUser } = useUserActions()

    const logout = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signOut()

            if (result.error) {
                setError(handleAuthError(result.error))
                return
            }

            clearSession()
            clearUser()

            router.push('/')
        } catch (err) {
            setError(handleAuthError(err))
        } finally {
            setIsLoading(false)
        }
    }

    return {
        logout,
        isLoading,
        error,
    }
}
