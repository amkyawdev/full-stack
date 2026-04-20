import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/projects', '/editor', '/settings', '/export', '/templates']

// Routes that don't require authentication
const publicRoutes = ['/', '/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Check if accessing protected route without auth token
  const authToken = request.cookies.get('auth_token')
  
  if (!authToken && protectedRoutes.some(route => pathname.startsWith(route))) {
    const url = new URL('/auth', request.url)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}