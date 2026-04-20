'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPalette } from 'react-icons/fa'
import { COLOR_PRESETS } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'
import { ColorPreset } from '@/types/video'

interface ColorControlsProps {
  onChange?: (preset: ColorPreset) => void
}

export function ColorControls({ onChange }: ColorControlsProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('Vivid')

  const handleSelectPreset = (preset: ColorPreset) => {
    setSelectedPreset(preset.name)
    onChange?.(preset)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
          <FaPalette className="w-4 h-4" />
          Color Presets
        </h3>
        <div className="space-y-2">
          {COLOR_PRESETS.map((preset) => (
            <motion.button
              key={preset.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectPreset(preset)}
              className={cn(
                'w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                selectedPreset === preset.name
                  ? 'bg-button-primary text-white'
                  : 'bg-ui-border text-text-secondary hover:bg-button-secondary hover:text-white'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{preset.name}</span>
                <div className="flex gap-1">
                  <span className="text-xs opacity-70">B:{preset.brightness}</span>
                  <span className="text-xs opacity-70">C:{preset.contrast}</span>
                  <span className="text-xs opacity-70">S:{preset.saturation}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}