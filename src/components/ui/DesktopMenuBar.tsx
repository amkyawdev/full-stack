'use client'

import { useState } from 'react'
import { 
  Home, Film, Sparkles, Download, Upload, Settings, HelpCircle,
  FileVideo, Crop, Palette, Type, Layers, Save, Undo, Redo
} from 'lucide-react'
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

  return (
    <nav className="hidden md:flex items-center h-10 bg-[#0f0f1a] border-b border-[#2a2a3e] px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-6">
        <Film className="w-5 h-5 text-cyan-400" />
        <span className="text-sm font-medium text-white">Movie Editor</span>
      </div>

      {/* Menu items */}
      <div className="flex items-center">
        {menus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              onClick={() => {
                setActiveMenu(activeMenu === menu.label ? null : menu.label)
              }}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                activeMenu === menu.label
                  ? 'bg-[#2a2a3e] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2a3e]/50'
              }`}
            >
              {menu.label}
            </button>
            
            {/* Dropdown */}
            {activeMenu === menu.label && (
              <div className="absolute top-full left-0 mt-1 min-w-48 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg shadow-xl overflow-hidden z-50">
                {menu.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:bg-[#2a2a3e] hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-xs opacity-50">{item.shortcut}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick actions */}
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#2a2a3e]">
          <Undo className="w-3 h-3" />
        </button>
        <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#2a2a3e]">
          <Redo className="w-3 h-3" />
        </button>
        <button className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600">
          <Upload className="w-3 h-3" />
          Import
        </button>
      </div>
    </nav>
  )
}