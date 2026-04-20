'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Box, ArrowRight } from 'lucide-react'
import { useDockerStore } from '@/store/dockerStore'
import { Button } from '@/components/ui/Button'

export function DockerControl() {
  const { dockers, reset } = useDockerStore()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed top-20 right-4 z-40">
      <motion.div
        initial={false}
        animate={{ width: isExpanded ? 'auto' : 'auto' }}
        className="bg-ui-panel border border-ui-border rounded-lg shadow-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 p-2">
          <Container className="w-4 h-4 text-accent-cyan" />
          <span className="text-sm text-text-primary">Panels</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Box className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {isExpanded && (
          <div className="px-2 pb-2 space-y-2">
            <div className="text-xs text-text-secondary">
              {dockers.length} panels open
            </div>
            <Button variant="secondary" size="sm" onClick={reset}>
              <ArrowRight className="w-3 h-3 mr-1" />
              Reset All
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}