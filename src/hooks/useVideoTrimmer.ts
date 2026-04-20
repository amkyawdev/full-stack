'use client'

import { useState, useCallback, useRef } from 'react'
import { useVideoStore } from '@/store/videoStore'

interface TrimState {
  startTime: number
  endTime: number
}

export function useVideoTrimmer() {
  const { currentVideo, setCurrentVideo } = useVideoStore()
  const [trim, setTrim] = useState<TrimState>({ startTime: 0, endTime: 0 })
  const [isTrimming, setIsTrimming] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Set video element reference
  const setVideoRef = useCallback((ref: HTMLVideoElement | null) => {
    videoRef.current = ref
  }, [])

  // Set trim start point at current playback time
  const setStartPoint = useCallback(() => {
    if (videoRef.current) {
      setTrim((prev) => ({ ...prev, startTime: videoRef.current!.currentTime }))
    }
  }, [])

  // Set trim end point at current playback time
  const setEndPoint = useCallback(() => {
    if (videoRef.current) {
      setTrim((prev) => ({ ...prev, endTime: videoRef.current!.currentTime }))
    }
  }, [])

  // Set trim start from slider
  const setTrimStart = useCallback((time: number) => {
    setTrim((prev) => ({ ...prev, startTime: Math.min(time, prev.endTime) }))
  }, [])

  // Set trim end from slider
  const setTrimEnd = useCallback((time: number) => {
    setTrim((prev) => ({ ...prev, endTime: Math.max(time, prev.startTime) }))
  }, [])

  // Reset trim to full video
  const resetTrim = useCallback(() => {
    setTrim({ startTime: 0, endTime: currentVideo?.duration || 0 })
  }, [currentVideo?.duration])

  // Apply trim by calling API
  const applyTrim = useCallback(async () => {
    if (!currentVideo) return null

    setIsTrimming(true)
    try {
      const response = await fetch('/api/video/trim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: currentVideo.url,
          startTime: trim.startTime,
          endTime: trim.endTime,
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Trim failed:', error)
      throw error
    } finally {
      setIsTrimming(false)
    }
  }, [currentVideo, trim])

  // Get trimmed duration
  const getTrimmedDuration = useCallback(() => {
    return trim.endTime - trim.startTime
  }, [trim])

  return {
    trim,
    setTrimStart,
    setTrimEnd,
    setStartPoint,
    setEndPoint,
    resetTrim,
    applyTrim,
    isTrimming,
    getTrimmedDuration,
    setVideoRef,
  }
}