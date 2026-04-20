'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, Play, Pause, Download, AlertCircle, Check, RefreshCw, Globe } from 'lucide-react'
import { Button } from './Button'
import { useTTS } from '@/hooks/useTTS'
import { useTranslation } from '@/hooks/useTranslation'
import { DEFAULT_VOICES } from '@/lib/elevenlabs/config'
import { LANGUAGES } from '@/lib/gemini/config'

interface Voice {
  voice_id: string
  name: string
  category: string
  description: string
}

export function VoiceoverPanel({ onAddToTimeline }: { onAddToTimeline?: (audio: string, duration: number) => void }) {
  const { generateVoice, isGenerating, voices, loadVoices, isConfigured: hasTTS, error: ttsError } = useTTS()
  const { translate, isTranslating, error: transError, isConfigured: hasTranslation } = useTranslation()
  
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('aM5jOKK9G1Ny7eLsKMds')
  const [targetLanguage, setTargetLanguage] = useState('my')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const allVoices = voices.length > 0 ? voices : DEFAULT_VOICES

  useEffect(() => { loadVoices() }, [loadVoices])

  const handleTranslate = async () => {
    if (!text.trim()) return
    const result = await translate(text, targetLanguage, sourceLanguage)
    if (result) setTranslatedText(result)
  }

  const handleGenerate = async () => {
    const textToUse = translatedText || text
    if (!textToUse.trim()) return
    const audio = await generateVoice(textToUse, selectedVoice)
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

  const isConfigured = hasTTS && hasTranslation

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-accent-cyan" />
        <h3 className="font-medium">TTS + Translation</h3>
        {isConfigured && <span className="text-xs text-green-500">● Ready</span>}
      </div>

      {!isConfigured && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="text-xs">
            <p className="text-yellow-500 font-medium">API Keys မပါသးပါ</p>
            <p className="text-text-secondary">ELEVENLABS_API_KEY နဲ့ GEMINI_API_KEY ထည့်ပါးပါ။</p>
          </div>
        </div>
      )}

      {/* Language Selection */}
      <div>
        <label className="block text-sm mb-2">ပါးလို့က် (Target Language)</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(LANGUAGES).slice(0, 6).map(([code, name]) => (
            <button type="button" key={code} onClick={() => setTargetLanguage(code)} className={`px-3 py-2 rounded-lg text-sm ${targetLanguage === code ? 'bg-accent-cyan text-ui-bg' : 'bg-ui-bg'}`}>
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Text */}
      <div>
        <label className="block text-sm mb-2">မူရင်းစာသား ({sourceLanguage.toUpperCase()})</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text in English..." className="w-full h-20 px-3 py-2 bg-ui-bg rounded-lg border border-ui-border resize-none" />
        <p className="text-xs text-text-secondary mt-1">{text.length}/5000</p>
      </div>

      {/* Translate Button */}
      {hasTranslation && (
        <Button variant="secondary" onClick={handleTranslate} disabled={isTranslating || !text.trim()} className="w-full">
          <Globe className="w-4 h-4 mr-2" />
          {isTranslating ? 'ပါးလို့က်ဆဲ့ပါ...' : 'Translate →'}
        </Button>
      )}

      {/* Translated Result */}
      {translatedText && (
        <div className="p-3 bg-green-500/10 rounded-lg">
          <p className="text-sm text-green-500 font-medium mb-1">{LANGUAGES[targetLanguage as keyof typeof LANGUAGES]}:</p>
          <p className="text-sm">{translatedText}</p>
        </div>
      )}

      {/* Voice Selection */}
      <div>
        <label className="block text-sm mb-2">အသံ</label>
        <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto">
          {allVoices.slice(0, 6).map((voice: Voice) => (
            <button type="button" key={voice.voice_id} onClick={() => setSelectedVoice(voice.voice_id)} className={`p-2 rounded-lg text-left text-sm ${selectedVoice === voice.voice_id ? 'bg-accent-cyan text-ui-bg' : 'bg-ui-bg'}`}>
              <div className="font-medium">{voice.name}</div>
              <div className="text-xs opacity-70">{voice.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} disabled={isGenerating || (!text.trim() && !translatedText) || !hasTTS} className="w-full">
        {isGenerating ? 'ထုတ်ပါးဆဲ့ပါ...' : 'Generate Voiceover'}
      </Button>

      {(ttsError || transError) && <div className="p-2 bg-red-500/10 text-red-500 rounded-lg text-sm">{ttsError || transError}</div>}

      {generatedAudio && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">Ready!</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePlay} className="flex-1">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Stop' : 'Play'}
            </Button>
            <Button variant="secondary" onClick={handleDownload}><Download className="w-4 h-4" /></Button>
          </div>
          {onAddToTimeline && <Button onClick={() => onAddToTimeline(generatedAudio, 5)} className="w-full">Add to Timeline</Button>}
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  )
}