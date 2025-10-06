import type { AuthError } from './types'

export const handleAuthError = (error: any): string => {
    if (typeof error === 'string') {
        return error
    }

    if (error?.message) {
        const message = error.message.toLowerCase()

        if (message.includes('invalid login credentials')) {
            return 'Invalid email or password. Please check your credentials and try again.'
        }

        if (message.includes('email not confirmed')) {
            return 'Please check your email and click the confirmation link before signing in.'
        }

        if (message.includes('user not found')) {
            return 'No account found with this email address.'
        }

        if (message.includes('password')) {
            return 'Password is too weak. Please choose a stronger password.'
        }

        if (message.includes('email')) {
            return 'Please enter a valid email address.'
        }

        if (message.includes('rate limit')) {
            return 'Too many attempts. Please wait a moment before trying again.'
        }

        if (message.includes('auth session missing')) {
            return 'No active session found. You are already signed out.'
        }

        return error.message
    }

    return 'An unexpected error occurred. Please try again.'
}

export const extractUserFromAuthResponse = (response: any) => {
    if (!response?.user) return null

    const { user } = response
    return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name ||
            user.user_metadata?.full_name ||
            user.email?.split('@')[0] || '',
        avatar_url: user.user_metadata?.avatar_url,
        onboardingComplete: user.is_completed,
        createdAt: user.created_at,
    }
}

export const isAuthError = (error: any): error is AuthError => {
    return error && typeof error === 'object' && 'message' in error
}
