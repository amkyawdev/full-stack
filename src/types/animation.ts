export type MovieAnimationType = 'fade' | 'slide' | 'zoom' | 'rotate' | 'blur'
export type AnimationDirection = 'in' | 'out'

export type MovieAnimation = {
  type: MovieAnimationType
  direction: AnimationDirection
  duration: number
}

export type TextAnimationType = 'typewriter' | 'bounce' | 'glow' | 'float' | 'shake'

export type TextAnimation = {
  type: TextAnimationType
  duration: number
}

export type TitleAnimationType = 'fade' | 'slide' | 'zoom' | 'typewriter' | 'glow'

export type TitleAnimation = {
  type: TitleAnimationType
  duration: number
}

export type SubtitleStyle = {
  fontSize: number
  fontColor: string
  fontFamily: string
  backgroundColor: string
  position: 'top' | 'bottom' | 'center'
}

export type Subtitle = {
  id: string
  text: string
  startTime: number
  endTime: number
  style: SubtitleStyle
}

export type AnimationState = {
  movieAnimations: MovieAnimation[]
  textAnimation: TextAnimation | null
  titleAnimation: TitleAnimation | null
  subtitles: Subtitle[]
  currentSubtitleIndex: number
}