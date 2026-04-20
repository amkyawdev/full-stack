import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/projects', '/editor', '/settings', '/export', '/templates']

// Routes that don't require authentication
const publicRoutes = ['/', '/auth', '/api']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // For now, allow all routes - Firebase auth is handled client-side
  // Can enable server-side auth check when needed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}