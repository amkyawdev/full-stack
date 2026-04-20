'use client'

import { useCallback, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Scissors, Merge, Clock } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import { useVideoTrimmer } from '@/hooks/useVideoTrimmer'
import { useAudioControls } from '@/hooks/useAudioControls'
import { Button } from './Button'

export function Timeline() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showTrimControls, setShowTrimControls] = useState(false)
  
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
  
  const { 
    trim, 
    setTrimStart, 
    setTrimEnd, 
    setStartPoint, 
    setEndPoint, 
    resetTrim,
    getTrimmedDuration,
  } = useVideoTrimmer()
  
  const { 
    audioState, 
    filters, 
    setVolume: setAudioVolume, 
    toggleMute, 
    setBass,
    setTreble,
  } = useAudioControls()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const ms = Math.floor((seconds % 1) * 10)
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`
  }

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !duration) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    const newTime = percent * duration
    
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }, [duration, setCurrentTime])

  const handleTrimStartDrag = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    // Would implement drag logic here
  }, [])

  const handleTrimEndDrag = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    // Would implement drag logic here
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isPlaying, setIsPlaying])

  const skipBackward = useCallback(() => {
    const newTime = Math.max(0, currentTime - 10)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }, [currentTime, setCurrentTime])

  const skipForward = useCallback(() => {
    const newTime = Math.min(duration, currentTime + 10)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }, [currentTime, duration, setCurrentTime])

  if (!currentVideo) {
    return (
      <div className="p-4 bg-ui-panel rounded-lg">
        <p className="text-text-secondary text-center">No video loaded</p>
      </div>
    )
  }

  const trimStartPercent = duration ? (trim.startTime / duration) * 100 : 0
  const trimEndPercent = duration ? (trim.endTime / duration) * 100 : 100
  const currentPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" size="sm" onClick={skipBackward}>
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button variant="primary" size="sm" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button variant="ghost" size="sm" onClick={skipForward}>
          <SkipForward className="w-4 h-4" />
        </Button>
        
        <span className="text-xs text-text-secondary ml-4">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Timeline Track */}
      <div 
        ref={containerRef}
        className="relative h-16 bg-ui-bg rounded-lg cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        {/* Background waveform placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-8 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan opacity-30" />
        </div>

        {/* Trim region */}
        {showTrimControls && (
          <div 
            className="absolute h-full bg-accent-cyan/20 border-l-2 border-r-2 border-accent-cyan"
            style={{ 
              left: `${trimStartPercent}%`, 
              right: `${100 - trimEndPercent}%` 
            }}
          >
            {/* Trim handle start */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-2 bg-accent-cyan cursor-w-resize flex items-center justify-center"
              onMouseDown={handleTrimStartDrag}
            >
              <div className="w-0.5 h-4 bg-white rounded" />
            </div>
            
            {/* Trim handle end */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-2 bg-accent-cyan cursor-e-resize flex items-center justify-center"
              onMouseDown={handleTrimEndDrag}
            >
              <div className="w-0.5 h-4 bg-white rounded" />
            </div>
          </div>
        )}

        {/* Playhead */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white"
          style={{ left: `${currentPercent}%` }}
        >
          <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-white rounded-full" />
        </div>
      </div>

      {/* Time indicators */}
      <div className="flex justify-between text-xs text-text-secondary">
        <span>0:00</span>
        <span>{formatTime(duration / 2)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Trim & Audio Controls */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={showTrimControls ? "secondary" : "ghost"} 
          size="sm"
          onClick={() => setShowTrimControls(!showTrimControls)}
        >
          <Scissors className="w-4 h-4 mr-1" />
          Trim
        </Button>
        
        {showTrimControls && (
          <>
            <Button variant="ghost" size="sm" onClick={setStartPoint}>
              [In
            </Button>
            <Button variant="ghost" size="sm" onClick={setEndPoint}>
              Out]
            </Button>
            <Button variant="ghost" size="sm" onClick={resetTrim}>
              Reset
            </Button>
            <span className="text-xs text-text-secondary flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(getTrimmedDuration())}
            </span>
          </>
        )}
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-4 p-3 bg-ui-panel rounded-lg">
        <Button variant="ghost" size="sm" onClick={toggleMute}>
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24"
        />
        
        <span className="text-xs text-text-secondary w-12">
          {Math.round(volume * 100)}%
        </span>

        {/* Audio Filters */}
        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs text-text-secondary">Bass:</span>
          <input
            type="range"
            min="-10"
            max="10"
            value={filters.bass}
            onChange={(e) => setBass(parseInt(e.target.value))}
            className="w-16"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">Treble:</span>
          <input
            type="range"
            min="-10"
            max="10"
            value={filters.treble}
            onChange={(e) => setTreble(parseInt(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      {/* Hidden video element for playback */}
      <video
        ref={videoRef}
        src={currentVideo.url}
        className="hidden"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}