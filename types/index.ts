export interface Hiragana {
  char: string
  romaji: string
}

export interface Kanji {
  character: string
  meaning: string
  readings: string[]
  romaji: string[]
  category: string
}

export interface Kosakata {
  kata: string
  arti: string
  romaji: string
  kategori: 'kata-benda' | 'kata-kerja' | 'kata-sifat' | 'kata-keterangan' | 'partikel' | 'ungkapan'
  contoh?: string
  contohArti?: string
}

export type Katakana = Hiragana;

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}