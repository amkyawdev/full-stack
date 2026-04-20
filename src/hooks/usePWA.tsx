'use client'

import { useEffect, useState } from 'react'

interface PWABadgeProps {
  Icon?: React.ReactNode
}

export function PWAInstaller({ Icon }: PWABadgeProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show install prompt
    ;(deferredPrompt as any).prompt()

    // Wait for user response
    const { outcome } = await (deferredPrompt as any).userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
  }

  if (isInstalled || !deferredPrompt) {
    return null
  }

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-20 right-4 z-50 bg-accent-cyan text-ui-bg p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      title="Install App"
    >
      {Icon || (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3v10a3 3 0 003 3v1a2 2 0 002 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 00-2-2H4a2 2 0 00-2 2v1M12 4v8m0 0l-4-4m4 4l4-4" />
        </svg>
      )}
    </button>
  )
}

// Service Worker Registration Hook
export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        setRegistration(reg)
        
        // Check for updates
        reg.update().then(() => {
          // Listen for updates
          reg.addEventListener('updatefound', () => {
            setUpdateAvailable(true)
          })
        })
      })
      .catch(console.error)
  }, [])

  const update = () => {
    if (registration) {
      registration.update().then(() => setUpdateAvailable(false))
    }
  }

  return { registration, updateAvailable, update }
}