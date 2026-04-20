'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Film, Sparkles, Library, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Film, label: 'Edit', href: '/editor' },
  { icon: Sparkles, label: 'Effects', href: '/editor' },
  { icon: Library, label: 'Library', href: '/projects' },
  { icon: User, label: 'Profile', href: '/settings' },
]

export function MobileNavBar() {
  const pathname = usePathname()

  const getActiveIndex = () => {
    if (pathname === '/') return 0
    if (pathname.startsWith('/editor')) return 1
    if (pathname.startsWith('/projects')) return 3
    if (pathname.startsWith('/settings')) return 4
    return 0
  }

  const activeIndex = getActiveIndex()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-ui-panel/95 backdrop-blur-md border-t border-ui-border z-50 md:hidden">
      {/* Safe area padding */}
      <div className="pb-env-bottom" />
      
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeIndex === index
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors',
                isActive ? 'text-accent-cyan' : 'text-text-secondary'
              )}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent-cyan"
                />
              )}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}