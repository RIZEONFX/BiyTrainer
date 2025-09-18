import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <section className="hero text-center py-24 px-8 bg-gradient-to-br from-blue-500 to-blue-300 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Selamat Datang di BiyTrainer ID</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Belajar huruf Jepang dengan cara interaktif dan menyenangkan!</p>
          <Link 
            href="/latihan-hiragana" 
            className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg no-underline transition-transform hover:scale-105 shadow-lg"
          >
            Mulai Latihan Hiragana
          </Link>
        </div>
      </section>
      
      <section className="features py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pilihan Materi Belajar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-200/10 p-8 rounded-2xl text-center transition-all duration-300 shadow-[0_0_3px_rgba(0,0,0,0.2)] dark:border dark:border-gray-700">
              <div className="text-4xl mb-4">🎌</div>
              <h3 className="text-2xl font-semibold mb-4">Hiragana</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Latihan dasar huruf Jepang yang paling pertama dipelajari.</p>
              <Link 
                href="/latihan-hiragana" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg no-underline transition-colors"
              >
                Mulai Latihan
              </Link>
            </div>
            
            <div className="bg-gray-200/10 p-8 rounded-2xl text-center transition-all duration-300 shadow-[0_0_3px_rgba(0,0,0,0.2)] dark:border dark:border-gray-700">
              <div className="text-4xl mb-4">🈹</div>
              <h3 className="text-2xl font-semibold mb-4">Katakana</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Latihan huruf untuk kata serapan dan nama asing.</p>
              <Link 
                href="/katakana" 
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg no-underline transition-colors"
              >
                Segera Hadir
              </Link>
            </div>
            
            <div className="bg-gray-200/10 p-8 rounded-2xl text-center transition-all duration-300 shadow-[0_0_3px_rgba(0,0,0,0.2)] shadow dark:border dark:border-gray-700">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-2xl font-semibold mb-4">Kosakata</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Perbanyak perbendaharaan kata untuk melancarkan percakapan.</p>
              <Link 
                href="/kosakata" 
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg no-underline transition-colors"
              >
                Segera Hadir
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}