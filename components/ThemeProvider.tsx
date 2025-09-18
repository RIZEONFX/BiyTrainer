'use client'

import { createContext, useEffect, useState } from 'react'
import { Theme, ThemeContextType } from '@/types'

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    
    // Prioritaskan tema yang disimpan di localStorage
    // Jangan gunakan preferensi device jika sudah ada pilihan user
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Default ke light mode, abaikan preferensi device
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  if (!mounted) {
    // Render dengan tema light sebagai default selama belum mounted
    return (
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
        <div className="light-theme">{children}</div>
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}