'use client'

import { motion } from 'framer-motion'
import { TextAnimation, TextAnimationType } from '@/types/animation'
import { cn } from '@/lib/utils/cn'

interface TextAnimationsProps {
  animation?: TextAnimation
  text: string
  className?: string
}

export function TextAnimations({ animation, text, className }: TextAnimationsProps) {
  if (!animation) {
    return <span className={className}>{text}</span>
  }

  const components = {
    typewriter: <Typewriter text={text} className={className} />,
    bounce: <BounceText text={text} className={className} />,
    glow: <GlowPulse text={text} className={className} />,
    float: <FloatUp text={text} className={className} />,
    shake: <ShakeText text={text} className={className} />,
  }

  return components[animation.type] || <span className={className}>{text}</span>
}

// Individual text animation components
export function Typewriter({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn('inline-block overflow-hidden whitespace-nowrap', className)}>
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: 'steps(40)' }}
        className="inline-block border-r-2 border-currentColor animate-blink"
      >
        {text}
      </motion.span>
    </span>
  )
}

export function BounceText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {text}
    </motion.span>
  )
}

export function GlowPulse({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      animate={{
        textShadow: [
          '0 0 5px currentColor',
          '0 0 20px currentColor, 0 0 30px currentColor',
          '0 0 5px currentColor',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={cn('inline-block', className)}
    >
      {text}
    </motion.span>
  )
}

export function FloatUp({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn('inline-block', className)}
    >
      {text}
    </motion.span>
  )
}

export function ShakeText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      animate={{ x: [-5, 5, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
      className={cn('inline-block', className)}
    >
      {text}
    </motion.span>
  )
}