'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Play, Pause, Download, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const voices = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', category: 'Female' },
  { id: 'AZnzlk1XvdvUeBnXmlgg', name: 'Drew', category: 'Male' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', category: 'Male' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', category: 'Male' },
  { id: 'yoZ06RuRjCuAILDbTXcA', name: 'Sam', category: 'Male' },
];

export default function SpeakPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [generating, setGenerating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setGenerating(true);
    setAudioUrl(null);

    try {
      const response = await fetch('/api/voice/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceId: selectedVoice,
        }),
      });

      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error('TTS error:', error);
      alert('Failed to generate speech. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handlePlay = () => {
    if (!audioUrl) return;
    setPlaying(!playing);
    // Audio playback logic would go here
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">AI Speak</h1>
          <p className="text-gray-400">Convert text to speech with ElevenLabs</p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-cyan-500/20 rounded-2xl p-6"
        >
          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Enter Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something for me to say..."
              className="w-full h-40 bg-[#0a0e17] border border-cyan-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 resize-none"
              disabled={generating}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {text.length} characters
            </div>
          </div>

          {/* Voice Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Voice</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {voices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  disabled={generating}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedVoice === voice.id
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-cyan-500/20 hover:border-cyan-500/40'
                  }`}
                >
                  <p className="font-medium">{voice.name}</p>
                  <p className="text-xs text-gray-400">{voice.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            variant="neon"
            size="lg"
            className="w-full mb-4"
            onClick={handleGenerate}
            disabled={!text.trim() || generating}
            loading={generating}
          >
            {generating ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Volume2 className="w-5 h-5 mr-2" />
            )}
            {generating ? 'Generating...' : 'Generate Speech'}
          </Button>

          {/* Audio Player */}
          {audioUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-[#0a0e17] rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handlePlay}>
                  {playing ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span className="ml-2">{playing ? 'Pause' : 'Play'}</span>
                </Button>
                <Button variant="ghost">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}