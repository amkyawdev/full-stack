import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MovieAnimation, TextAnimation, TitleAnimation, Subtitle } from '@/types/animation'

interface AnimationStore {
  movieAnimations: MovieAnimation[]
  textAnimation: TextAnimation | null
  titleAnimation: TitleAnimation | null
  subtitles: Subtitle[]
  currentSubtitleIndex: number
  addMovieAnimation: (animation: MovieAnimation) => void
  removeMovieAnimation: (index: number) => void
  setMovieAnimations: (animations: MovieAnimation[]) => void
  setTextAnimation: (animation: TextAnimation | null) => void
  setTitleAnimation: (animation: TitleAnimation | null) => void
  addSubtitle: (subtitle: Subtitle) => void
  removeSubtitle: (id: string) => void
  updateSubtitle: (id: string, subtitle: Partial<Subtitle>) => void
  setCurrentSubtitleIndex: (index: number) => void
  clearAnimations: () => void
}

const initialState = {
  movieAnimations: [],
  textAnimation: null,
  titleAnimation: null,
  subtitles: [],
  currentSubtitleIndex: -1,
}

export const useAnimationStore = create<AnimationStore>()(
  persist(
    (set) => ({
      ...initialState,
      addMovieAnimation: (animation) => 
        set((state) => ({ movieAnimations: [...state.movieAnimations, animation] })),
      removeMovieAnimation: (index) =>
        set((state) => ({
          movieAnimations: state.movieAnimations.filter((_, i) => i !== index),
        })),
      setMovieAnimations: (movieAnimations) => set({ movieAnimations }),
      setTextAnimation: (textAnimation) => set({ textAnimation }),
      setTitleAnimation: (titleAnimation) => set({ titleAnimation }),
      addSubtitle: (subtitle) =>
        set((state) => ({ subtitles: [...state.subtitles, subtitle] })),
      removeSubtitle: (id) =>
        set((state) => ({
          subtitles: state.subtitles.filter((s) => s.id !== id),
        })),
      updateSubtitle: (id, updates) =>
        set((state) => ({
          subtitles: state.subtitles.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      setCurrentSubtitleIndex: (currentSubtitleIndex) => set({ currentSubtitleIndex }),
      clearAnimations: () => set(initialState),
    }),
    {
      name: 'animation-store',
    }
  )
)