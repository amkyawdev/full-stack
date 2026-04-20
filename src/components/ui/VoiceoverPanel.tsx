'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, Play, Pause, Download, Settings, AlertCircle, Check } from 'lucide-react'
import { Button } from './Button'
import { useTTS } from '@/hooks/useTTS'
import { DEFAULT_VOICES } from '@/lib/elevenlabs/config'

interface Voice {
  voice_id: string
  name: string
  category: string
  description: string
}

interface VoiceoverPanelProps {
  onAddToTimeline?: (audioBase64: string, duration: number) => void
}

export function VoiceoverPanel({ onAddToTimeline }: VoiceoverPanelProps) {
  const { generateVoice, isGenerating, voices, loadVoices, isConfigured, error } = useTTS()
  
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('EXAVITQu4vf4t0lqLFiM')
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load voices on mount
  useEffect(() => {
    loadVoices()
  }, [loadVoices])

  const allVoices = voices.length > 0 ? voices : DEFAULT_VOICES

  const handleGenerate = async () => {
    if (!text.trim()) return

    const audioBase64 = await generateVoice(text, selectedVoice)
    if (audioBase64) {
      setGeneratedAudio(audioBase64)
    }
  }

  const handlePlay = () => {
    if (!generatedAudio) return

    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      const audio = new Audio(`data:audio/mp3;base64,${generatedAudio}`)
      audioRef.current = audio
      audio.onended = () => setIsPlaying(false)
      audio.play()
      setIsPlaying(true)
    }
  }

  const handleDownload = () => {
    if (!generatedAudio) return

    const link = document.createElement('a')
    link.href = `data:audio/mp3;base64,${generatedAudio}`
    link.download = `voiceover_${Date.now()}.mp3`
    link.click()
  }

  const handleAddToTimeline = () => {
    if (generatedAudio && onAddToTimeline) {
      onAddToTimeline(generatedAudio, 5) // Approximate duration
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-accent-cyan" />
        <h3 className="font-medium">Voiceover (TTS)</h3>
        {isConfigured && <span className="text-xs text-green-500">API Connected</span>}
      </div>

      {/* API Key Warning */}
      {!isConfigured && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="text-yellow-500 font-medium">ElevenLabs API Not Configured</p>
            <p className="text-text-secondary">Set ELEVENLABS_API_KEY in .env.local to generate voiceovers</p>
          </div>
        </div>
      )}

      {/* Text Input */}
      <div>
        <label className="block text-sm mb-2">Text to Convert</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for voiceover..."
          className="w-full h-24 px-3 py-2 bg-ui-bg rounded-lg border border-ui-border resize-none"
        />
        <p className="text-xs text-text-secondary mt-1">{text.length}/5000 characters</p>
      </div>

      {/* Voice Selection */}
      <div>
        <label className="block text-sm mb-2">Voice</label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {allVoices.slice(0, 10).map((voice: Voice) => (
            <button
              key={voice.voice_id}
              onClick={() => setSelectedVoice(voice.voice_id)}
              className={`p-2 rounded-lg text-left text-sm transition-colors ${
                selectedVoice === voice.voice_id
                  ? 'bg-accent-cyan text-ui-bg'
                  : 'bg-ui-bg hover:bg-ui-border'
              }`}
            >
              <div className="font-medium">{voice.name}</div>
              <div className="text-xs opacity-70">{voice.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={handleGenerate} 
        disabled={isGenerating || !text.trim() || !isConfigured}
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate Voiceover'}
      </Button>

      {/* Error */}
      {error && (
        <div className="p-2 bg-red-500/10 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Generated Audio Controls */}
      {generatedAudio && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">Voiceover generated!</span>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePlay} className="flex-1">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2 pt-2 border-t border-ui-border">
            <Button 
              onClick={handleAddToTimeline} 
              className="flex-1"
              size="sm"
            >
              Add to Timeline
            </Button>
          </div>

          <audio ref={audioRef} />
        </div>
      )}
    </div>
  )
}