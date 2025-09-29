export interface Hiragana {
  char: string
  romaji: string
}

export type Katakana = Hiragana;

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}