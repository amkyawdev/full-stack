import { MovieAnimation, TextAnimation, TitleAnimation } from '@/types/animation'

export const MOVIE_ANIMATIONS: MovieAnimation[] = [
  { type: 'fade', direction: 'in', duration: 500 },
  { type: 'fade', direction: 'out', duration: 500 },
  { type: 'slide', direction: 'in', duration: 400 },
  { type: 'slide', direction: 'out', duration: 400 },
  { type: 'zoom', direction: 'in', duration: 300 },
  { type: 'zoom', direction: 'out', duration: 300 },
  { type: 'rotate', direction: 'in', duration: 500 },
  { type: 'rotate', direction: 'out', duration: 500 },
  { type: 'blur', direction: 'in', duration: 400 },
  { type: 'blur', direction: 'out', duration: 400 },
]

export const TEXT_ANIMATIONS: TextAnimation[] = [
  { type: 'typewriter', duration: 2000 },
  { type: 'bounce', duration: 600 },
  { type: 'glow', duration: 2000 },
  { type: 'float', duration: 400 },
  { type: 'shake', duration: 500 },
]

export const TITLE_ANIMATIONS: TitleAnimation[] = [
  { type: 'fade', duration: 1000 },
  { type: 'slide', duration: 800 },
  { type: 'zoom', duration: 600 },
  { type: 'typewriter', duration: 2000 },
  { type: 'glow', duration: 1500 },
]