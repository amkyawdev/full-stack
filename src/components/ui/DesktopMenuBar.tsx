'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, Film, Sparkles, Download, Upload, Settings, HelpCircle,
  FileVideo, Crop, Palette, Type, Layers, Save, Undo, Redo
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from './Button'

const menus = [
  {
    label: 'File',
    items: [
      { icon: Upload, label: 'Import Video', shortcut: 'Ctrl+I' },
      { icon: Download, label: 'Export', shortcut: 'Ctrl+E' },
      { icon: Save, label: 'Save Project', shortcut: 'Ctrl+S' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { icon: Undo, label: 'Undo', shortcut: 'Ctrl+Z' },
      { icon: Redo, label: 'Redo', shortcut: 'Ctrl+Y' },
    ],
  },
  {
    label: 'View',
    items: [
      { icon: Film, label: 'Preview', shortcut: 'Space' },
      { icon: Layers, label: 'Timeline', shortcut: 'T' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { icon: Crop, label: 'Resize', shortcut: 'R' },
      { icon: Palette, label: 'Color', shortcut: 'C' },
      { icon: Type, label: 'Subtitles', shortcut: 'S' },
    ],
  },
  {
    label: 'Help',
    items: [
      { icon: HelpCircle, label: 'Documentation', shortcut: 'F1' },
      { icon: Settings, label: 'Settings', shortcut: ',' },
    ],
  },
]

export function DesktopMenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeMenuIndex, setActiveMenuIndex] = useState(-1)

  return (
    <nav className="hidden md:flex items-center h-10 bg-primary-dark border-b border-ui-border px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-6">
        <Film className="w-5 h-5 text-accent-cyan" />
        <span className="text-sm font-medium text-text-primary">Movie Editor</span>
      </div>

      {/* Menu items */}
      <div className="flex items-center">
        {menus.map((menu, index) => (
          <div key={menu.label} className="relative">
            <button
              onClick={() => {
                setActiveMenu(activeMenu === menu.label ? null : menu.label)
                setActiveMenuIndex(index)
              }}
              className={cn(
                'px-3 py-1.5 text-sm rounded transition-colors',
                activeMenu === menu.label
                  ? 'bg-ui-border text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-ui-border/50'
              )}
            >
              {menu.label}
            </button>
            
            {/* Dropdown */}
            {activeMenu === menu.label && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-1 min-w-48 bg-ui-panel border border-ui-border rounded-lg shadow-xl overflow-hidden z-50"
              >
                {menu.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:bg-ui-border hover:text-text-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-xs opacity-50">{item.shortcut}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-xs px-2">
          <Undo className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" className="text-xs px-2">
          <Redo className="w-3 h-3" />
        </Button>
        <Button variant="primary" size="sm" className="text-xs px-3">
          <Upload className="w-3 h-3 mr-1" />
          Import
        </Button>
      </div>
    </nav>
  )
}