'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GripVertical, X, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useDockerStore } from '@/store/dockerStore'
import { Button } from './Button'

interface DockerPanelProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function DockerPanel({ id, title, children, className }: DockerPanelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)
  
  const { dockers, updateDocker, bringToFront, activeDockerId, setActiveDocker } = useDockerStore()
  const docker = dockers.find((d) => d.id === id)
  
  if (!docker) return null

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!docker.isDraggable) return
    e.preventDefault()
    setIsDragging(true)
    setActiveDocker(id)
    bringToFront(id)
    
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    updateDocker(id, {
      position: { x: Math.max(0, newX), y: Math.max(0, newY) },
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  const toggleCollapse = () => {
    updateDocker(id, { isCollapsed: !docker.isCollapsed })
  }

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: docker.position.x,
        y: docker.position.y,
        zIndex: docker.zIndex,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ position: 'absolute' }}
      className={cn(
        'bg-ui-panel rounded-lg shadow-xl border border-ui-border overflow-hidden',
        'transition-shadow',
        isDragging ? 'shadow-2xl ring-2 ring-accent-cyan' : 'shadow-lg',
        docker.isCollapsed ? 'h-auto' : '',
        className
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-3 py-2 bg-primary-dark border-b border-ui-border cursor-move',
          'select-none'
        )}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-text-secondary" />
          <span className="text-sm font-medium text-text-primary">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="p-1"
            aria-label={docker.isCollapsed ? 'Expand' : 'Collapse'}
          >
            {docker.isCollapsed ? (
              <Minimize2 className="w-4 h-4 rotate-180" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateDocker(id, { isCollapsed: true })}
            className="p-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!docker.isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-auto"
            style={{ maxHeight: docker.size.height }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}