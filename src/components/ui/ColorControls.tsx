'use client'

import { useState } from 'react'
import { FaPalette } from 'react-icons/fa'
import { COLOR_PRESETS } from '@/lib/constants/colors'
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
        <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
          <FaPalette className="w-4 h-4 text-cyan-400" />
          Color Presets
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(preset)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                selectedPreset === preset.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#2a2a3e] text-gray-300 hover:bg-[#3a3a4e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{preset.name}</span>
                <div className="flex gap-1">
                  <span className="text-xs opacity-70">B:{preset.brightness}</span>
                  <span className="text-xs opacity-70">C:{preset.contrast}</span>
                  <span className="text-xs opacity-70">S:{preset.saturation}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}