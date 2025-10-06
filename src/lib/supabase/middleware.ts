import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value)
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Get user session
    const { data: { user } } = await supabase.auth.getUser()

    // Define protected routes
    const PROTECTED_ROUTES = [
        '/dashboard', 
        '/profile', 
        '/settings', 
        '/onboarding',
        '/applications',
        '/universities',
        '/community',
        '/resources'
    ]
    const pathname = request.nextUrl.pathname

    const isProtected = PROTECTED_ROUTES.some(path => pathname.startsWith(path))

    // Redirect to login if accessing protected route without auth
    if (isProtected && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
    }

    // Redirect to dashboard if accessing auth pages while logged in
    const AUTH_ROUTES = ['/login', '/signup', '/auth']
    const isAuthRoute = AUTH_ROUTES.some(path => pathname.startsWith(path))

    if (isAuthRoute && user) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    return response
}
