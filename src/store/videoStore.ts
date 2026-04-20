import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VideoFile, VideoState, Resolution } from '@/types/video'
import { DEFAULT_RESOLUTION } from '@/lib/constants/resolutions'

interface VideoStore extends VideoState {
  resolution: Resolution
  setCurrentVideo: (video: VideoFile | null) => void
  addVideo: (video: VideoFile) => void
  removeVideo: (id: string) => void
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  setIsMuted: (isMuted: boolean) => void
  setResolution: (resolution: Resolution) => void
  reset: () => void
}

const initialState: VideoState = {
  currentVideo: null,
  videos: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  resolution: DEFAULT_RESOLUTION,
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      ...initialState,
      resolution: DEFAULT_RESOLUTION,
      setCurrentVideo: (video) => set({ currentVideo: video }),
      addVideo: (video) => set((state) => ({ videos: [...state.videos, video] })),
      removeVideo: (id) => set((state) => ({ 
        videos: state.videos.filter((v) => v.id !== id),
        currentVideo: state.currentVideo?.id === id ? null : state.currentVideo,
      })),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setCurrentTime: (currentTime) => set({ currentTime }),
      setDuration: (duration) => set({ duration }),
      setVolume: (volume) => set({ volume }),
      setIsMuted: (isMuted) => set({ isMuted }),
      setResolution: (resolution) => set({ resolution }),
      reset: () => set({ ...initialState, resolution: DEFAULT_RESOLUTION }),
    }),
    {
      name: 'video-store',
      partialize: (state) => ({
        videos: state.videos,
        volume: state.volume,
        isMuted: state.isMuted,
      }),
    }
  )
)