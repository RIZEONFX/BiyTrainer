'use client'

import { useState, useEffect, useCallback } from 'react'
import { katakanaData } from '@/utils/katakanaData'
import { Hiragana } from '@/types'

export default function LatihanKatakana() {
  const [selected, setSelected] = useState<Hiragana[]>(katakanaData)
  const [current, setCurrent] = useState<Hiragana | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    new Array(katakanaData.length).fill(true)
  )

  const updateSelected = useCallback(() => {
    const newSelected = katakanaData.filter((_, idx) => checkboxes[idx])
    setSelected(newSelected)
  }, [checkboxes])

  useEffect(() => {
    updateSelected()
  }, [updateSelected])

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes]
    newCheckboxes[index] = !newCheckboxes[index]
    setCheckboxes(newCheckboxes)
  }

  const toggleRow = (rowIndex: number) => {
    const newCheckboxes = [...checkboxes]
    const startIndex = rowIndex * 5
    const endIndex = Math.min(startIndex + 5, katakanaData.length)
    const allChecked = newCheckboxes.slice(startIndex, endIndex).every(Boolean)
    
    for (let i = startIndex; i < endIndex; i++) {
      newCheckboxes[i] = !allChecked
    }
    
    setCheckboxes(newCheckboxes)
  }

  const startTraining = () => {
    if (selected.length === 0) {
      alert('Pilih dulu huruf yang ingin dipelajari!')
      return
    }
    setIsTraining(true)
    randomKatakana()
  }

  const stopTraining = () => {
    setIsTraining(false)
    setCurrent(null)
    setAnswer('')
    setResult('')
    setShowAnswer(false)
  }

  const randomKatakana = useCallback(() => {
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
      setTimeout(randomKatakana, 1000)
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

  return (
    <div className="container max-w-4xl mx-auto mt-2 mb-8 p-6 light bg-white dark:bg-gray-800 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8">Latihan Katakana</h1>
      
      {!isTraining ? (
        <>
          <div className="options grid gap-4 mb-8 max-h-96 overflow-y-auto p-4 light bg-slate-200/10 shadow shadow-md rounded-lg">
            <h2 className="text-md font-semibold mb-4">Pilih Huruf yang Ingin Dipelajari:</h2>
            {Array.from({ length: Math.ceil(katakanaData.length / 5) }).map((_, rowIndex) => {
              const startIdx = rowIndex * 5
              const endIdx = Math.min(startIdx + 5, katakanaData.length)
              const rowItems = katakanaData.slice(startIdx, endIdx)
              
              return (
                <div key={`row-${rowIndex}`} className="row flex items-center gap-4 p-2 rounded-md">
                  <input
                    type="checkbox"
                    checked={rowItems.every((_, i) => checkboxes[startIdx + i])}
                    onChange={() => toggleRow(rowIndex)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  
                  {rowItems.map((katakana, cellIndex) => {
                    const idx = startIdx + cellIndex
                    return (
                      <label key={katakana.char} className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
                        <input
                          type="checkbox"
                          checked={checkboxes[idx]}
                          onChange={() => toggleCheckbox(idx)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-lg font-medium">{katakana.char}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({katakana.romaji})</span>
                      </label>
                    )
                  })}
                </div>
              )
            })}
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
                onClick={randomKatakana}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Acak Huruf
              </button>
            </div>
            
            {current && (
              <div className="katakana text-8xl font-bold my-8 text-center">{current.char}</div>
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
              <div className="result text-xl font-bold text-center p-2 bg-slate-500/50 text-white dark:bg-gray-600/80 rounded-lg">
                {result}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}