import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  FileText, 
  Volume2, 
  Users, 
  Video, 
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Loader from '@/components/animations/Loader';

const features = [
  {
    icon: MessageSquare,
    title: 'AI Chat Bot',
    description: 'Powered by Groq for instant responses',
    href: '/chat',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'SRT Translator',
    description: 'Translate subtitles with AI precision',
    href: '/translate',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Volume2,
    title: 'AI Speak',
    description: 'ElevenLabs premium text-to-speech',
    href: '/speak',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Public Chat',
    description: 'Real-time community messaging',
    href: '/public-chat',
    color: 'from-orange-500 to-red-500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#111827] to-[#0a0e17]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo / Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 neon-glow">
                <Video className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Burme Editing Pro
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Advanced Mobile-First Video Editing PWA by{' '}
              <span className="text-cyan-400 font-semibold">Aung Myo Kyaw</span>
              <br />
              <span className="text-sm">@amkyaw.dev</span>
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/chat">
                <Button variant="neon" size="lg" className="group">
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/translate">
                <Button variant="outline" size="lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Translate SRT
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.href} variants={item}>
              <Link href={feature.href}>
                <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all duration-300 hover:neon-glow">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Loading Animation Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">AI Processing States</h2>
          <p className="text-gray-400">Smooth animations for every interaction</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader type="spinner" size="lg" />
            <span className="text-sm text-gray-400">Loading</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader type="dots" size="lg" />
            <span className="text-sm text-gray-400">Processing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader type="pulse" size="lg" />
            <span className="text-sm text-gray-400">Thinking</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader type="skeleton" />
            <span className="text-sm text-gray-400">Skeleton</span>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Burme Editing Pro. Built by Aung Myo Kyaw
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://tiktok.com/@amkyaw.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}