import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.session) {
            // Force refresh the session to ensure it's properly set
            await supabase.auth.refreshSession()

            // Redirect to dashboard with success indicator
            const redirectUrl = new URL(`${origin}${next}`)
            redirectUrl.searchParams.set('auth', 'success')
            return NextResponse.redirect(redirectUrl.toString())
        } else {
            console.error('OAuth exchange error:', error)
            // Redirect to error page with error details
            const errorUrl = new URL(`${origin}/auth/auth-code-error`)
            if (error) {
                errorUrl.searchParams.set('error', error.message)
            }
            return NextResponse.redirect(errorUrl.toString())
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
