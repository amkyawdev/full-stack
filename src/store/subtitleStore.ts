import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SubtitleStyle } from '@/types/animation'

interface SubtitleStore {
  subtitles: Array<{
    id: string
    text: string
    startTime: number
    endTime: number
    style: SubtitleStyle
  }>
  currentSubtitleIndex: number
  selectedSubtitleId: string | null
  addSubtitle: (subtitle: {
    id: string
    text: string
    startTime: number
    endTime: number
    style: SubtitleStyle
  }) => void
  removeSubtitle: (id: string) => void
  updateSubtitle: (id: string, updates: Partial<{
    id: string
    text: string
    startTime: number
    endTime: number
    style: SubtitleStyle
  }>) => void
  setCurrentSubtitleIndex: (index: number) => void
  setSelectedSubtitle: (id: string | null) => void
  reorderSubtitles: (fromIndex: number, toIndex: number) => void
  clearSubtitles: () => void
}

const defaultStyle: SubtitleStyle = {
  fontSize: 24,
  fontColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'bottom',
}

export const useSubtitleStore = create<SubtitleStore>()(
  persist(
    (set) => ({
      subtitles: [],
      currentSubtitleIndex: -1,
      selectedSubtitleId: null,
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
      setSelectedSubtitle: (selectedSubtitleId) => set({ selectedSubtitleId }),
      reorderSubtitles: (fromIndex, toIndex) =>
        set((state) => {
          const newSubtitles = [...state.subtitles]
          const [removed] = newSubtitles.splice(fromIndex, 1)
          newSubtitles.splice(toIndex, 0, removed)
          return { subtitles: newSubtitles }
        }),
      clearSubtitles: () => set({ subtitles: [], currentSubtitleIndex: -1 }),
    }),
    {
      name: 'subtitle-store',
    }
  )
)

export { defaultStyle }