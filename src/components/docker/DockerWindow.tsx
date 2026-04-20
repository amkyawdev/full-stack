'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X, Minimize2, GripVertical } from 'lucide-react'
import { useDockerStore } from '@/store/dockerStore'
import { cn } from '@/lib/utils/cn'

interface DockerWindowProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function DockerWindow({ id, title, children, className }: DockerWindowProps) {
  const { dockers, updateDocker, removeDocker } = useDockerStore()
  const docker = dockers.find((d) => d.id === id)

  if (!docker) return null

  const handleCollapse = () => {
    updateDocker(id, { isCollapsed: !docker.isCollapsed })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: docker.position.x,
        y: docker.position.y,
      }}
      style={{ 
        position: 'absolute',
        zIndex: docker.zIndex,
      }}
      className={cn(
        'bg-ui-panel rounded-lg border border-ui-border shadow-xl overflow-hidden',
        'transition-shadow',
        className
      )}
    >
      {/* Header - Draggable */}
      <div className="flex items-center justify-between px-3 py-2 bg-primary-dark border-b border-ui-border select-none cursor-move">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-text-secondary" />
          <span className="text-sm font-medium text-text-primary">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCollapse}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeDocker(id)}
            className="p-1 text-text-secondary hover:text-button-danger transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!docker.isCollapsed && (
        <div className="p-4 overflow-auto" style={{ maxHeight: docker.size.height }}>
          {children}
        </div>
      )}
    </motion.div>
  )
}