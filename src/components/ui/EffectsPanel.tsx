'use client'

import { motion } from 'framer-motion'
import { FiMonitor } from 'react-icons/fi'
import { useVideoStore } from '@/store/videoStore'
import { RESOLUTIONS } from '@/lib/constants/resolutions'
import { cn } from '@/lib/utils/cn'

export function EffectsPanel() {
  const { resolution, setResolution } = useVideoStore()

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
          <FiMonitor className="w-4 h-4" />
          Resolution
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {RESOLUTIONS.map((res) => (
            <motion.button
              key={res.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setResolution(res)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                resolution.label === res.label
                  ? 'bg-button-primary text-white'
                  : 'bg-ui-border text-text-secondary hover:bg-button-secondary hover:text-white'
              )}
            >
              {res.label}
              <span className="block text-xs opacity-70">
                {res.width}×{res.height}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}