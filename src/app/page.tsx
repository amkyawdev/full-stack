'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Film, Upload, Play, Palette, Type, Sparkles, Download } from 'lucide-react'
import { DesktopMenuBar } from '@/components/ui/DesktopMenuBar'
import { MobileNavBar } from '@/components/ui/MobileNavBar'
import { VideoPreview } from '@/components/ui/VideoPreview'
import { DockerPanel } from '@/components/ui/DockerPanel'
import { EffectsPanel } from '@/components/ui/EffectsPanel'
import { ColorControls } from '@/components/ui/ColorControls'
import { AnimationSelector } from '@/components/ui/AnimationSelector'
import { SubtitleEditor } from '@/components/ui/SubtitleEditor'
import { Button } from '@/components/ui/Button'
import { SmoothText, StaggerContainer, StaggerItem } from '@/components/animations/SmoothText'
import { useVideoProcessor } from '@/hooks/useVideoProcessor'
import { useVideoStore } from '@/store/videoStore'

export default function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { processVideo, isProcessing, progress } = useVideoProcessor()
  const { currentVideo } = useVideoStore()

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

      {/* Main Content */}
      <main className="pt-10 md:pt-10 pb-18 md:pb-4">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
              <Film className="w-8 h-8 text-accent-cyan" />
              <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
                Movie Editor
              </span>
            </h1>
            <p className="text-text-secondary">
              Professional video editing in your browser
            </p>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            {!currentVideo ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-ui-border rounded-xl p-12 text-center cursor-pointer hover:border-accent-cyan hover:bg-ui-panel/50 transition-all"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-text-secondary" />
                <p className="text-lg mb-2">Drop video here or click to upload</p>
                <p className="text-sm text-text-secondary">
                  Supports MP4, WEBM, MOV
                </p>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  Replace Video
                </Button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>

          {/* Progress */}
          {isProcessing && (
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Processing...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-ui-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Video Preview */}
          <div className="mb-8">
            <VideoPreview />
          </div>

          {/* Editor Panels (Desktop) - Hidden on mobile, shown as dock panels */}
          <div className="hidden md:block">
            <StaggerContainer delay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StaggerItem>
                <div className="bg-ui-panel rounded-lg p-4">
                  <h3 className="flex items-center gap-2 mb-4 font-medium">
                    <Sparkles className="w-4 h-4 text-accent-cyan" />
                    Resolution
                  </h3>
                  <EffectsPanel />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-ui-panel rounded-lg p-4">
                  <h3 className="flex items-center gap-2 mb-4 font-medium">
                    <Palette className="w-4 h-4 text-accent-purple" />
                    Color
                  </h3>
                  <ColorControls />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-ui-panel rounded-lg p-4">
                  <h3 className="flex items-center gap-2 mb-4 font-medium">
                    <Sparkles className="w-4 h-4 text-accent-pink" />
                    Animation
                  </h3>
                  <AnimationSelector />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-ui-panel rounded-lg p-4">
                  <h3 className="flex items-center gap-2 mb-4 font-medium">
                    <Type className="w-4 h-4 text-accent-cyan" />
                    Subtitles
                  </h3>
                  <SubtitleEditor />
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Mobile: Floating panels */}
          <div className="md:hidden fixed inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-20 left-4 right-4"
            >
              <Button
                variant="primary"
                onClick={() => fileInputRef.current?.click()}
                className="pointer-events-auto w-full"
                icon={<Upload className="w-4 h-4" />}
              >
                Import Video
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavBar />
    </div>
  )
}