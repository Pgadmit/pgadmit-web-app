import { createClient } from '@/shared/lib/supabase'
import type { LoginCredentials, RegisterData } from '@/shared/lib/validations/auth'
import type { AuthResult } from './types'

export const signInWithEmail = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        })

        if (error) {
            return {
                data: null,
                error: {
                    message: error.message,
                    code: error.status?.toString(),
                },
            }
        }

        return {
            data,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
        }
    }
}

export const signUpWithEmail = async (data: Omit<RegisterData, 'confirmPassword'>): Promise<AuthResult> => {
    try {
        const supabase = createClient()
        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name,
                },
            },
        })

        if (error) {
            return {
                data: null,
                error: {
                    message: error.message,
                    code: error.status?.toString(),
                },
            }
        }

        return {
            data: authData,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
        }
    }
}

export const signOut = async (): Promise<AuthResult> => {
    try {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()

        if (error) {
            return {
                data: null,
                error: {
                    message: error.message,
                    code: error.status?.toString(),
                },
            }
        }

        return {
            data: null,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
        }
    }
}

export const signInWithGoogle = async (): Promise<AuthResult> => {
    try {
        const supabase = createClient()
        const redirectUrl = `${window.location.origin}/auth/callback`
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: redirectUrl },
        })

        if (error) {
            return {
                data: null,
                error: {
                    message: error.message,
                    code: error.status?.toString(),
                },
            }
        }

        return {
            data: null, // OAuth redirects, no data returned
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
        }
    }
}

export const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        if (error) {
            return {
                data: null,
                error: {
                    message: error.message,
                    code: error.status?.toString(),
                },
            }
        }

        return {
            data: null,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
        }
    }
}
