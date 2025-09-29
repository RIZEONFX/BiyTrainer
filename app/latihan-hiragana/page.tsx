'use client'

import { useState, useEffect, useCallback } from 'react'
import { hiraganaData } from '@/utils/hiraganaData'
import { Hiragana } from '@/types'

// Pisahkan data menjadi kelompok-kelompok untuk organisasi yang lebih baik
const basicHiragana = hiraganaData.slice(0, 46); // Hiragana dasar
const dakutenHiragana = hiraganaData.slice(46, 66); // Dakuten
const handakutenHiragana = hiraganaData.slice(66, 71); // Handakuten
const yoonHiragana = hiraganaData.slice(71); // Yōon (kombinasi)

type Category = 'all' | 'basic' | 'dakuten' | 'handakuten' | 'yoon'

export default function LatihanHiragana() {
  const [selected, setSelected] = useState<Hiragana[]>(hiraganaData)
  const [current, setCurrent] = useState<Hiragana | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    new Array(hiraganaData.length).fill(true)
  )
  
  const [activeCategories, setActiveCategories] = useState<Category[]>(['all'])

  const updateSelected = useCallback(() => {
    const newSelected = hiraganaData.filter((_, idx) => checkboxes[idx])
    setSelected(newSelected)
  }, [checkboxes])

  useEffect(() => {
    updateSelected()
  }, [updateSelected])

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes]
    newCheckboxes[index] = !newCheckboxes[index]
    setCheckboxes(newCheckboxes)
    
    // Update active categories berdasarkan checkbox yang berubah
    updateActiveCategoriesFromCheckboxes(newCheckboxes)
  }

  const toggleRow = (rowIndex: number, data: Hiragana[]) => {
    const startIndex = hiraganaData.findIndex(item => item.char === data[rowIndex * 5].char)
    const endIndex = Math.min(startIndex + 5, startIndex + data.length)
    const allChecked = checkboxes.slice(startIndex, endIndex).every(Boolean)
    
    const newCheckboxes = [...checkboxes]
    for (let i = startIndex; i < endIndex; i++) {
      newCheckboxes[i] = !allChecked
    }
    
    setCheckboxes(newCheckboxes)
    updateActiveCategoriesFromCheckboxes(newCheckboxes)
  }

  // Fungsi untuk mengupdate active categories berdasarkan state checkboxes
  const updateActiveCategoriesFromCheckboxes = (newCheckboxes: boolean[]) => {
    const categories: Category[] = []
    
    // Cek setiap kategori
    if (newCheckboxes.every(Boolean)) {
      categories.push('all')
    } else {
      if (basicHiragana.every((_, i) => newCheckboxes[i])) {
        categories.push('basic')
      }
      if (dakutenHiragana.every((_, i) => newCheckboxes[basicHiragana.length + i])) {
        categories.push('dakuten')
      }
      if (handakutenHiragana.every((_, i) => newCheckboxes[basicHiragana.length + dakutenHiragana.length + i])) {
        categories.push('handakuten')
      }
      if (yoonHiragana.every((_, i) => newCheckboxes[basicHiragana.length + dakutenHiragana.length + handakutenHiragana.length + i])) {
        categories.push('yoon')
      }
    }
    
    setActiveCategories(categories)
  }

  const selectCategory = (category: Category) => {
    const newCheckboxes = [...checkboxes]
    
    if (category === 'all') {
      // Jika memilih "Semua Huruf", nonaktifkan kategori lain
      for (let i = 0; i < newCheckboxes.length; i++) {
        newCheckboxes[i] = true
      }
      setActiveCategories(['all'])
    } else {
      // Untuk kategori selain "Semua Huruf"
      const currentCategories = [...activeCategories]
      
      // Hapus 'all' jika ada
      const filteredCategories = currentCategories.filter(cat => cat !== 'all')
      
      // Cek apakah kategori sudah aktif
      const isCategoryActive = filteredCategories.includes(category)
      
      if (isCategoryActive) {
        // Nonaktifkan kategori
        const updatedCategories = filteredCategories.filter(cat => cat !== category)
        setActiveCategories(updatedCategories)
        
        // Update checkboxes berdasarkan kategori yang tidak aktif
        updateCheckboxesFromCategories(updatedCategories, newCheckboxes)
      } else {
        // Aktifkan kategori, dengan batas maksimal 3
        if (filteredCategories.length >= 3) {
          // Jika sudah 3 kategori aktif, aktifkan semua
          for (let i = 0; i < newCheckboxes.length; i++) {
            newCheckboxes[i] = true
          }
          setActiveCategories(['all'])
        } else {
          // Tambahkan kategori baru
          const updatedCategories = [...filteredCategories, category]
          setActiveCategories(updatedCategories)
          
          // Update checkboxes berdasarkan kategori yang aktif
          updateCheckboxesFromCategories(updatedCategories, newCheckboxes)
        }
      }
    }
    
    setCheckboxes(newCheckboxes)
  }

  // Fungsi untuk mengupdate checkboxes berdasarkan kategori yang aktif
  const updateCheckboxesFromCategories = (categories: Category[], newCheckboxes: boolean[]) => {
    // Reset semua ke false terlebih dahulu
    for (let i = 0; i < newCheckboxes.length; i++) {
      newCheckboxes[i] = false
    }
    
    // Aktifkan checkbox berdasarkan kategori
    categories.forEach(cat => {
      switch (cat) {
        case 'basic':
          for (let i = 0; i < basicHiragana.length; i++) {
            newCheckboxes[i] = true
          }
          break
        case 'dakuten':
          for (let i = 0; i < dakutenHiragana.length; i++) {
            newCheckboxes[basicHiragana.length + i] = true
          }
          break
        case 'handakuten':
          for (let i = 0; i < handakutenHiragana.length; i++) {
            newCheckboxes[basicHiragana.length + dakutenHiragana.length + i] = true
          }
          break
        case 'yoon':
          for (let i = 0; i < yoonHiragana.length; i++) {
            newCheckboxes[basicHiragana.length + dakutenHiragana.length + handakutenHiragana.length + i] = true
          }
          break
      }
    })
  }

  const startTraining = () => {
    if (selected.length === 0) {
      alert('Pilih dulu huruf yang ingin dipelajari!')
      return
    }
    setIsTraining(true)
    randomHiragana()
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCurrent(null)
    setAnswer('')
    setResult('')
    setShowAnswer(false)
  }

  const randomHiragana = useCallback(() => {
    if (selected.length === 0) return
    let randomIndex: number
    let chosen: Hiragana
  
    do {
      randomIndex = Math.floor(Math.random() * selected.length)
      chosen = selected[randomIndex]
    } while (chosen === current && selected.length > 1)
  
    setCurrent(chosen)
    setAnswer('')
    setResult('')
    setShowAnswer(false)
  }, [selected, current])

  const checkAnswer = () => {
    if (!current) return
    
    if (answer.trim().toLowerCase() === current.romaji) {
      setResult('✅ Benar!')
      setTimeout(randomHiragana, 1000)
    } else {
      setResult('❌ Salah!')
      setShowAnswer(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  const renderHiraganaGrid = (data: Hiragana[], title: string) => {
    if (data.length === 0) return null;
    
    const startIndex = hiraganaData.findIndex(item => item.char === data[0].char)
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-400">{title}</h3>
        <div className="grid gap-3">
          {Array.from({ length: Math.ceil(data.length / 5) }).map((_, rowIndex) => {
            const rowItems = data.slice(rowIndex * 5, (rowIndex * 5) + 5)
            
            return (
              <div key={`row-${title}-${rowIndex}`} className="row flex items-center gap-3 p-2 rounded-md">
                <input
                  type="checkbox"
                  checked={rowItems.every((_, i) => {
                    const idx = startIndex + (rowIndex * 5) + i
                    return checkboxes[idx]
                  })}
                  onChange={() => toggleRow(rowIndex, data)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                
                {rowItems.map((hiragana, cellIndex) => {
                  const idx = startIndex + (rowIndex * 5) + cellIndex
                  return (
                    <label key={hiragana.char} className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors flex-1 justify-center">
                      <input
                        type="checkbox"
                        checked={checkboxes[idx]}
                        onChange={() => toggleCheckbox(idx)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-lg font-medium">{hiragana.char}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({hiragana.romaji})</span>
                    </label>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const isCategoryActive = (category: Category) => {
    return activeCategories.includes(category)
  }

  return (
    <div className="container max-w-6xl mx-auto mt-2 mb-8 p-6 light bg-white dark:bg-gray-800 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8">Latihan Hiragana</h1>
      
      {!isTraining ? (
        <>
          {/* Kategori Pilihan Cepat */}
          <div className="mb-6 p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-3">Pilih Kategori:</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectCategory('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('all') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Semua Huruf
              </button>
              <button
                onClick={() => selectCategory('basic')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('basic') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Hiragana Dasar
              </button>
              <button
                onClick={() => selectCategory('dakuten')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('dakuten') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Dakuten (゛)
              </button>
              <button
                onClick={() => selectCategory('handakuten')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('handakuten') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Handakuten (゜)
              </button>
              <button
                onClick={() => selectCategory('yoon')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('yoon') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Kombinasi (Yōon)
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Pilih maksimal 3 kategori. Jika memilih 4 kategori, akan otomatis berubah menjadi "Semua Huruf".
            </p>
          </div>
          
          {/* Grid Huruf */}
          <div className="options mb-8 max-h-[500px] overflow-y-auto p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-4">Pilih Huruf yang Ingin Dipelajari:</h2>
            
            {renderHiraganaGrid(basicHiragana, "Hiragana Dasar")}
            {renderHiraganaGrid(dakutenHiragana, "Dakuten (Tanda Vokal Berubah 〝)")}
            {renderHiraganaGrid(handakutenHiragana, "Handakuten (Tanda Lingkaran ゜)")}
            {renderHiraganaGrid(yoonHiragana, "Kombinasi (Yōon)")}
          </div>
          
          <div className="text-center">
            <button 
              onClick={startTraining}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Mulai Latihan
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-3">
            <button 
              onClick={stopTraining}
              className="bg-red-600 hover:bg-red-700 text-white text-md font-bold py-1.5 px-3 rounded-md transition-colors duration-300 mb-2"
            >
              Berhenti Latihan
            </button>
          </div>
          
          <div className="trainer bg-slate-200/10 shadow-[0_0_3px_rgba(0,0,0,0.2)] p-6 rounded-lg">
            <div className="flex justify-center gap-4 mb-6">
              <button 
                onClick={randomHiragana}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Acak Huruf
              </button>
            </div>
            
            {current && (
              <div className="hiragana text-8xl font-bold my-8 text-center">{current.char}</div>
            )}
            
            <div className="input-group mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tulis romaji..."
                className="p-3 text-center text-xl border border-gray-300 dark:border-gray-500 rounded-lg w-full max-w-md mx-auto block dark:bg-gray-600/90 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            
            <div className="actions flex justify-center gap-4 mb-6">
              <button 
                onClick={checkAnswer}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Cek Jawaban
              </button>
              
              {showAnswer && current && (
                <button 
                  onClick={() => setResult(`Jawaban: ${current.romaji}`)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Lihat Jawaban
                </button>
              )}
            </div>
            
            {result && (
              <div className="result text-xl font-bold text-center p-2 bg-slate-500/50 dark:bg-gray-600/80 rounded-lg">
                {result}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}