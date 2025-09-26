import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    console.log('OAuth callback received:', { 
        code: !!code, 
        origin, 
        next,
        fullUrl: request.url 
    })

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            console.log('OAuth successful, redirecting to:', next)
            // Use the same origin for redirect
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            console.error('OAuth exchange error:', error)
        }
    }

    // Return the user to an error page with instructions
    console.log('OAuth failed, redirecting to error page')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
