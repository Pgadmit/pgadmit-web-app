import { useSessionStore } from './store'

export const useIsAuthenticated = () => {
    return useSessionStore((state) => state.isAuthenticated)
}

export const useSession = () => {
    return useSessionStore((state) => state.session)
}

export const useAccessToken = () => {
    return useSessionStore((state) => state.session?.access_token)
}

export const useSessionLoading = () => {
    return useSessionStore((state) => state.isLoading)
}

export const useSessionActions = () => {
    const setSession = useSessionStore((state) => state.setSession)
    const clearSession = useSessionStore((state) => state.clearSession)
    const setLoading = useSessionStore((state) => state.setLoading)

    return {
        setSession,
        clearSession,
        setLoading,
    }
}