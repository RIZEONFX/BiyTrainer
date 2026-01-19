'use client'

import { useState, useEffect, useCallback } from 'react'
import { kosakataN5Data, Kosakata } from '@/utils/kosakataN5Data'

// Pisahkan data menjadi kelompok-kelompok berdasarkan kategori
const kataBenda = kosakataN5Data.filter(kosakata => kosakata.kategori === "kata-benda")
const kataKerja = kosakataN5Data.filter(kosakata => kosakata.kategori === "kata-kerja")
const kataSifat = kosakataN5Data.filter(kosakata => kosakata.kategori === "kata-sifat")
const kataKeterangan = kosakataN5Data.filter(kosakata => kosakata.kategori === "kata-keterangan")
const partikel = kosakataN5Data.filter(kosakata => kosakata.kategori === "partikel")
const ungkapan = kosakataN5Data.filter(kosakata => kosakata.kategori === "ungkapan")

type Category = 'all' | 'kata-benda' | 'kata-kerja' | 'kata-sifat' | 'kata-keterangan' | 'partikel' | 'ungkapan'
type QuizType = 'arti' | 'romaji'

export default function LatihanKosakataN5() {
  const [selected, setSelected] = useState<Kosakata[]>(kosakataN5Data)
  const [current, setCurrent] = useState<Kosakata | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    new Array(kosakataN5Data.length).fill(true)
  )
  const [quizType, setQuizType] = useState<QuizType>('arti')
  
  const [activeCategories, setActiveCategories] = useState<Category[]>(['all'])

  const updateSelected = useCallback(() => {
    const newSelected = kosakataN5Data.filter((_, idx) => checkboxes[idx])
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

  const toggleRow = (rowIndex: number, data: Kosakata[]) => {
    const startIndex = kosakataN5Data.findIndex(item => item.kata === data[rowIndex * 5].kata)
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
      if (kataBenda.every((_, i) => {
        const idx = kosakataN5Data.findIndex(k => k.kata === kataBenda[i].kata)
        return newCheckboxes[idx]
      })) categories.push('kata-benda')
      
      if (kataKerja.every((_, i) => {
        const idx = kosakataN5Data.findIndex(k => k.kata === kataKerja[i].kata)
        return newCheckboxes[idx]
      })) categories.push('kata-kerja')
      
      if (kataSifat.every((_, i) => {
        const idx = kosakataN5Data.findIndex(k => k.kata === kataSifat[i].kata)
        return newCheckboxes[idx]
      })) categories.push('kata-sifat')
      
      if (kataKeterangan.every((_, i) => {
        const idx = kosakataN5Data.findIndex(k => k.kata === kataKeterangan[i].kata)
        return newCheckboxes[idx]
      })) categories.push('kata-keterangan')
      
      if (partikel.every((_, i) => {
        const idx = kosakataN5Data.findIndex(k => k.kata === partikel[i].kata)
        return newCheckboxes[idx]
      })) categories.push('partikel')
      
      if (ungkapan.every((_, i) => {
        const idx = kosakataN5Data.findIndex(k => k.kata === ungkapan[i].kata)
        return newCheckboxes[idx]
      })) categories.push('ungkapan')
    }
    
    setActiveCategories(categories)
  }

  const selectCategory = (category: Category) => {
    const newCheckboxes = [...checkboxes]
    
    if (category === 'all') {
      // Jika memilih "Semua Kosakata", nonaktifkan kategori lain
      for (let i = 0; i < newCheckboxes.length; i++) {
        newCheckboxes[i] = true
      }
      setActiveCategories(['all'])
    } else {
      // Untuk kategori selain "Semua Kosakata"
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
        // Aktifkan kategori, dengan batas maksimal 5
        if (filteredCategories.length >= 5) {
          // Jika sudah 5 kategori aktif, aktifkan semua
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
      let categoryData: Kosakata[] = []
      switch (cat) {
        case 'kata-benda': categoryData = kataBenda; break
        case 'kata-kerja': categoryData = kataKerja; break
        case 'kata-sifat': categoryData = kataSifat; break
        case 'kata-keterangan': categoryData = kataKeterangan; break
        case 'partikel': categoryData = partikel; break
        case 'ungkapan': categoryData = ungkapan; break
      }
      
      categoryData.forEach(kosakata => {
        const idx = kosakataN5Data.findIndex(k => k.kata === kosakata.kata)
        if (idx !== -1) {
          newCheckboxes[idx] = true
        }
      })
    })
  }

  const startTraining = () => {
    if (selected.length === 0) {
      alert('Pilih dulu kosakata yang ingin dipelajari!')
      return
    }
    setIsTraining(true)
    randomKosakata()
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCurrent(null)
    setAnswer('')
    setResult('')
    setShowAnswer(false)
  }

  const randomKosakata = useCallback(() => {
    if (selected.length === 0) return
    let randomIndex: number
    let chosen: Kosakata
  
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
    
    if (quizType === 'arti') {
      // Cek arti (case insensitive, bisa menerima sinonim)
      const cleanedAnswer = answer.trim().toLowerCase()
      const cleanedArti = current.arti.toLowerCase()
      isCorrect = cleanedAnswer === cleanedArti
    } else {
      // Cek romaji (bisa menerima variasi penulisan)
      const cleanedAnswer = answer.trim().toLowerCase()
      const cleanedRomaji = current.romaji.toLowerCase()
      isCorrect = cleanedAnswer === cleanedRomaji
    }
    
    if (isCorrect) {
      setResult('✅ Benar!')
      setTimeout(randomKosakata, 1000)
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

  const renderKosakataGrid = (data: Kosakata[], title: string) => {
    if (data.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">{title}</h3>
        <div className="grid gap-3">
          {Array.from({ length: Math.ceil(data.length / 5) }).map((_, rowIndex) => {
            const rowItems = data.slice(rowIndex * 5, (rowIndex * 5) + 5)
            
            return (
              <div key={`row-${title}-${rowIndex}`} className="row flex items-center gap-3 p-2 rounded-md">
                <input
                  type="checkbox"
                  checked={rowItems.every((kosakata) => {
                    const idx = kosakataN5Data.findIndex(k => k.kata === kosakata.kata)
                    return checkboxes[idx]
                  })}
                  onChange={() => toggleRow(rowIndex, data)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                
                {rowItems.map((kosakata, cellIndex) => {
                  const idx = kosakataN5Data.findIndex(k => k.kata === kosakata.kata)
                  return (
                    <label key={cellIndex} className="flex flex-col gap-1 p-2 border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checkboxes[idx]}
                          onChange={() => toggleCheckbox(idx)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-lg font-medium">{kosakata.kata}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {kosakata.arti} ({kosakata.romaji})
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
      <h1 className="text-3xl font-bold text-center mb-8">Latihan Kosakata N5 dengan Kanji</h1>
      
      {!isTraining ? (
        <>
          {/* Pilihan Jenis Kuis */}
          <div className="mb-6 p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-3">Pilih Jenis Latihan:</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setQuizType('arti')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  quizType === 'arti' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Arti (Indonesia)
              </button>
              <button
                onClick={() => setQuizType('romaji')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  quizType === 'romaji' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Romaji
              </button>
            </div>
            
            {/* Kategori Pilihan Cepat */}
            <h2 className="text-md font-semibold mb-3">Pilih Kategori Kosakata:</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectCategory('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('all') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Semua Kosakata
              </button>
              <button
                onClick={() => selectCategory('kata-benda')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('kata-benda') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Kata Benda
              </button>
              <button
                onClick={() => selectCategory('kata-kerja')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('kata-kerja') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Kata Kerja
              </button>
              <button
                onClick={() => selectCategory('kata-sifat')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('kata-sifat') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Kata Sifat
              </button>
              <button
                onClick={() => selectCategory('kata-keterangan')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('kata-keterangan') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Kata Keterangan
              </button>
              <button
                onClick={() => selectCategory('partikel')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('partikel') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Partikel
              </button>
              <button
                onClick={() => selectCategory('ungkapan')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isCategoryActive('ungkapan') 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Ungkapan
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Pilih maksimal 5 kategori. Jika memilih 6 kategori, akan otomatis berubah menjadi "Semua Kosakata".
            </p>
          </div>
          
          {/* Grid Kosakata */}
          <div className="options mb-8 max-h-[500px] overflow-y-auto p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-4">Pilih Kosakata yang Ingin Dipelajari:</h2>
            
            {renderKosakataGrid(kataBenda, "Kata Benda (名詞)")}
            {renderKosakataGrid(kataKerja, "Kata Kerja (動詞)")}
            {renderKosakataGrid(kataSifat, "Kata Sifat (形容詞)")}
            {renderKosakataGrid(kataKeterangan, "Kata Keterangan (副詞)")}
            {renderKosakataGrid(partikel, "Partikel (助詞)")}
            {renderKosakataGrid(ungkapan, "Ungkapan (表現)")}
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
                onClick={randomKosakata}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Acak Kosakata
              </button>
            </div>
            
            {current && (
              <>
                <div className="kosakata text-6xl font-bold my-8 text-center">{current.kata}</div>
                <div className="text-center mb-4 text-lg text-gray-600 dark:text-gray-400">
                  {quizType === 'arti' ? 'Apa arti kosakata ini?' : 'Apa romaji dari kosakata ini?'}
                </div>
              </>
            )}
            
            <div className="input-group mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={quizType === 'arti' ? "Tulis arti dalam bahasa Indonesia..." : "Tulis romaji..."}
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
                  onClick={() => {
                    if (quizType === 'arti') {
                      setResult(`Jawaban: ${current.arti}`)
                    } else {
                      setResult(`Jawaban: ${current.romaji}`)
                    }
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Lihat Jawaban
                </button>
              )}
            </div>
            
            {result && (
              <div className="result text-white text-xl font-bold text-center p-2 bg-slate-500/50 dark:bg-gray-600/80 rounded-lg">
                {result}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}