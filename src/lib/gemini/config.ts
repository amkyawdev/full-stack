// Gemini API Configuration for Translation

export interface TranslationRequest {
  text: string
  sourceLanguage?: string
  targetLanguage: string
}

export interface TranslationResponse {
  translatedText: string
  originalLanguage: string
}

// Get API key
export function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || ''
}

// Check if API is configured
export function hasGeminiApiKey(): boolean {
  return !!getGeminiApiKey()
}

// Supported languages for translation
export const LANGUAGES = {
  my: 'မြန်မာ',
  en: 'English',
  th: 'ไทย',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  vi: 'Tiếng Việt',
}