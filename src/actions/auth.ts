'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseBrowser } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import type { LoginCredentials, RegisterData } from '@/shared/lib/validations/auth'

export async function signInWithEmail(credentials: LoginCredentials) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signUpWithEmail(data: Omit<RegisterData, 'confirmPassword'>) {
    const supabase = await createClient()

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
        return { error: error.message }
    }

    if (authData.user && !authData.session) {
        return { message: 'Please check your email to confirm your account.' }
    }

    revalidatePath('/', 'layout')
    redirect('/onboarding')
}

export async function signInWithGoogle() {
    const supabase = supabaseBrowser()

    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }
}

export async function signOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function resetPassword(email: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { message: 'Password reset email sent!' }
}

export async function getUser() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        return { user: null, error: error.message }
    }

    return { user, error: null }
}

export async function getSession() {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        return { session: null, error: error.message }
    }

    return { session, error: null }
}
