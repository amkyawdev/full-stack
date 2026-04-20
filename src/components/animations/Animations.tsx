'use client'

import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

// Simple fade in animation
export function FadeIn({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  )
}

// Scale in animation
export function ScaleIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

// Slide in from bottom
export function SlideUp({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Loading spinner
export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    </motion.div>
  )
}

// Pulsing dot
export function PulsingDot({ color = 'cyan' }: { color?: string }) {
  const colors: Record<string, string> = {
    cyan: 'text-accent-cyan',
    purple: 'text-accent-purple',
    pink: 'text-accent-pink',
  }
  return (
    <motion.span
      className={`w-2 h-2 rounded-full ${colors[color] || colors.cyan}`}
      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  )
}

// Loading dots animation
export function LoadingDots({ text = 'Loading' }: { text?: string }) {
  return (
    <motion.span className="inline-flex items-center gap-1">
      {text}
      <AnimatePresence mode="wait">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: i * 0.15 }}
            className="inline-block"
          >
            <PulsingDot />
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.span>
  )
}

// Progress bar animation
export function ProgressBar({ progress = 0, color = 'cyan' }: { progress?: number, color?: string }) {
  const colors: Record<string, string> = {
    cyan: 'bg-accent-cyan',
    purple: 'bg-accent-purple',
    pink: 'bg-accent-pink',
    green: 'bg-green-500',
  }
  return (
    <div className="w-full h-2 bg-ui-bg rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${colors[color] || colors.cyan} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

// Shimmer effect for loading cards
export function ShimmerCard() {
  return (
    <div className="bg-ui-panel rounded-xl p-4 space-y-3">
      <div className="flex gap-3">
        <motion.div
          className="w-16 h-16 bg-ui-bg rounded-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-1 space-y-2">
          <motion.div
            className="h-4 bg-ui-bg rounded w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-3 bg-ui-bg rounded w-1/2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}

// Bouncing squares for generator
export function GeneratorAnimation() {
  return (
    <div className="flex items-end justify-center gap-1 h-12">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-3 bg-accent-cyan rounded-sm"
          animate={{ height: [12, 36, 12] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Wave animation for audio
export function WaveAnimation({ color = 'cyan' }: { color?: string }) {
  const colors: Record<string, string> = {
    cyan: 'bg-accent-cyan',
    purple: 'bg-accent-purple',
    pink: 'bg-accent-pink',
  }
  return (
    <div className="flex items-center justify-center gap-0.5 h-8">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 ${colors[color] || colors.cyan} rounded-full`}
          animate={{ height: [4, 24, 4] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Circular progress
export function CircularProgress({ progress = 0, size = 60, stroke = 4, color = 'cyan' }: { 
  progress?: number 
  size?: number 
  stroke?: number 
  color?: string 
}) {
  const colors: Record<string, string> = {
    cyan: 'stroke-accent-cyan',
    purple: 'stroke-accent-purple',
    pink: 'stroke-accent-pink',
  }
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-ui-bg"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          className={colors[color] || colors.cyan}
          strokeLinecap="round"
          style={{ strokeDasharray: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {Math.round(progress)}%
      </div>
    </div>
  )
}

// Export animations object
export const animations = {
  FadeIn,
  ScaleIn,
  SlideUp,
  LoadingSpinner,
  LoadingDots,
  ProgressBar,
  ShimmerCard,
  GeneratorAnimation,
  WaveAnimation,
  CircularProgress,
  PulsingDot,
}