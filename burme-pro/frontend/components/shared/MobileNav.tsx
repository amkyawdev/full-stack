'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, MessageSquare, FileText, Volume2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/translate', label: 'Translate', icon: FileText },
  { href: '/speak', label: 'Speak', icon: Volume2 },
  { href: '/public-chat', label: 'Community', icon: Users },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="bg-[#0a0e17]/95 backdrop-blur-lg border-t border-cyan-500/20 safe-area-bottom">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors',
                  isActive
                    ? 'text-cyan-400'
                    : 'text-gray-500'
                )}
              >
                <div className={cn(
                  'relative p-1.5 rounded-lg transition-all',
                  isActive && 'bg-cyan-500/20'
                )}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-lg bg-cyan-500/20"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}