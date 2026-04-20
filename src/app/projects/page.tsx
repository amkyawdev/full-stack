'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FolderOpen, Plus, Trash2, Edit, Play, Clock, FileVideo } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Project {
  id: string
  name: string
  thumbnail: string
  duration: number
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'processing' | 'completed'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock projects for demo
  useEffect(() => {
    setProjects([
      {
        id: '1',
        name: 'My Vacation',
        thumbnail: '',
        duration: 120,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-16'),
        status: 'completed',
      },
      {
        id: '2',
        name: 'Product Demo',
        thumbnail: '',
        duration: 60,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12'),
        status: 'processing',
      },
      {
        id: '3',
        name: 'Wedding Highlights',
        thumbnail: '',
        duration: 300,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-08'),
        status: 'draft',
      },
    ])
    setIsLoading(false)
  }, [])

  const deleteProject = (id: string) => {
    if (confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-ui-bg p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-accent-cyan" />
            My Projects
          </h1>
          <Link href="/editor">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-20">Loading...</div>
        ) : projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FileVideo className="w-20 h-20 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No projects yet</p>
            <Link href="/editor">
              <Button>Create Your First Video</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ui-panel rounded-xl overflow-hidden hover:ring-2 hover:ring-accent-cyan transition-all"
              >
                {/* Thumbnail */}
                <Link href={`/editor/${project.id}`}>
                  <div className="aspect-video bg-ui-bg relative group">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileVideo className="w-16 h-16 text-text-secondary opacity-30" />
                      </div>
                    )}
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                      {formatDuration(project.duration)}
                    </div>
                    {/* Status indicator */}
                    <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </Link>
                
                {/* Info */}
                <div className="p-4">
                  <Link href={`/editor/${project.id}`}>
                    <h3 className="font-medium mb-2 hover:text-accent-cyan transition-colors">
                      {project.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.updatedAt.toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/editor/${project.id}`}>
                        <button className="p-1 hover:text-accent-cyan">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-1 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}