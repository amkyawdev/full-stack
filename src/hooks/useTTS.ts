'use client'

import { useState, useCallback } from 'react'

interface Voice {
  voice_id: string
  name: string
  category: string
  description: string
}

interface UseTTSReturn {
  generateVoice: (text: string, voiceId?: string) => Promise<string | null>
  isGenerating: boolean
  error: string | null
  voices: Voice[]
  loadVoices: () => Promise<void>
  isConfigured: boolean
}

export function useTTS(): UseTTSReturn {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [voices, setVoices] = useState<Voice[]>([])
  const [isConfigured, setIsConfigured] = useState(false)

  const loadVoices = useCallback(async () => {
    try {
      const res = await fetch('/api/video/tts')
      const data = await res.json()
      setVoices(data.voices || [])
      setIsConfigured(data.isConfigured || false)
    } catch (e) {
      console.error('Load voices error:', e)
    }
  }, [])

  const generateVoice = useCallback(async (text: string, voiceId?: string): Promise<string | null> => {
    if (!text.trim()) return null

    setIsGenerating(true)
    setError(null)

    try {
      const res = await fetch('/api/video/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Generation failed')
        return null
      }

      return data.audioBase64
    } catch (e) {
      setError('Generation failed')
      return null
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return { generateVoice, isGenerating, error, voices, loadVoices, isConfigured }
}