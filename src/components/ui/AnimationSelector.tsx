'use client'

import { motion } from 'framer-motion'
import { MdAnimation } from 'react-icons/md'
import { useAnimationStore } from '@/store/animationStore'
import { MOVIE_ANIMATIONS } from '@/lib/constants/animations'
import { cn } from '@/lib/utils/cn'
import { MovieAnimation, MovieAnimationType, AnimationDirection } from '@/types/animation'

const animationIcons: Record<MovieAnimationType, string> = {
  fade: '◻',
  slide: '→',
  zoom: '⊕',
  rotate: '⟳',
  blur: '◌',
}

const directionLabels: Record<AnimationDirection, string> = {
  in: 'IN',
  out: 'OUT',
}

export function AnimationSelector() {
  const { movieAnimations, addMovieAnimation, removeMovieAnimation } = useAnimationStore()

  const handleAddAnimation = (type: MovieAnimationType, direction: AnimationDirection) => {
    const animation: MovieAnimation = {
      type,
      direction,
      duration: type === 'zoom' ? 300 : type === 'slide' ? 400 : type === 'blur' ? 400 : 500,
    }
    addMovieAnimation(animation)
  }

  const handleRemoveAnimation = (index: number) => {
    removeMovieAnimation(index)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
          <MdAnimation className="w-4 h-4" />
          Movie Animations
        </h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(['fade', 'slide', 'zoom', 'rotate', 'blur'] as MovieAnimationType[]).map((type) => (
            <div key={type} className="space-y-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddAnimation(type, 'in')}
                className="w-full px-2 py-1.5 rounded text-xs bg-button-success text-white font-medium"
              >
                {animationIcons[type]} IN
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddAnimation(type, 'out')}
                className="w-full px-2 py-1.5 rounded text-xs bg-button-danger text-white font-medium"
              >
                {animationIcons[type]} OUT
              </motion.button>
            </div>
          ))}
        </div>

        {/* Applied animations */}
        {movieAnimations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs text-text-secondary">Applied:</h4>
            {movieAnimations.map((anim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between px-2 py-1.5 bg-ui-border rounded text-sm"
              >
                <span className="text-text-primary capitalize">
                  {animationIcons[anim.type]} {anim.direction.toUpperCase()}
                </span>
                <button
                  onClick={() => handleRemoveAnimation(index)}
                  className="text-text-secondary hover:text-button-danger"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}