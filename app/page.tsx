import type { Metadata } from 'next'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { FUNDS } from '@/data/funds'
import { INSURANCES } from '@/data/insurance'

export const metadata: Metadata = {
  title: '投信・保険 おすすめナビ - 投資信託・保険の比較・無料診断',
  description: '投資信託・保険のおすすめ商品をランキングと無料診断でご紹介。NISAや積立投資に最適なファンド、あなたに合った保険がすぐわかります。',
}

const top5Funds = FUNDS.filter(f => f.rank <= 5).sort((a, b) => a.rank - b.rank)
const top5Insurances = INSURANCES.filter(i => i.rank <= 5).sort((a, b) => a.rank - b.rank)

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* ヒーローセクション */}
      <section className="text-center py-8 px-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          あなたに合った金融商品が見つかる
        </h1>
        <p className="text-blue-100 text-sm sm:text-base mb-6 max-w-lg mx-auto">
          無料診断で投資信託・保険のおすすめ商品をご提案します。
          5つの質問に答えるだけで、あなたのニーズに合った商品がわかります。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/diagnosis/funds"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            📈 投資信託診断（無料）
          </Link>
          <Link
            href="/diagnosis/insurance"
            className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-400 transition-colors border border-blue-400 text-sm"
          >
            🛡️ 保険診断（無料）
          </Link>
        </div>
      </section>

      {/* 投資信託ランキング TOP5 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">📈 投資信託 人気ランキング TOP5</h2>
          <Link href="/funds" className="text-sm text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {top5Funds.map(fund => (
            <ProductCard key={fund.id} product={fund} />
          ))}
        </div>
      </section>

      {/* 保険ランキング TOP5 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">🛡️ 保険 人気ランキング TOP5</h2>
          <Link href="/insurance" className="text-sm text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {top5Insurances.map(ins => (
            <ProductCard key={ins.id} product={ins} />
          ))}
        </div>
      </section>

      {/* 診断バナー */}
      <section className="grid sm:grid-cols-2 gap-4">
        <Link href="/diagnosis/funds" className="block bg-blue-50 border border-blue-200 rounded-lg p-5 hover:bg-blue-100 transition-colors">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="font-semibold text-blue-900 mb-1">投資信託診断</h3>
          <p className="text-xs text-blue-700">投資経験・リスク許容度・目標に合った投資信託をご提案。5問だけで完了します。</p>
          <span className="inline-block mt-3 text-xs font-medium text-blue-600 bg-white border border-blue-300 px-3 py-1 rounded-full">
            無料で診断する →
          </span>
        </Link>
        <Link href="/diagnosis/insurance" className="block bg-green-50 border border-green-200 rounded-lg p-5 hover:bg-green-100 transition-colors">
          <div className="text-2xl mb-2">🛡️</div>
          <h3 className="font-semibold text-green-900 mb-1">保険診断</h3>
          <p className="text-xs text-green-700">年齢・家族構成・気になるリスクからあなたに合った保険をご提案。5問で完了します。</p>
          <span className="inline-block mt-3 text-xs font-medium text-green-600 bg-white border border-green-300 px-3 py-1 rounded-full">
            無料で診断する →
          </span>
        </Link>
      </section>

      {/* 免責事項 */}
      <section className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed">
        <p className="font-medium text-gray-600 mb-1">【免責事項】</p>
        <p>
          当サイトに掲載している情報は、情報提供のみを目的としており、金融商品・保険の勧誘・媒介・紹介は行っておりません。
          掲載情報の正確性・完全性を保証するものではありません。投資・保険の加入にあたっては最新情報を各社公式サイトにてご確認の上、
          ご自身の判断と責任のもとでお決めください。過去の運用実績は将来の運用成果を保証するものではありません。
        </p>
      </section>
    </div>
  )
}
