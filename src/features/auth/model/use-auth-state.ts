import { useEffect, useCallback } from 'react'
import { createClient } from '@/shared/lib/supabase'
import { useUserActions } from '@/entities/user'
import { getProfile, createProfile } from '@/entities/user'

export const useAuthState = () => {
    const { setLoading } = useUserActions()
    const { setUser, clearUser } = useUserActions()

    const handleAuthStateChange = useCallback(async (event: string, session: any) => {
        if (event === 'SIGNED_OUT') {
            clearUser()
            setLoading(false)
            return
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
                setUser(session)

                const userData = {
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.name ||
                        session.user.user_metadata?.full_name ||
                        session.user.email?.split('@')[0] || '',
                    avatar_url: session.user.user_metadata?.avatar_url,
                    onboardingComplete: false,
                    createdAt: session.user.created_at,
                }

                try {
                    const profile = await getProfile(userData.id)
                    if (profile) {
                        const finalUserData = {
                            ...userData,
                            name: profile.name || userData.name,
                            avatar_url: profile.avatar_url || userData.avatar_url,
                            onboardingComplete: profile.onboardingComplete || userData.onboardingComplete,
                        }
                        setUser(finalUserData)
                    } else {
                        await createProfile(userData.id, userData)
                        setUser(userData)
                    }
                } catch (error) {
                    console.error('Error handling user data:', error)
                    setUser(userData)
                }

                setTimeout(() => {
                    setLoading(false)
                }, 50)
            }
        }
    }, [setUser, clearUser, setLoading])

    useEffect(() => {
        let isMounted = true

        // Get initial session
        const getInitialSession = async () => {
            try {
                setLoading(true)
                const supabase = createClient()
                const { data: { session } } = await supabase.auth.getSession()
                if (isMounted && session?.user) {
                    await handleAuthStateChange('SIGNED_IN', session)
                } else if (isMounted) {
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error getting initial session:', error)
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        getInitialSession()

        const supabase = createClient()
        const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange)

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [handleAuthStateChange, setLoading])
}
