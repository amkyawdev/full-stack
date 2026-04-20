'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function EditorRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/editor')
  }, [router])

  return null
}