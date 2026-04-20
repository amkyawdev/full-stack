'use client'

import { useCallback, useRef, useState } from 'react'
import { useVideoStore } from '@/store/videoStore'
import { VideoFile } from '@/types/video'

export function useVideoProcessor() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { addVideo, setCurrentVideo, setIsPlaying } = useVideoStore()
  const abortRef = useRef<AbortController | null>(null)

  const processVideo = useCallback(async (file: File) => {
    setIsProcessing(true)
    setProgress(0)
    
    abortRef.current = new AbortController()
    
    try {
      // Create video object URL
      const url = URL.createObjectURL(file)
      
      // Get video metadata
      const video = document.createElement('video')
      video.src = url
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve
        video.onerror = reject
      })
      
      const videoFile: VideoFile = {
        id: `video-${Date.now()}`,
        name: file.name,
        url,
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        size: file.size,
        type: file.type,
        createdAt: new Date(),
      }
      
      // Add to store
      addVideo(videoFile)
      setCurrentVideo(videoFile)
      setIsPlaying(false)
      
      // Simulate processing progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsProcessing(false)
            return 100
          }
          return prev + 20
        })
      }, 200)
      
      return videoFile
    } catch (error) {
      console.error('Video processing error:', error)
      setIsProcessing(false)
      throw error
    }
  }, [addVideo, setCurrentVideo, setIsPlaying])

  const cancelProcessing = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      setIsProcessing(false)
      setProgress(0)
    }
  }, [])

  return {
    processVideo,
    cancelProcessing,
    isProcessing,
    progress,
  }
}