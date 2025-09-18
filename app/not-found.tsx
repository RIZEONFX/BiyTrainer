import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Halaman tidak ditemukan</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Maaf, halaman yang Anda cari tidak ada atau sedang dalam pengembangan.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg no-underline transition-colors duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}