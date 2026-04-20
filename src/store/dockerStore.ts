import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Docker } from '@/types/docker'

interface DockerStore {
  dockers: Docker[]
  activeDockerId: string | null
  addDocker: (docker: Docker) => void
  removeDocker: (id: string) => void
  updateDocker: (id: string, updates: Partial<Docker>) => void
  setActiveDocker: (id: string | null) => void
  bringToFront: (id: string) => void
  reset: () => void
}

const defaultDockers: Docker[] = [
  {
    id: 'effects',
    title: 'Effects',
    position: { x: 20, y: 20 },
    size: { width: 300, height: 400 },
    isCollapsed: false,
    isDraggable: true,
    zIndex: 1,
  },
  {
    id: 'color',
    title: 'Color Controls',
    position: { x: 340, y: 20 },
    size: { width: 280, height: 350 },
    isCollapsed: false,
    isDraggable: true,
    zIndex: 2,
  },
  {
    id: 'animation',
    title: 'Animation',
    position: { x: 640, y: 20 },
    size: { width: 260, height: 320 },
    isCollapsed: false,
    isDraggable: true,
    zIndex: 3,
  },
  {
    id: 'subtitle',
    title: 'Subtitles',
    position: { x: 920, y: 20 },
    size: { width: 300, height: 380 },
    isCollapsed: false,
    isDraggable: true,
    zIndex: 4,
  },
]

export const useDockerStore = create<DockerStore>()(
  persist(
    (set) => ({
      dockers: defaultDockers,
      activeDockerId: null,
      addDocker: (docker) =>
        set((state) => ({ dockers: [...state.dockers, docker] })),
      removeDocker: (id) =>
        set((state) => ({
          dockers: state.dockers.filter((d) => d.id !== id),
        })),
      updateDocker: (id, updates) =>
        set((state) => ({
          dockers: state.dockers.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        })),
      setActiveDocker: (activeDockerId) => set({ activeDockerId }),
      bringToFront: (id) =>
        set((state) => {
          const maxZ = Math.max(...state.dockers.map((d) => d.zIndex))
          return {
            dockers: state.dockers.map((d) =>
              d.id === id ? { ...d, zIndex: maxZ + 1 } : d
            ),
          }
        }),
      reset: () => set({ dockers: defaultDockers, activeDockerId: null }),
    }),
    {
      name: 'docker-store',
      partialize: (state) => ({
        dockers: state.dockers.map((d) => ({
          id: d.id,
          position: d.position,
          isCollapsed: d.isCollapsed,
          zIndex: d.zIndex,
        })),
      }),
    }
  )
)