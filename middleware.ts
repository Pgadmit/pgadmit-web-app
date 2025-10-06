import { createMiddlewareClient } from '@/shared/lib/supabase/server-only'
import { NextResponse, type NextRequest } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/applications',
  '/universities',
  '/community',
  '/resources',
  '/onboarding',
]

const authRoutes = ['/auth', '/login', '/register']

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // Handle OAuth callback redirects
  if (pathname === '/' && code) {
    const redirectUrl = new URL('/auth/callback', request.url)
    redirectUrl.searchParams.set('code', code)
    searchParams.forEach((value, key) => {
      if (key !== 'code') {
        redirectUrl.searchParams.set(key, value)
      }
    })
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === '/auth' && code) {
    const redirectUrl = new URL('/auth/callback', request.url)
    redirectUrl.searchParams.set('code', code)
    searchParams.forEach((value, key) => {
      if (key !== 'code') {
        redirectUrl.searchParams.set(key, value)
      }
    })
    return NextResponse.redirect(redirectUrl)
  }

  const { supabase, supabaseResponse } = createMiddlewareClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL('/auth', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    const redirectTo = searchParams.get('redirectTo') || '/dashboard'
    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely.

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
