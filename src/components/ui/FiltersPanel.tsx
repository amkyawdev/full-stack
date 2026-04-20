'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, RotateCcw } from 'lucide-react'
import { Button } from './Button'

// Filter presets
const FILTER_PRESETS = [
  { id: 'none', name: 'Normal', filter: 'none' },
  { id: 'blur', name: 'Blur', filter: 'blur(2px)' },
  { id: 'sharpen', name: 'Sharpen', filter: 'sharpen(1.5)' },
  { id: 'grayscale', name: 'Grayscale', filter: 'grayscale(100%)' },
  { id: 'sepia', name: 'Sepia', filter: 'sepia(100%)' },
  { id: 'invert', name: 'Invert', filter: 'invert(100%)' },
  { id: 'brightness', name: 'Bright', filter: 'brightness(1.3)' },
  { id: 'dark', name: 'Dark', filter: 'brightness(0.7)' },
  { id: 'contrast', name: 'High Contrast', filter: 'contrast(1.5)' },
  { id: 'vignette', name: 'Vignette', filter: 'vignette(0.5)' },
]

interface FilterControls {
  blur: number
  sharpen: number
  brightness: number
  contrast: number
  saturation: number
  hue: number
  sepia: number
  opacity: number
}

interface FiltersPanelProps {
  onApplyFilter?: (filters: FilterControls, preset: string) => void
}

export function FiltersPanel({ onApplyFilter }: FiltersPanelProps) {
  const [selectedPreset, setSelectedPreset] = useState('none')
  const [filters, setFilters] = useState<FilterControls>({
    blur: 0,
    sharpen: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    sepia: 0,
    opacity: 100,
  })

  const updateFilter = (key: keyof FilterControls, value: number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onApplyFilter?.(newFilters, selectedPreset)
  }

  const applyPreset = (presetId: string) => {
    setSelectedPreset(presetId)
    const preset = FILTER_PRESETS.find(p => p.id === presetId)
    if (preset) {
      onApplyFilter?.(filters, presetId)
    }
  }

  const resetFilters = () => {
    setFilters({
      blur: 0,
      sharpen: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      sepia: 0,
      opacity: 100,
    })
    setSelectedPreset('none')
  }

  const getFilterStyle = () => {
    if (selectedPreset !== 'none') {
      const preset = FILTER_PRESETS.find(p => p.id === selectedPreset)
      if (preset) return preset.filter
    }
    
    const styles: string[] = []
    if (filters.blur > 0) styles.push(`blur(${filters.blur}px)`)
    if (filters.brightness !== 100) styles.push(`brightness(${filters.brightness / 100})`)
    if (filters.contrast !== 100) styles.push(`contrast(${filters.contrast / 100})`)
    if (filters.saturation !== 100) styles.push(`saturate(${filters.saturation / 100})`)
    if (filters.sepia > 0) styles.push(`sepia(${filters.sepia / 100})`)
    if (filters.opacity !== 100) styles.push(`opacity(${filters.opacity / 100})`)
    
    return styles.length > 0 ? styles.join(' ') : 'none'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter Presets Grid */}
      <div className="grid grid-cols-5 gap-2">
        {FILTER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => applyPreset(preset.id)}
            className={`p-2 text-xs rounded-lg transition-colors ${
              selectedPreset === preset.id
                ? 'bg-accent-cyan text-ui-bg'
                : 'bg-ui-bg hover:bg-ui-border'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Manual Filter Controls */}
      <div className="space-y-3 pt-2 border-t border-ui-border">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Blur</span>
            <span>{filters.blur}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={filters.blur}
            onChange={(e) => updateFilter('blur', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Brightness</span>
            <span>{filters.brightness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={filters.brightness}
            onChange={(e) => updateFilter('brightness', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Contrast</span>
            <span>{filters.contrast}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={filters.contrast}
            onChange={(e) => updateFilter('contrast', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Saturation</span>
            <span>{filters.saturation}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.saturation}
            onChange={(e) => updateFilter('saturation', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Preview Style */}
      {selectedPreset !== 'none' && (
        <div className="text-xs text-text-secondary pt-2">
          CSS: {getFilterStyle()}
        </div>
      )}
    </div>
  )
}

export { FILTER_PRESETS }
export type { FilterControls }