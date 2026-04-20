import { MovieAnimation } from './animation'

export type Resolution = {
  label: string
  width: number
  height: number
}

export type VideoFile = {
  id: string
  name: string
  url: string
  duration: number
  width: number
  height: number
  size: number
  type: string
  createdAt: Date
}

export type VideoState = {
  currentVideo: VideoFile | null
  videos: VideoFile[]
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  resolution: Resolution
}

export type ColorPreset = {
  name: string
  brightness: number
  contrast: number
  saturation: number
  temperature?: number
}

export type VideoFilter = {
  resolution: Resolution
  colorPreset: ColorPreset | null
  appliedAnimation: MovieAnimation | null
}

export type ProcessingStatus = {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  message?: string
  outputUrl?: string
}