'use client'

import { useCallback, useRef, useState } from 'react'

interface AudioState {
  volume: number
  isMuted: boolean
  isMutedOriginal: number
}

interface AudioFilters {
  bass: number        // -10 to 10
  treble: number      // -10 to 10
  reverb: number      // 0 to 100
  delay: number       // 0 to 1000ms
  fadeIn: number      // 0 to duration
  fadeOut: number     // 0 to duration
}

export function useAudioControls() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [audioState, setAudioState] = useState<AudioState>({
    volume: 1,
    isMuted: false,
    isMutedOriginal: 1,
  })
  const [filters, setFilters] = useState<AudioFilters>({
    bass: 0,
    treble: 0,
    reverb: 0,
    delay: 0,
    fadeIn: 0,
    fadeOut: 0,
  })

  // Initialize audio context from video element
  const initializeFromVideo = useCallback((videoElement: HTMLVideoElement) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = audioContext.createMediaElementSource(videoElement)
      const gainNode = audioContext.createGain()
      
      // Connect: source → gain → destination
      source.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      audioContextRef.current = audioContext
      gainNodeRef.current = gainNode
      
      // Apply initial volume
      gainNode.gain.value = audioState.volume
    } catch (error) {
      console.error('Audio init failed:', error)
    }
  }, [audioState.volume])

  // Set volume (0-1)
  const setVolume = useCallback((value: number) => {
    const clampedValue = Math.max(0, Math.min(1, value))
    setAudioState((prev) => ({ ...prev, volume: clampedValue }))
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = clampedValue
    }
  }, [])

  // Toggle mute
  const toggleMute = useCallback(() => {
    setAudioState((prev) => {
      if (prev.isMuted) {
        // Unmute - restore original volume
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.value = prev.isMutedOriginal
        }
        return { ...prev, isMuted: false, volume: prev.isMutedOriginal }
      } else {
        // Mute - save current and set to 0
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.value = 0
        }
        return { ...prev, isMuted: true, isMutedOriginal: prev.volume }
      }
    })
  }, [])

  // Set individual filters
  const setBass = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, bass: Math.max(-10, Math.min(10, value)) }))
  }, [])

  const setTreble = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, treble: Math.max(-10, Math.min(10, value)) }))
  }, [])

  const setReverb = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, reverb: Math.max(0, Math.min(100, value)) }))
  }, [])

  const setDelay = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, delay: Math.max(0, Math.min(1000, value)) }))
  }, [])

  const setFadeIn = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, fadeIn: Math.max(0, Math.min(prev.fadeOut, value)) }))
  }, [])

  const setFadeOut = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, fadeOut: Math.max(prev.fadeIn, value) }))
  }, [])

  // Apply audio settings via API
  const applyAudio = useCallback(async (videoUrl: string) => {
    try {
      const response = await fetch('/api/video/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl,
          volume: audioState.volume,
          isMuted: audioState.isMuted,
          filters,
        }),
      })
      return await response.json()
    } catch (error) {
      console.error('Apply audio failed:', error)
    }
  }, [audioState, filters])

  // Reset all filters to default
  const resetFilters = useCallback(() => {
    setFilters({
      bass: 0,
      treble: 0,
      reverb: 0,
      delay: 0,
      fadeIn: 0,
      fadeOut: 0,
    })
  }, [])

  return {
    audioState,
    filters,
    setVolume,
    toggleMute,
    initializeFromVideo,
    setBass,
    setTreble,
    setReverb,
    setDelay,
    setFadeIn,
    setFadeOut,
    applyAudio,
    resetFilters,
  }
}