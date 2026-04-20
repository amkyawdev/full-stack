'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFont } from 'react-icons/fa'
import { useSubtitleStore, defaultStyle } from '@/store/subtitleStore'
import { FONT_SIZES, FONT_FAMILIES } from '@/lib/constants/fonts'
import { FONT_COLORS, BG_COLORS } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'
import { SubtitleStyle } from '@/types/animation'
import { Button } from './Button'

export function SubtitleEditor() {
  const { subtitles, addSubtitle, removeSubtitle, updateSubtitle, selectedSubtitleId, setSelectedSubtitle } = useSubtitleStore()
  const [newText, setNewText] = useState('')
  const [style, setStyle] = useState<SubtitleStyle>(defaultStyle)

  const handleAddSubtitle = () => {
    if (!newText.trim()) return
    
    const id = `subtitle-${Date.now()}`
    addSubtitle({
      id,
      text: newText,
      startTime: 0,
      endTime: 3,
      style,
    })
    setNewText('')
  }

  const handleUpdateStyle = (updates: Partial<SubtitleStyle>) => {
    const newStyle = { ...style, ...updates }
    setStyle(newStyle)
    
    if (selectedSubtitleId) {
      updateSubtitle(selectedSubtitleId, { style: newStyle })
    }
  }

  return (
    <div className="space-y-4">
      {/* Add new subtitle */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
          <FaFont className="w-4 h-4" />
          Add Subtitle
        </h3>
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Enter subtitle text..."
          className="w-full px-3 py-2 bg-ui-bg border border-ui-border rounded-lg text-text-primary placeholder:text-text-secondary resize-none"
          rows={2}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddSubtitle}
          disabled={!newText.trim()}
          className="mt-2 w-full"
        >
          Add Subtitle
        </Button>
      </div>

      {/* Font Size */}
      <div>
        <h4 className="text-xs text-text-secondary mb-1">Font Size</h4>
        <div className="flex gap-1">
          {FONT_SIZES.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUpdateStyle({ fontSize: size })}
              className={cn(
                'flex-1 px-2 py-1 rounded text-xs font-medium',
                style.fontSize === size
                  ? 'bg-button-primary text-white'
                  : 'bg-ui-border text-text-secondary'
              )}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Font Color */}
      <div>
        <h4 className="text-xs text-text-secondary mb-1">Font Color</h4>
        <div className="flex gap-1">
          {FONT_COLORS.map((color) => (
            <motion.button
              key={color.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUpdateStyle({ fontColor: color.value })}
              className={cn(
                'w-8 h-8 rounded-full border-2',
                style.fontColor === color.value
                  ? 'border-accent-cyan'
                  : 'border-transparent'
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div>
        <h4 className="text-xs text-text-secondary mb-1">Background</h4>
        <div className="flex gap-1">
          {BG_COLORS.map((color) => (
            <motion.button
              key={color.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUpdateStyle({ backgroundColor: color.value })}
              className={cn(
                'w-8 h-8 rounded border-2',
                style.backgroundColor === color.value
                  ? 'border-accent-cyan'
                  : 'border-ui-border'
              )}
              style={{ 
                backgroundColor: color.value === 'transparent' ? '#1a1a2e' : color.value,
                backgroundImage: color.value === 'transparent' ? 'linear-gradient(45deg, #666 25%, transparent 25%), linear-gradient(-45deg, #666 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(-45deg, transparent 75%, #666 75%)' : 'none',
                backgroundSize: color.value === 'transparent' ? '8px 8px' : 'auto',
                backgroundPosition: color.value === 'transparent' ? '0 0, 0 4px, 4px -4px, -4px 0px' : 'auto',
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <h4 className="text-xs text-text-secondary mb-1">Font Family</h4>
        <div className="space-y-1">
          {FONT_FAMILIES.map((font) => (
            <motion.button
              key={font.name}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleUpdateStyle({ fontFamily: font.value })}
              className={cn(
                'w-full px-2 py-1.5 rounded text-xs text-left',
                style.fontFamily === font.value
                  ? 'bg-button-primary text-white'
                  : 'bg-ui-border text-text-secondary'
              )}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Subtitle Timeline */}
      <div>
        <h4 className="text-xs text-text-secondary mb-1">Subtitles ({subtitles.length})</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {subtitles.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubtitle(sub.id)}
              className={cn(
                'flex items-center justify-between px-2 py-1 rounded text-xs cursor-pointer',
                selectedSubtitleId === sub.id
                  ? 'bg-button-primary text-white'
                  : 'bg-ui-border text-text-secondary'
              )}
            >
              <span className="truncate flex-1">{sub.text}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeSubtitle(sub.id)
                }}
                className="ml-2 hover:text-button-danger"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}