'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Film, Download, Eye, Users, Heart, Award, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Template {
  id: string
  name: string
  description: string
  category: string
  duration: string
  thumbnail: string
  downloads: number
  rating: number
  isPremium: boolean
}

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Cinematic Intro',
    description: 'Professional opening with title reveal',
    category: 'Intro',
    duration: '0:05',
    thumbnail: '',
    downloads: 1250,
    rating: 4.8,
    isPremium: false,
  },
  {
    id: '2',
    name: 'Travel Vlog',
    description: 'Dynamic transitions for travel content',
    category: 'Vlog',
    duration: '0:15',
    thumbnail: '',
    downloads: 890,
    rating: 4.6,
    isPremium: false,
  },
  {
    id: '3',
    name: 'Product Showcase',
    description: 'Clean template for product demos',
    category: 'Business',
    duration: '0:30',
    thumbnail: '',
    downloads: 2100,
    rating: 4.9,
    isPremium: true,
  },
  {
    id: '4',
    name: 'Wedding Highlights',
    description: 'Romantic compilation template',
    category: 'Event',
    duration: '3:00',
    thumbnail: '',
    downloads: 750,
    rating: 4.7,
    isPremium: true,
  },
  {
    id: '5',
    name: 'Social Media Pack',
    description: 'TikTok, Reels, Shorts templates',
    category: 'Social',
    duration: '0:15',
    thumbnail: '',
    downloads: 3200,
    rating: 4.5,
    isPremium: false,
  },
  {
    id: '6',
    name: 'Music Video',
    description: 'Beat-synced visual template',
    category: 'Music',
    duration: '3:30',
    thumbnail: '',
    downloads: 560,
    rating: 4.8,
    isPremium: true,
  },
]

const CATEGORIES = ['All', 'Intro', 'Vlog', 'Business', 'Event', 'Social', 'Music']

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  const filteredTemplates = selectedCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory)

  return (
    <div className="min-h-screen bg-ui-bg p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
            <Film className="w-8 h-8 text-accent-cyan" />
            Video Templates
          </h1>
          <p className="text-text-secondary mt-2">
            Professional templates for your videos
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-accent-cyan text-ui-bg'
                  : 'bg-ui-panel hover:bg-ui-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ui-panel rounded-xl overflow-hidden hover:ring-2 hover:ring-accent-cyan transition-all group"
            >
              {/* Thumbnail */}
              <div 
                className="aspect-video bg-ui-bg relative cursor-pointer"
                onClick={() => setPreviewTemplate(template)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-text-secondary opacity-30" />
                </div>
                {template.isPremium && (
                  <div className="absolute top-2 right-2 bg-accent-purple px-2 py-1 rounded text-xs font-medium">
                    PRO
                  </div>
                )}
                {/* Preview overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-text-secondary">{template.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{template.category} • {template.duration}</span>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {template.downloads}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{template.rating}</span>
                  </div>
                  <Link href={`/editor?template=${template.id}`}>
                    <Button size="sm">Use</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preview Modal */}
        {previewTemplate && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-ui-panel rounded-xl max-w-2xl w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video bg-ui-bg rounded-lg mb-4 flex items-center justify-center">
                <Film className="w-20 h-20 text-text-secondary opacity-30" />
              </div>
              <h3 className="text-xl font-medium mb-2">{previewTemplate.name}</h3>
              <p className="text-text-secondary mb-4">{previewTemplate.description}</p>
              
              <div className="flex gap-3">
                <Link href={`/editor?template=${previewTemplate.id}`} className="flex-1">
                  <Button className="w-full">
                    Use This Template
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => setPreviewTemplate(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}