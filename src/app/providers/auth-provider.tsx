"use client"

import { useAuthState } from '@/features/auth'

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    // This hook handles all auth state synchronization
    useAuthState()

    return <>{children}</>
}
