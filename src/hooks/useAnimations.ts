'use client'

import { useState, useCallback, useRef } from 'react'
import { useAnimationStore } from '@/store/animationStore'
import { MovieAnimation, TextAnimation, TitleAnimation } from '@/types/animation'

export function useAnimations() {
  const { 
    movieAnimations, 
    textAnimation, 
    titleAnimation,
    addMovieAnimation,
    removeMovieAnimation,
    setTextAnimation,
    setTitleAnimation,
    clearAnimations,
  } = useAnimationStore()

  const [previewAnimation, setPreviewAnimation] = useState<MovieAnimation | null>(null)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const playMovieAnimation = useCallback((animation: MovieAnimation) => {
    setIsPreviewing(true)
    setPreviewAnimation(animation)
    
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
    }
    
    previewTimeoutRef.current = setTimeout(() => {
      setPreviewAnimation(null)
      setIsPreviewing(false)
    }, animation.duration + 500)
  }, [])

  const playTextAnimation = useCallback((animation: TextAnimation) => {
    setTextAnimation(animation)
  }, [setTextAnimation])

  const playTitleAnimation = useCallback((animation: TitleAnimation) => {
    setTitleAnimation(animation)
  }, [setTitleAnimation])

  const stopPreview = useCallback(() => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
    }
    setPreviewAnimation(null)
    setIsPreviewing(false)
  }, [])

  const resetAll = useCallback(() => {
    stopPreview()
    clearAnimations()
  }, [stopPreview, clearAnimations])

  return {
    movieAnimations,
    textAnimation,
    titleAnimation,
    previewAnimation,
    isPreviewing,
    addMovieAnimation,
    removeMovieAnimation,
    playMovieAnimation,
    playTextAnimation,
    playTitleAnimation,
    stopPreview,
    resetAll,
  }
}