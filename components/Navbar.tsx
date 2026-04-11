import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-700 shrink-0">
          金融商品ガイド
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/funds"
            className="text-sm text-gray-600 hover:text-blue-700 px-2 py-1.5 rounded hover:bg-blue-50 transition-colors"
          >
            投資信託
          </Link>
          <Link
            href="/insurance"
            className="text-sm text-gray-600 hover:text-blue-700 px-2 py-1.5 rounded hover:bg-blue-50 transition-colors"
          >
            保険
          </Link>
          <Link
            href="/diagnosis/funds"
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
          >
            無料診断
          </Link>
        </div>
      </div>
    </nav>
  )
}
