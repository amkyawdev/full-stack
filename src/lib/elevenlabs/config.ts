// ElevenLabs API Configuration and Types

export interface Voice {
  voice_id: string
  name: string
  category: string
  description: string
}

export interface TTSRequest {
  text: string
  voiceId: string
  model?: 'eleven_monolingual_v1' | 'eleven_multilingual_v1' | 'eleven_multilingual_v2'
  stability?: number      // 0-1, higher = more consistent
  similarityBoost?: number  // 0-1, higher = more similar to voice
  style?: number       // 0-1, style strength
  speed?: number       // 0.5-1.5
}

export interface TTSResponse {
  audio_base64: string
  duration: number
}

export interface VoiceSettings {
  stability: number
  similarity_boost: number
  style: number
  speed: number
}

// Default voices (free to use)
export const DEFAULT_VOICES: Voice[] = [
  { voice_id: 'pNInz6obpgDQXm3bL8e3', name: 'Adam', category: 'male', description: 'Deep American male' },
  { voice_id: 'EXAVITQu4vf4t0lqLFiM', name: 'Rachel', category: 'female', description: 'Warm American female' },
  { voice_id: 'N2l3lG9P2V0jWE0L0S8gK', name: 'Domi', category: 'female', description: 'Young female voice' },
  { voice_id: 'SOY1rOkPn5kqjUnmBkaK', name: 'Bella', category: 'female', description: 'Expressive female' },
  { voice_id: 'AZnzlk1M1kLjiYAmqojA', name: 'Antoni', category: 'male', description: 'Confident male' },
  { voice_id: 'oApX3D3nqlLjjqJDEqL', name: 'Thomas', category: 'male', description: 'Narrator voice' },
  { voice_id: 'MFhm3zL1hGWLljD2Eg3d', name: 'Charlie', category: 'male', description: 'Conversational male' },
  { voice_id: 'CwhRB2z5AqE56ndRjQED', name: 'Emily', category: 'female', description: 'Young female' },
  { voice_id: '2E7wii4N3BrlNjlWjG6c', name: 'E2', category: 'multilingual', description: 'Multilingual English' },
]

// Get API key from environment
export function getElevenLabsApiKey(): string {
  return process.env.ELEVENLABS_API_KEY || ''
}

// Check if API is configured
export function hasElevenLabsApiKey(): boolean {
  return !!getElevenLabsApiKey()
}