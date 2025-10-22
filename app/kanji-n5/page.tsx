'use client'

import { useState, useEffect, useCallback } from 'react'
import { kanjiN5Data, Kanji } from '@/utils/kanjiN5Data'

// Pisahkan data menjadi kelompok-kelompok berdasarkan kategori
const angkaKanji = kanjiN5Data.filter(kanji => kanji.category === "angka")
const waktuKanji = kanjiN5Data.filter(kanji => kanji.category === "waktu")
const orangKanji = kanjiN5Data.filter(kanji => kanji.category === "orang")
const alamKanji = kanjiN5Data.filter(kanji => kanji.category === "alam")
const arahKanji = kanjiN5Data.filter(kanji => kanji.category === "arah")
const aktivitasKanji = kanjiN5Data.filter(kanji => kanji.category === "aktivitas")
const sifatKanji = kanjiN5Data.filter(kanji => kanji.category === "sifat")
const bendaKanji = kanjiN5Data.filter(kanji => kanji.category === "benda")

type Category = 'all' | 'angka' | 'waktu' | 'orang' | 'alam' | 'arah' | 'aktivitas' | 'sifat' | 'benda'
type QuizType = 'meaning' | 'reading'

export default function LatihanKanjiN5() {
  const [selected, setSelected] = useState<Kanji[]>(kanjiN5Data)
  const [current, setCurrent] = useState<Kanji | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    new Array(kanjiN5Data.length).fill(true)
  )
  const [quizType, setQuizType] = useState<QuizType>('meaning')
  
  const [activeCategories, setActiveCategories] = useState<Category[]>(['all'])

  const updateSelected = useCallback(() => {
    const newSelected = kanjiN5Data.filter((_, idx) => checkboxes[idx])
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

  const toggleRow = (rowIndex: number, data: Kanji[]) => {
    const startIndex = kanjiN5Data.findIndex(item => item.character === data[rowIndex * 5].character)
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
      if (angkaKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === angkaKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('angka')
      
      if (waktuKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === waktuKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('waktu')
      
      if (orangKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === orangKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('orang')
      
      if (alamKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === alamKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('alam')
      
      if (arahKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === arahKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('arah')
      
      if (aktivitasKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === aktivitasKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('aktivitas')
      
      if (sifatKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === sifatKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('sifat')
      
      if (bendaKanji.every((_, i) => {
        const idx = kanjiN5Data.findIndex(k => k.character === bendaKanji[i].character)
        return newCheckboxes[idx]
      })) categories.push('benda')
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
        // Aktifkan kategori, dengan batas maksimal 7
        if (filteredCategories.length >= 7) {
          // Jika sudah 7 kategori aktif, aktifkan semua
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
      let categoryData: Kanji[] = []
      switch (cat) {
        case 'angka': categoryData = angkaKanji; break
        case 'waktu': categoryData = waktuKanji; break
        case 'orang': categoryData = orangKanji; break
        case 'alam': categoryData = alamKanji; break
        case 'arah': categoryData = arahKanji; break
        case 'aktivitas': categoryData = aktivitasKanji; break
        case 'sifat': categoryData = sifatKanji; break
        case 'benda': categoryData = bendaKanji; break
      }
      
      categoryData.forEach(kanji => {
        const idx = kanjiN5Data.findIndex(k => k.character === kanji.character)
        if (idx !== -1) {
          newCheckboxes[idx] = true
        }
      })
    })
  }

  const startTraining = () => {
    if (selected.length === 0) {
      alert('Pilih dulu kanji yang ingin dipelajari!')
      return
    }
    setIsTraining(true)
    randomKanji()
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCurrent(null)
    setAnswer('')
    setResult('')
    setShowAnswer(false)
  }

  const randomKanji = useCallback(() => {
    if (selected.length === 0) return
    let randomIndex: number
    let chosen: Kanji
  
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
    
    let isCorrect = false
    
    if (quizType === 'meaning') {
      // Cek arti (case insensitive)
      isCorrect = answer.trim().toLowerCase() === current.meaning.toLowerCase()
    } else {
      // Cek bacaan (bisa menerima salah satu bacaan yang tersedia)
      isCorrect = current.romaji.some(reading => 
        answer.trim().toLowerCase() === reading.toLowerCase()
      )
    }
    
    if (isCorrect) {
      setResult('✅ Benar!')
      setTimeout(randomKanji, 1000)
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

  const renderKanjiGrid = (data: Kanji[], title: string) => {
    if (data.length === 0) return null;
    
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
                  checked={rowItems.every((kanji) => {
                    const idx = kanjiN5Data.findIndex(k => k.character === kanji.character)
                    return checkboxes[idx]
                  })}
                  onChange={() => toggleRow(rowIndex, data)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                
                {rowItems.map((kanji, cellIndex) => {
                  const idx = kanjiN5Data.findIndex(k => k.character === kanji.character)
                  return (
                    <label key={kanji.character} className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors flex-1 justify-center">
                      <input
                        type="checkbox"
                        checked={checkboxes[idx]}
                        onChange={() => toggleCheckbox(idx)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-lg font-medium">{kanji.character}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {kanji.meaning} ({kanji.romaji[0]})
                      </span>
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
      <h1 className="text-3xl font-bold text-center mb-8">Latihan Kanji N5</h1>
      
      {!isTraining ? (
        <>
          {/* Pilihan Jenis Kuis */}
          <div className="mb-6 p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-3">Pilih Jenis Latihan:</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setQuizType('meaning')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  quizType === 'meaning' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Arti (Indonesia)
              </button>
              <button
                onClick={() => setQuizType('reading')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  quizType === 'reading' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Bacaan (Romaji)
              </button>
            </div>
            
            {/* Kategori Pilihan Cepat */}
            <h2 className="text-md font-semibold mb-3">Pilih Kategori Kanji:</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectCategory('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('all') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Semua Kanji
              </button>
              <button
                onClick={() => selectCategory('angka')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('angka') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Angka
              </button>
              <button
                onClick={() => selectCategory('waktu')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('waktu') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Waktu
              </button>
              <button
                onClick={() => selectCategory('orang')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('orang') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Orang & Keluarga
              </button>
              <button
                onClick={() => selectCategory('alam')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('alam') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Alam
              </button>
              <button
                onClick={() => selectCategory('arah')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('arah') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Arah & Lokasi
              </button>
              <button
                onClick={() => selectCategory('aktivitas')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('aktivitas') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Aktivitas
              </button>
              <button
                onClick={() => selectCategory('sifat')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('sifat') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Sifat
              </button>
              <button
                onClick={() => selectCategory('benda')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('benda') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Benda Umum
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Pilih maksimal 7 kategori. Jika memilih 8 kategori, akan otomatis berubah menjadi "Semua Kanji".
            </p>
          </div>
          
          {/* Grid Kanji */}
          <div className="options mb-8 max-h-[500px] overflow-y-auto p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-4">Pilih Kanji yang Ingin Dipelajari:</h2>
            
            {renderKanjiGrid(angkaKanji, "Angka")}
            {renderKanjiGrid(waktuKanji, "Waktu")}
            {renderKanjiGrid(orangKanji, "Orang & Keluarga")}
            {renderKanjiGrid(alamKanji, "Alam")}
            {renderKanjiGrid(arahKanji, "Arah & Lokasi")}
            {renderKanjiGrid(aktivitasKanji, "Aktivitas")}
            {renderKanjiGrid(sifatKanji, "Sifat")}
            {renderKanjiGrid(bendaKanji, "Benda Umum")}
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
                onClick={randomKanji}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Acak Kanji
              </button>
            </div>
            
            {current && (
              <>
                <div className="kanji text-8xl font-bold my-8 text-center">{current.character}</div>
                <div className="text-center mb-4 text-lg text-gray-600 dark:text-gray-400">
                  {quizType === 'meaning' ? 'Apa arti kanji ini?' : 'Apa bacaan kanji ini?'}
                </div>
              </>
            )}
            
            <div className="input-group mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={quizType === 'meaning' ? "Tulis arti dalam bahasa Indonesia..." : "Tulis bacaan dalam romaji..."}
                className="p-3 text-center text-xl border border-gray-300 dark:border-gray-500 rounded-lg w-full max-w-md mx-auto block dark:bg-gray-600/90 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
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
                  onClick={() => {
                    if (quizType === 'meaning') {
                      setResult(`Jawaban: ${current.meaning}`)
                    } else {
                      setResult(`Jawaban: ${current.romaji.join(', ')}`)
                    }
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Lihat Jawaban
                </button>
              )}
            </div>
            
            {result && (
              <div className="result text-xl text-white font-bold text-center p-2 bg-slate-500/50 dark:bg-gray-600/80 rounded-lg">
                {result}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}