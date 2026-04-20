import { ColorPreset } from '@/types/video'

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Vivid', brightness: 1.1, contrast: 1.2, saturation: 1.3 },
  { name: 'Vintage', brightness: 0.9, contrast: 0.8, saturation: 0.7 },
  { name: 'Cinematic', brightness: 0.95, contrast: 1.15, saturation: 1.1 },
  { name: 'Black & White', brightness: 1, contrast: 1.1, saturation: 0 },
  { name: 'Warm', brightness: 1.05, contrast: 1.1, saturation: 1.15, temperature: 7000 },
]

export const FONT_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Yellow', value: '#ffff00' },
  { name: 'Green', value: '#00ff00' },
  { name: 'Red', value: '#ff0000' },
  { name: 'Cyan', value: '#00ffff' },
]

export const BG_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Dark Gray', value: '#333333' },
  { name: 'Gray', value: '#666666' },
  { name: 'Transparent', value: 'transparent' },
  { name: 'Semi-transparent', value: 'rgba(0,0,0,0.5)' },
]