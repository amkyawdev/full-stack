'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Video, MessageSquare, FileText, Volume2, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Video },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/translate', label: 'Translate', icon: FileText },
  { href: '/speak', label: 'Speak', icon: Volume2 },
  { href: '/public-chat', label: 'Community', icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#0a0e17]/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Burme Pro
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.slice(1).map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Developer Info */}
          <div className="flex items-center gap-4">
            <a
              href="https://tiktok.com/@amkyaw.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              @amkyaw.dev
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}