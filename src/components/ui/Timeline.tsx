'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import { Button } from './Button'

export function Timeline() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const {
    currentVideo,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setIsMuted,
  } = useVideoStore()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-ui-panel border-t border-ui-border p-4">
      {currentVideo && (
        <video
          ref={videoRef}
          src={currentVideo.url}
          className="hidden"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
      
      {/* Timeline bar */}
      <div className="relative h-2 bg-ui-border rounded-full mb-4">
        <motion.div
          className="absolute h-full bg-accent-cyan rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          disabled={!currentVideo}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0
                setCurrentTime(0)
              }
            }}
            disabled={!currentVideo}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={!currentVideo}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = duration
                setCurrentTime(duration)
              }
            }}
            disabled={!currentVideo}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Time display */}
        <div className="text-sm text-text-secondary font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-ui-border rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}