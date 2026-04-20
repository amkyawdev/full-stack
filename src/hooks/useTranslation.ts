'use client'

import { useState, useCallback } from 'react'

interface UseTranslationReturn {
  translate: (text: string, targetLang: string, sourceLang?: string) => Promise<string | null>
  isTranslating: boolean
  error: string | null
  isConfigured: boolean
}

export function useTranslation(): UseTranslationReturn {
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  const checkConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/translate')
      const data = await res.json()
      setIsConfigured(!!data.languages)
    } catch {
      setIsConfigured(false)
    }
  }, [])

  const translate = useCallback(async (
    text: string,
    targetLang: string,
    sourceLang: string = 'en'
  ): Promise<string | null> => {
    if (!text.trim()) return null

    setIsTranslating(true)
    setError(null)

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sourceLanguage: sourceLang, targetLanguage: targetLang }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Translation failed')
        return null
      }

      return data.translatedText
    } catch (e) {
      setError('Translation failed')
      return null
    } finally {
      setIsTranslating(false)
    }
  }, [])

  return { translate, isTranslating, error, isConfigured }
}