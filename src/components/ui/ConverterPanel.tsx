'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BiExport, BiImport } from 'react-icons/bi'
import { useVideoStore } from '@/store/videoStore'
import { cn } from '@/lib/utils/cn'
import { Button } from './Button'

type ExportFormat = 'mp4' | 'webm' | 'mov'

export function ConverterPanel() {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('mp4')
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCompare, setShowCompare] = useState(false)
  
  const { currentVideo } = useVideoStore()

  const handleExport = async () => {
    if (!currentVideo) return
    
    setIsExporting(true)
    setProgress(0)
    
    // Simulate export progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleDownload = () => {
    // In a real app, this would trigger a download
    alert(`Download as ${exportFormat.toUpperCase()}`)
  }

  return (
    <div className="space-y-4">
      {/* Compare view toggle */}
      <div>
        <Button
          variant={showCompare ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setShowCompare(!showCompare)}
          className="w-full"
        >
          {showCompare ? '◫ Compare' : '⊞ Compare'} View
        </Button>
      </div>

      {/* Export format selection */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
          <BiExport className="w-4 h-4" />
          Export Format
        </h3>
        <div className="flex gap-2">
          {(['mp4', 'webm', 'mov'] as ExportFormat[]).map((format) => (
            <motion.button
              key={format}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExportFormat(format)}
              className={cn(
                'flex-1 px-3 py-2 rounded-lg text-sm font-medium uppercase',
                exportFormat === format
                  ? 'bg-button-primary text-white'
                  : 'bg-ui-border text-text-secondary'
              )}
            >
              {format}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Export progress */}
      {isExporting && (
        <div>
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-ui-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-button-success"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Export button */}
      <Button
        variant="success"
        size="sm"
        onClick={handleExport}
        disabled={!currentVideo || isExporting}
        isLoading={isExporting}
        className="w-full"
      >
        <BiExport className="w-4 h-4" />
        {isExporting ? 'Exporting...' : 'Export Video'}
      </Button>

      {/* Download button (shows after export) */}
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownload}
            className="w-full"
          >
            <BiImport className="w-4 h-4" />
            Download {exportFormat.toUpperCase()}
          </Button>
        </motion.div>
      )}

      {/* Video info */}
      {currentVideo && (
        <div className="text-xs text-text-secondary">
          <p>Original: {currentVideo.name}</p>
          <p>Duration: {currentVideo.duration}s</p>
          <p>Size: {(currentVideo.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  )
}