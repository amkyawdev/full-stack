import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear auth cookie
  response.cookies.set('auth_token', '', {
    path: '/',
    expires: new Date(0),
  })
  
  return response
}