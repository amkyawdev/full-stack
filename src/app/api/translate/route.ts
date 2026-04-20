import { NextRequest, NextResponse } from 'next/server'
import { getGeminiApiKey, LANGUAGES } from '@/lib/gemini/config'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta'

export async function POST(request: NextRequest) {
  try {
    const apiKey = getGeminiApiKey()
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { text, sourceLanguage = 'en', targetLanguage = 'my' } = body

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const sourceName = LANGUAGES[sourceLanguage as keyof typeof LANGUAGES] || sourceLanguage
    const targetName = LANGUAGES[targetLanguage as keyof typeof LANGUAGES] || targetLanguage

    // Translate using Gemini
    const prompt = `Translate the following text from ${sourceName} to ${targetName}. 

Only return the translated text, nothing else.
Text to translate:
${text}`

    const response = await fetch(
      `${GEMINI_API_BASE}/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Gemini API error:', error)
      return NextResponse.json({ error: 'Translation failed' }, { status: response.status })
    }

    const data = await response.json()
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return NextResponse.json({
      success: true,
      translatedText: translatedText.trim(),
      sourceLanguage,
      targetLanguage,
    })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}

// GET - Return supported languages
export async function GET() {
  return NextResponse.json({ languages: LANGUAGES })
}