import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          <Link href="/guidelines" className="text-xs text-gray-500 hover:text-gray-700 hover:underline">
            投稿ガイドライン・免責事項
          </Link>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          © {new Date().getFullYear()} IFAレビュー
          当サイトは口コミ情報の掲載のみを目的としており、金融商品・保険の勧誘・媒介・紹介は行っておりません。
          掲載された口コミは投稿者個人の意見であり、特定の事業者を推薦・保証するものではありません。
          掲載情報の正確性・完全性を保証するものではなく、当サイトの情報を参考にした投資・保険契約等の判断について当サイトは一切の責任を負いません。
          投稿内容に関する法的責任は投稿者本人が負います。
        </p>
      </div>
    </footer>
  )
}
