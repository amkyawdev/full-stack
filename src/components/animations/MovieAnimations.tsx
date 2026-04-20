'use client'

import { motion } from 'framer-motion'
import { MovieAnimation } from '@/types/animation'

interface MovieAnimationsProps {
  animation?: MovieAnimation
  children: React.ReactNode
}

// Simple implementation without complex variants
export function MovieAnimations({ animation, children }: MovieAnimationsProps) {
  if (!animation) return <>{children}</>

  // Use simple initial/animate approach instead of variants
  return (
    <motion.div
      initial={animation.direction === 'in' ? getInitialState(animation) : undefined}
      animate={animation.direction === 'out' ? getOutState(animation) : undefined}
      transition={{ duration: animation.duration / 1000 }}
    >
      {children}
    </motion.div>
  )
}

function getInitialState(animation: MovieAnimation) {
  switch (animation.type) {
    case 'fade': return { opacity: 0 }
    case 'slide': return { x: '100%', opacity: 0 }
    case 'zoom': return { scale: 0.8, opacity: 0 }
    case 'rotate': return { rotate: -180, scale: 0.5, opacity: 0 }
    case 'blur': return { filter: 'blur(20px)', opacity: 0 }
    default: return { opacity: 0 }
  }
}

function getOutState(animation: MovieAnimation) {
  switch (animation.type) {
    case 'fade': return { opacity: 0 }
    case 'slide': return { x: '-100%', opacity: 0 }
    case 'zoom': return { scale: 0.8, opacity: 0 }
    case 'rotate': return { rotate: 180, scale: 0.5, opacity: 0 }
    case 'blur': return { filter: 'blur(20px)', opacity: 0 }
    default: return { opacity: 0 }
  }
}

// Export individual animation components for direct use
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, direction = 'left' }: { children: React.ReactNode; direction?: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ x: direction === 'left' ? '-100%' : '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function ZoomIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function RotateIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export function BlurIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}