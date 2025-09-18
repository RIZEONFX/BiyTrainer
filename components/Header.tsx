'use client'

import Link from 'next/link'
import { useTheme } from '@/hooks/useTheme'
import { useState } from 'react'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex justify-between items-center p-3 bg-transparent shadow-md relative z-10">
      <div className="logo font-bold text-xl text-blue-600 dark:text-blue-400">BiyTrainer ID</div>
      
      <div className="right-controls flex items-center gap-2">
        <button 
          id="toggleMode" 
          onClick={toggleTheme}
          className="bg-black/10 dark:bg-white/10 py-1 px-1.5 rounded-md text-base transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '☀️' : '🌙'}
        </button>
        
        <div 
          className={`hamburger w-6 h-[1.1rem] relative cursor-pointer flex flex-col justify-between ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block h-1 bg-current rounded-md transition-transform duration-300" />
          <span className="block h-1 bg-current rounded-md transition-opacity duration-300" />
          <span className="block h-1 bg-current rounded-md transition-transform duration-300" />
        </div>
      </div>
      
      <nav className={`absolute top-full right-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col min-w-[140px] z-20 ${isMenuOpen ? 'flex' : 'hidden'}`}>
        <Link href="/" className="p-3 text-current no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
          🏠 Home
        </Link>
        <Link href="/latihan-hiragana" className="p-3 text-current no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
          あ Hiragana
        </Link>
        <Link href="/katakana" className="p-3 text-current no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
          ア Katakana
        </Link>
        <Link href="/kosakata" className="p-3 text-current no-underline transition-colors hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
          📖 Kosakata
        </Link>
      </nav>
    </header>
  )
}