'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, Play, Pause, Download, AlertCircle, Check } from 'lucide-react'
import { Button } from './Button'
import { useTTS } from '@/hooks/useTTS'
import { DEFAULT_VOICES } from '@/lib/elevenlabs/config'

interface Voice {
  voice_id: string
  name: string
  category: string
  description: string
}

export function VoiceoverPanel({ onAddToTimeline }: { onAddToTimeline?: (audio: string, duration: number) => void }) {
  const { generateVoice, isGenerating, voices, loadVoices, isConfigured, error } = useTTS()
  
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('aM5jOKK9G1Ny7eLsKMds')
  const [language, setLanguage] = useState('my')
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const allVoices = voices.length > 0 ? voices : DEFAULT_VOICES

  useEffect(() => { loadVoices() }, [loadVoices])

  const handleGenerate = async () => {
    if (!text.trim()) return
    const audio = await generateVoice(text, selectedVoice)
    if (audio) setGeneratedAudio(audio)
  }

  const handlePlay = () => {
    if (!generatedAudio) return
    if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false) }
    else {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-accent-cyan" />
        <h3 className="font-medium">မြန်မာ အသံ (Myanmar TTS)</h3>
        {isConfigured && <span className="text-xs text-green-500">●</span>}
      </div>

      {!isConfigured && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="text-yellow-500 font-medium">ElevenLabs API မပါသးပါ</p>
            <p className="text-text-secondary">ELEVENLABS_API_KEY ထည့်ပါးပါ။</p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm mb-2">ဘာသာစကား</label>
        <div className="grid grid-cols-3 gap-2">
          <button type="button" onClick={() => setLanguage('my')} className={`px-3 py-2 rounded-lg text-sm ${language === 'my' ? 'bg-accent-cyan text-ui-bg' : 'bg-ui-bg'}`}>🇲🇲 မြန်မာ</button>
          <button type="button" onClick={() => setLanguage('en')} className={`px-3 py-2 rounded-lg text-sm ${language === 'en' ? 'bg-accent-cyan text-ui-bg' : 'bg-ui-bg'}`}>🇺🇸 English</button>
          <button type="button" onClick={() => setLanguage('th')} className={`px-3 py-2 rounded-lg text-sm ${language === 'th' ? 'bg-accent-cyan text-ui-bg' : 'bg-ui-bg'}`}>🇹🇭 ไทย</button>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">အသံ</label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {allVoices.slice(0, 6).map((voice: Voice) => (
            <button type="button" key={voice.voice_id} onClick={() => setSelectedVoice(voice.voice_id)} className={`p-2 rounded-lg text-left text-sm ${selectedVoice === voice.voice_id ? 'bg-accent-cyan text-ui-bg' : 'bg-ui-bg'}`}>
              <div className="font-medium">{voice.name}</div>
              <div className="text-xs opacity-70">{voice.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">စာသား</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="မြန်မာစာသားကို ရေးပါ..." className="w-full h-24 px-3 py-2 bg-ui-bg rounded-lg border border-ui-border resize-none" />
        <p className="text-xs text-text-secondary mt-1">{text.length}/5000</p>
      </div>

      <Button onClick={handleGenerate} disabled={isGenerating || !text.trim() || !isConfigured} className="w-full">
        {isGenerating ? 'ထုတ်ပါးဆဲ့ပါ...' : 'အသံ ထုတ်ပါ။'}
      </Button>

      {error && <div className="p-2 bg-red-500/10 text-red-500 rounded-lg text-sm">{error}</div>}

      {generatedAudio && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">အသံ ပါးပါ ပြီးဆုံး!</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePlay} className="flex-1">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'ရပ်ပါ။' : 'ဖွင့်ပါ။'}
            </Button>
            <Button variant="secondary" onClick={handleDownload}><Download className="w-4 h-4" /></Button>
          </div>
          {onAddToTimeline && <Button onClick={() => onAddToTimeline(generatedAudio, 5)} className="w-full">တိုင်းမှာ ထည့်ပါ။</Button>}
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  )
}