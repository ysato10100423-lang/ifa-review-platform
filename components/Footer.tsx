import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-700 hover:underline">
            プライバシーポリシー
          </Link>
          <Link href="/funds" className="text-xs text-gray-500 hover:text-gray-700 hover:underline">
            投資信託ランキング
          </Link>
          <Link href="/insurance" className="text-xs text-gray-500 hover:text-gray-700 hover:underline">
            保険ランキング
          </Link>
          <Link href="/diagnosis/funds" className="text-xs text-gray-500 hover:text-gray-700 hover:underline">
            投資信託診断
          </Link>
          <Link href="/diagnosis/insurance" className="text-xs text-gray-500 hover:text-gray-700 hover:underline">
            保険診断
          </Link>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          © {new Date().getFullYear()} 金融商品ガイド
          当サイトは情報提供のみを目的としており、金融商品・保険の勧誘・媒介・紹介は行っておりません。
          掲載情報の正確性・完全性を保証するものではなく、投資・保険の加入はご自身の判断と責任のもとで行ってください。
          最新情報は各社公式サイトにてご確認ください。
          当サイトにはアフィリエイト広告が含まれます。
        </p>
      </div>
    </footer>
  )
}
