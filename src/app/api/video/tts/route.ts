import { NextRequest, NextResponse } from 'next/server'
import { getElevenLabsApiKey, DEFAULT_VOICES } from '@/lib/elevenlabs/config'

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1'

export async function POST(request: NextRequest) {
  try {
    const apiKey = getElevenLabsApiKey()
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      text, 
      voiceId = 'EXAVITQu4vf4t0lqLFiM',
      language = 'my',  // Default to Burmese for Myanmar voiceover
      model = 'eleven_multilingual_v2',  // Supports Myanmar
      stability = 0.5,
      similarityBoost = 0.75,
      style = 0.3,
      speed = 1.0,
    } = body

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Call ElevenLabs TTS API
    const response = await fetch(`${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: { stability, similarity_boost: similarityBoost, style, speed },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('ElevenLabs error:', error)
      return NextResponse.json({ error: 'TTS failed', details: error }, { status: response.status })
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const audioBase64 = buffer.toString('base64')

    return NextResponse.json({
      success: true,
      audioBase64,
      format: 'mp3',
      voiceId,
    })
  } catch (error) {
    console.error('TTS error:', error)
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 })
  }
}

export async function GET() {
  const apiKey = getElevenLabsApiKey()
  
  if (!apiKey) {
    return NextResponse.json({ voices: DEFAULT_VOICES, isConfigured: false })
  }

  try {
    const response = await fetch(`${ELEVENLABS_API_BASE}/voices`, {
      headers: { 'xi-api-key': apiKey },
    })

    const data = await response.json()
    return NextResponse.json({ voices: data.voices || DEFAULT_VOICES, isConfigured: true })
  } catch {
    return NextResponse.json({ voices: DEFAULT_VOICES, isConfigured: false })
  }
}