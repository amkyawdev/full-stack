'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, FileVideo, Check, Loader, Mail, Share2, Zap, Crown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ExportOptions {
  format: 'mp4' | 'webm' | 'mov'
  quality: '480p' | '720p' | '1080p' | '4k'
  fps: 30 | 60
  codec: 'h264' | 'h265' | 'vp9'
}

interface ExportJob {
  id: string
  name: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  url?: string
  createdAt: Date
}

export default function ExportPage() {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'mp4',
    quality: '1080p',
    fps: 30,
    codec: 'h264',
  })
  
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([])
  const [isExporting, setIsExporting] = useState(false)

  // Mock export jobs
  useEffect(() => {
    setExportJobs([
      {
        id: '1',
        name: 'My Vacation.mp4',
        status: 'completed',
        progress: 100,
        url: '/exports/vacation.mp4',
        createdAt: new Date('2024-01-16'),
      },
      {
        id: '2',
        name: 'Product Demo.mp4',
        status: 'processing',
        progress: 65,
        createdAt: new Date(),
      },
    ])
  }, [])

  const updateOption = <K extends keyof ExportOptions>(key: K, value: ExportOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  const startExport = async () => {
    setIsExporting(true)
    // Simulate export
    setTimeout(() => {
      setIsExporting(false)
      setExportJobs(prev => [{
        id: Date.now().toString(),
        name: `video_${Date.now()}.${options.format}`,
        status: 'processing',
        progress: 0,
        createdAt: new Date(),
      }, ...prev])
    }, 1000)
  }

  const getFormatSize = () => {
    const baseSize = 100 // MB
    const qualityMultiplier = options.quality === '4k' ? 4 : options.quality === '1080p' ? 2 : 1
    return Math.round(baseSize * qualityMultiplier)
  }

  const getFormatLabel = () => {
    const labels: Record<string, string> = {
      'mp4': 'MP4 (H.264)',
      'webm': 'WebM (VP9)',
      'mov': 'MOV (ProRes)',
    }
    return labels[options.format]
  }

  return (
    <div className="min-h-screen bg-ui-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8">
          <Download className="w-8 h-8 text-accent-cyan" />
          Export Video
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Export Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ui-panel rounded-xl p-6"
          >
            <h2 className="text-xl font-medium mb-6">Export Settings</h2>

            <div className="space-y-6">
              {/* Format */}
              <div>
                <label className="block text-sm mb-3">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mp4', 'webm', 'mov'] as const).map(format => (
                    <button
                      key={format}
                      onClick={() => updateOption('format', format)}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        options.format === format
                          ? 'bg-accent-cyan text-ui-bg'
                          : 'bg-ui-bg hover:bg-ui-border'
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-sm mb-3">Resolution</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['480p', '720p', '1080p', '4k'] as const).map(quality => (
                    <button
                      key={quality}
                      onClick={() => updateOption('quality', quality)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        options.quality === quality
                          ? 'bg-accent-cyan text-ui-bg'
                          : 'bg-ui-bg hover:bg-ui-border'
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>

              {/* FPS */}
              <div>
                <label className="block text-sm mb-3">Frame Rate</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateOption('fps', 30)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      options.fps === 30
                        ? 'bg-accent-cyan text-ui-bg'
                        : 'bg-ui-bg hover:bg-ui-border'
                    }`}
                  >
                    30 FPS
                  </button>
                  <button
                    onClick={() => updateOption('fps', 60)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      options.fps === 60
                        ? 'bg-accent-cyan text-ui-bg'
                        : 'bg-ui-bg hover:bg-ui-border'
                    }`}
                  >
                    60 FPS
                  </button>
                </div>
              </div>

              {/* Codec */}
              <div>
                <label className="block text-sm mb-3">Codec</label>
                <select
                  value={options.codec}
                  onChange={(e) => updateOption('codec', e.target.value as any)}
                  className="w-full px-4 py-2 bg-ui-bg rounded-lg border border-ui-border"
                >
                  <option value="h264">H.264 (Best Compatibility)</option>
                  <option value="h265">H.265 (HEVC - Smaller File)</option>
                  <option value="vp9">VP9 (WebM)</option>
                </select>
              </div>

              {/* Info */}
              <div className="p-4 bg-ui-bg rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Format</span>
                  <span>{getFormatLabel()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Resolution</span>
                  <span>{options.quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Frame Rate</span>
                  <span>{options.fps} FPS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Est. Size</span>
                  <span>~{getFormatSize()} MB</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={startExport}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Export Video
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Export History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ui-panel rounded-xl p-6"
          >
            <h2 className="text-xl font-medium mb-6">Export History</h2>

            {exportJobs.length === 0 ? (
              <div className="text-center py-12 text-text-secondary">
                <FileVideo className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No exports yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {exportJobs.map(job => (
                  <div
                    key={job.id}
                    className="p-4 bg-ui-bg rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-sm">{job.name}</h3>
                        <p className="text-xs text-text-secondary">
                          {job.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      {job.status === 'completed' ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : job.status === 'processing' ? (
                        <Loader className="w-5 h-5 text-accent-cyan animate-spin" />
                      ) : job.status === 'failed' ? (
                        <span className="text-red-500 text-sm">Failed</span>
                      ) : null}
                    </div>

                    {job.status === 'processing' && (
                      <div className="mb-2">
                        <div className="h-2 bg-ui-panel rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent-cyan rounded-full transition-all"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-text-secondary mt-1">
                          {job.progress}% complete
                        </p>
                      </div>
                    )}

                    {job.status === 'completed' && job.url && (
                      <div className="flex gap-2">
                        <a 
                          href={job.url} 
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent-cyan text-ui-bg rounded-lg text-sm hover:opacity-90"
                          download
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                        <button className="p-2 bg-ui-panel rounded-lg hover:bg-ui-border">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-ui-panel rounded-lg hover:bg-ui-border">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}