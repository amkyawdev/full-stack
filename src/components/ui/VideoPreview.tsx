'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2 as MinimizeIcon, PictureInPicture } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import { useAnimationStore } from '@/store/animationStore'
import { Button } from './Button'
import { cn } from '@/lib/utils/cn'
import { MovieAnimation } from '@/types/animation'

function getAnimationState(animation: MovieAnimation, direction: 'in' | 'out') {
  switch (animation.type) {
    case 'fade': return { opacity: direction === 'in' ? 0 : 1 }
    case 'slide': return { x: direction === 'in' ? '100%' : 0, opacity: direction === 'in' ? 0 : 1 }
    case 'zoom': return { scale: direction === 'in' ? 0.8 : 1, opacity: direction === 'in' ? 0 : 1 }
    case 'rotate': return { rotate: direction === 'in' ? -180 : 0, scale: direction === 'in' ? 0.5 : 1, opacity: direction === 'in' ? 0 : 1 }
    case 'blur': return { filter: direction === 'in' ? 'blur(20px)' : 'blur(0)', opacity: direction === 'in' ? 0 : 1 }
    default: return { opacity: direction === 'in' ? 0 : 1 }
  }
}

export function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  
  const { currentVideo, isPlaying, currentTime, volume, isMuted, setIsPlaying, setCurrentTime, setDuration } = useVideoStore()
  const { movieAnimations } = useAnimationStore()

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const togglePip = async () => {
    if (!videoRef.current) return
    
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await videoRef.current.requestPictureInPicture()
      }
    } catch (error) {
      console.error('PiP error:', error)
    }
  }

  const latestAnimation = movieAnimations[movieAnimations.length - 1]

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-black rounded-lg overflow-hidden',
        isFullscreen ? 'fixed inset-0 z-50' : 'w-full aspect-video'
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {currentVideo ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={latestAnimation?.type || 'no-animation'}
              initial={latestAnimation ? getAnimationState(latestAnimation, 'in') : false}
              animate={latestAnimation ? getAnimationState(latestAnimation, 'out') : false}
              transition={{ duration: latestAnimation ? latestAnimation.duration / 1000 : 0.3 }}
              className="w-full h-full"
            >
              <video
                ref={videoRef}
                src={currentVideo.url}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </motion.div>
          </AnimatePresence>

          {/* Video controls overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
              >
                <div className="flex items-center justify-between">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                      {isFullscreen ? (
                        <MinimizeIcon className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={togglePip}>
                      <PictureInPicture className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-text-secondary">
          <div className="text-center">
            <p className="text-xl mb-2">No video loaded</p>
            <p className="text-sm">Upload a video to get started</p>
          </div>
        </div>
      )}
    </div>
  )
}