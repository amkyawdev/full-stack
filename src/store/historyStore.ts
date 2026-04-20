import { create } from 'zustand'

interface HistoryEntry {
  id: string
  timestamp: number
  type: 'resolution' | 'color' | 'animation' | 'subtitle' | 'trim' | 'merge'
  previousState: Record<string, any>
  newState: Record<string, any>
  description: string
}

interface HistoryStore {
  history: HistoryEntry[]
  historyIndex: number
  maxHistory: number
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void
  undo: () => HistoryEntry | null
  redo: () => HistoryEntry | null
  canUndo: () => boolean
  canRedo: () => boolean
  clearHistory: () => void
  jumpToIndex: (index: number) => void
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  history: [],
  historyIndex: -1,
  maxHistory: 50,

  addEntry: (entry) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push({
        ...entry,
        id: `history-${Date.now()}`,
        timestamp: Date.now(),
      })

      // Trim if exceeds max
      if (newHistory.length > state.maxHistory) {
        newHistory.shift()
      }

      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  },

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < 0) return null
    
    set((state) => ({ historyIndex: state.historyIndex - 1 }))
    return history[historyIndex]
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex >= history.length - 1) return null
    
    set((state) => ({ historyIndex: state.historyIndex + 1 }))
    return history[historyIndex + 1]
  },

  canUndo: () => get().historyIndex >= 0,

  canRedo: () => {
    const { history, historyIndex } = get()
    return historyIndex < history.length - 1
  },

  clearHistory: () => set({ history: [], historyIndex: -1 }),

  jumpToIndex: (index) => {
    const { history } = get()
    if (index >= 0 && index < history.length) {
      set({ historyIndex: index })
    }
  },
}))