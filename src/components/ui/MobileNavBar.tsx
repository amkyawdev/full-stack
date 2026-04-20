'use client'

import { Home, Film, Sparkles, Library, User } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Film, label: 'Edit', href: '/editor' },
  { icon: Sparkles, label: 'Effects', href: '/editor' },
  { icon: Library, label: 'Library', href: '/projects' },
  { icon: User, label: 'Profile', href: '/settings' },
]

export function MobileNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e]/95 border-t border-[#2a2a3e] z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-gray-400"
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}