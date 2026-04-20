'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Loader from '@/components/animations/Loader';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'th', name: 'Thai' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
];

export default function TranslatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('my');
  const [translating, setTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [jobId, setJobId] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.srt') && !selectedFile.name.endsWith('.vtt')) {
        alert('Please upload an SRT or VTT file');
        return;
      }
      setFile(selectedFile);
      setCompleted(false);
    }
  };

  const handleTranslate = async () => {
    if (!file) return;

    setTranslating(true);
    setProgress(0);
    setCompleted(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sourceLanguage', sourceLang);
    formData.append('targetLanguage', targetLang);
    formData.append('format', file.name.endsWith('.vtt') ? 'vtt' : 'srt');

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      const response = await fetch('/api/translate', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();
      setJobId(data.jobId);
      setCompleted(true);
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">SRT Translator</h1>
          <p className="text-gray-400">Translate subtitle files with AI precision</p>
        </div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-cyan-500/20 rounded-2xl p-6 mb-6"
        >
          {/* File Drop Zone */}
          <div className="border-2 border-dashed border-cyan-500/30 rounded-xl p-8 text-center mb-6 hover:border-cyan-500/50 transition-colors">
            <input
              type="file"
              accept=".srt,.vtt"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={translating}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? (
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-cyan-400 mb-3" />
                  <p className="font-medium">Drop your SRT file here</p>
                  <p className="text-sm text-gray-400">or click to browse</p>
                </div>
              )}
            </label>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Source Language</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-[#0a0e17] border border-cyan-500/20 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                disabled={translating}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end justify-center mb-4 md:mb-6">
              <ArrowRight className="w-6 h-6 text-cyan-400" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Language</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-[#0a0e17] border border-cyan-500/20 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                disabled={translating}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress */}
          {translating && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Translating...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Translate Button */}
          <Button
            variant="neon"
            size="lg"
            className="w-full"
            onClick={handleTranslate}
            disabled={!file || translating}
            loading={translating}
          >
            {translating ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Upload className="w-5 h-5 mr-2" />
            )}
            {translating ? 'Translating...' : 'Start Translation'}
          </Button>
        </motion.div>

        {/* Completed State */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-green-500/30 rounded-2xl p-6 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Translation Complete!</h2>
            <p className="text-gray-400 mb-6">Your translated file is ready to download</p>
            <Button variant="default" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Translated File
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}