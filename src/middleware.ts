import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public paths that don't require auth
const publicPaths = [
  '/',
  '/auth',
  '/api',
  '/manifest.json',
  '/sw.js',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next()
  }

  // Check for auth token (demo mode - in production, check real session)
  const isLoggedIn = request.cookies.get('auth_token')

  // If not logged in, redirect to auth page
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}