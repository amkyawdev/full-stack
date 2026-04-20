'use client'

import { useState, useCallback, useRef } from 'react'

interface TouchState {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  direction: 'left' | 'right' | 'up' | 'down' | null
  isSwiping: boolean
}

interface TouchHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  threshold?: number
}

export function useTouch(handlers: TouchHandlers) {
  const [touchState, setTouchState] = useState<TouchState>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    direction: null,
    isSwiping: false,
  })
  
  const touchStartTime = useRef<number>(0)
  const lastTapTime = useRef<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const threshold = handlers.threshold || 50

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0]
    setTouchState({
      startX: clientX,
      startY: clientY,
      deltaX: 0,
      deltaY: 0,
      direction: null,
      isSwiping: false,
    })
    touchStartTime.current = Date.now()
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const { clientX, clientY } = e.touches[0]
    const { startX, startY } = touchState
    
    const deltaX = clientX - startX
    const deltaY = clientY - startY
    
    let direction: TouchState['direction'] = null
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left'
    } else {
      direction = deltaY > 0 ? 'down' : 'up'
    }
    
    const isSwiping = 
      Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold
    
    setTouchState(prev => ({
      ...prev,
      deltaX,
      deltaY,
      direction,
      isSwiping,
    }))
  }, [touchState.startX, touchState.startY, threshold])

  const handleTouchEnd = useCallback(() => {
    const { deltaX, deltaY, direction } = touchState
    
    if (direction === 'left' && handlers.onSwipeLeft) {
      handlers.onSwipeLeft()
    } else if (direction === 'right' && handlers.onSwipeRight) {
      handlers.onSwipeRight()
    } else if (direction === 'up' && handlers.onSwipeUp) {
      handlers.onSwipeUp()
    } else if (direction === 'down' && handlers.onSwipeDown) {
      handlers.onSwipeDown()
    }
    
    // Check for double tap
    const now = Date.now()
    if (now - lastTapTime.current < 300 && handlers.onDoubleTap) {
      handlers.onDoubleTap()
    }
    lastTapTime.current = now
    
    // Long press
    if (now - touchStartTime.current > 500 && handlers.onLongPress) {
      handlers.onLongPress()
    }
    
    // Reset
    setTouchState({
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      direction: null,
      isSwiping: false,
    })
  }, [touchState, handlers])

  return {
    touchState,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

// Pinch to zoom hook
export function usePinchZoom(initialScale = 1) {
  const [scale, setScale] = useState(initialScale)
  const baseDistance = useRef<number>(0)
  const baseScale = useRef(initialScale)

  const handlePinchStart = useCallback((distance: number) => {
    baseDistance.current = distance
    baseScale.current = scale
  }, [scale])

  const handlePinchMove = useCallback((distance: number) => {
    if (!baseDistance.current) return
    const newScale = baseScale.current * (distance / baseDistance.current)
    setScale(Math.min(Math.max(newScale, 0.5), 3))
  }, [])

  const handlePinchEnd = useCallback(() => {
    baseDistance.current = 0
  }, [])

  return {
    scale,
    setScale,
    handlePinchStart,
    handlePinchMove,
    handlePinchEnd,
  }
}