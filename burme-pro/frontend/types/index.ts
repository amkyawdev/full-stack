// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  model?: string;
}

export interface ChatResponse {
  message: ChatMessage;
  done: boolean;
}

// Translation Types
export interface TranslationJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  sourceFile: string;
  sourceLanguage: string;
  targetLanguage: string;
  resultFile?: string;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface TranslateRequest {
  file: File;
  sourceLanguage: string;
  targetLanguage: string;
  format?: 'srt' | 'vtt' | 'ass';
}

export interface TranslateResponse {
  job: TranslationJob;
  downloadUrl?: string;
}

// Voice/TTS Types
export interface VoiceRequest {
  text: string;
  voiceId?: string;
  model?: string;
  stability?: number;
  similarityBoost?: number;
}

export interface VoiceResponse {
  audioUrl: string;
  duration: number;
  voiceId: string;
}

export interface Voice {
  id: string;
  name: string;
  category: string;
  description: string;
}

// Public Chat Types
export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  memberCount: number;
  lastMessage?: ChatMessage;
}

export interface PublicMessage {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StreamChunk {
  delta: string;
  done: boolean;
}

// PWA Types
export interface PWAInstallPrompt {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface ServiceWorkerRegistration {
  active: ServiceWorker;
  installing?: ServiceWorker;
  waiting?: ServiceWorker;
}