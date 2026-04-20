'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, Download, Save, Settings, 
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Maximize, Film
} from 'lucide-react'
import { DesktopMenuBar } from '@/components/ui/DesktopMenuBar'
import { MobileNavBar } from '@/components/ui/MobileNavBar'
import { VideoPreview } from '@/components/ui/VideoPreview'
import { Timeline } from '@/components/ui/Timeline'
import { DockerPanel } from '@/components/ui/DockerPanel'
import { EffectsPanel } from '@/components/ui/EffectsPanel'
import { ColorControls } from '@/components/ui/ColorControls'
import { AnimationSelector } from '@/components/ui/AnimationSelector'
import { SubtitleEditor } from '@/components/ui/SubtitleEditor'
import { ConverterPanel } from '@/components/ui/ConverterPanel'
import { Button } from '@/components/ui/Button'
import { SmoothText } from '@/components/animations/SmoothText'
import { useVideoStore } from '@/store/videoStore'
import { useDockerStore } from '@/store/dockerStore'
import { useVideoProcessor } from '@/hooks/useVideoProcessor'

export default function EditorPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { currentVideo, setCurrentVideo } = useVideoStore()
  const { dockers } = useDockerStore()
  const { processVideo, isProcessing, progress } = useVideoProcessor()
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Initialize docker positions on mount
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await processVideo(file)
    }
  }

  return (
    <div className="min-h-screen bg-ui-bg">
      {/* Desktop Menu Bar */}
      <DesktopMenuBar />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Main Editor Area */}
      <main className="pt-10 pb-18 md:pt-10 md:pb-0 h-screen">
        <div className="relative h-full">
          {/* Video Preview Area */}
          <div className="absolute inset-0 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-primary-dark border-b border-ui-border">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-accent-cyan" />
                <span className="text-sm font-medium">Editor</span>
                {currentVideo && (
                  <span className="text-xs text-text-secondary">
                    {currentVideo.name}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Video Preview */}
            <div className="flex-1 p-4">
              <VideoPreview />
            </div>

            {/* Timeline */}
            <Timeline />
          </div>

          {/* Docker Panels - Shown on desktop */}
          <AnimatePresence>
            {dockers.map((docker) => {
              if (docker.id === 'effects') {
                return (
                  <DockerPanel key={docker.id} id={docker.id} title={docker.title}>
                    <EffectsPanel />
                  </DockerPanel>
                )
              }
              if (docker.id === 'color') {
                return (
                  <DockerPanel key={docker.id} id={docker.id} title={docker.title}>
                    <ColorControls />
                  </DockerPanel>
                )
              }
              if (docker.id === 'animation') {
                return (
                  <DockerPanel key={docker.id} id={docker.id} title={docker.title}>
                    <AnimationSelector />
                  </DockerPanel>
                )
              }
              if (docker.id === 'subtitle') {
                return (
                  <DockerPanel key={docker.id} id={docker.id} title={docker.title}>
                    <SubtitleEditor />
                  </DockerPanel>
                )
              }
              if (docker.id === 'converter') {
                return (
                  <DockerPanel key={docker.id} id={docker.id} title={docker.title}>
                    <ConverterPanel />
                  </DockerPanel>
                )
              }
              return null
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBar />
    </div>
  )
}