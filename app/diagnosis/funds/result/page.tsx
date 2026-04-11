'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getRankedFunds } from '@/data/diagnosis-funds'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

function FundsResult() {
  const searchParams = useSearchParams()
  const answers: Record<string, string> = {}
  searchParams.forEach((value, key) => { answers[key] = value })

  const ranked = getRankedFunds(answers)
  const top3 = ranked.slice(0, 3)
  const rest = ranked.slice(3, 8)

  const shareText = `投資信託診断の結果、${top3[0]?.name}がおすすめでした！`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-3">診断完了</span>
          <h1 className="text-xl font-bold text-gray-900">あなたへのおすすめ投資信託</h1>
          <p className="text-sm text-gray-500 mt-1">回答内容をもとに最適な投資信託をランキングしました</p>
        </div>

        {/* TOP3 */}
        <div className="space-y-4 mb-6">
          {top3.map((fund, idx) => (
            <div key={fund.id}>
              {idx === 0 && (
                <div className="text-center mb-2">
                  <span className="text-2xl">🥇</span>
                  <span className="ml-1 text-sm font-bold text-yellow-600">あなたへの一番のおすすめ</span>
                </div>
              )}
              <ProductCard product={{ ...fund, rank: idx + 1 }} />
            </div>
          ))}
        </div>

        {/* 4位以降 */}
        {rest.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-3">その他のおすすめ（4〜8位）</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {rest.map((fund, idx) => (
                <ProductCard key={fund.id} product={{ ...fund, rank: idx + 4 }} />
              ))}
            </div>
          </div>
        )}

        {/* SNSシェア */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">結果をシェアする</p>
          <div className="flex gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-black text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              𝕏 でシェア
            </a>
            <a
              href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              LINE でシェア
            </a>
          </div>
        </div>

        {/* 他の診断へ */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-gray-600 mb-3">保険の見直しも検討しませんか？</p>
          <Link
            href="/diagnosis/insurance"
            className="inline-block bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            🛡️ 保険診断もやってみる
          </Link>
        </div>

        {/* 診断やり直し */}
        <div className="text-center mb-4">
          <Link href="/diagnosis/funds" className="text-sm text-blue-600 hover:underline">
            ← 投資信託診断をやり直す
          </Link>
        </div>

        {/* 免責事項 */}
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed">
          当サイトの診断結果は情報提供のみを目的としており、金融商品の勧誘・媒介は行っておりません。
          掲載情報の正確性を保証するものではなく、投資の最終判断はご自身の責任で行ってください。
          最新の信託報酬・運用実績は各社公式サイトをご確認ください。
          過去の運用実績は将来の成果を保証するものではありません。
        </div>
      </div>
    </div>
  )
}

export default function FundsResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">結果を計算中...</div>}>
      <FundsResult />
    </Suspense>
  )
}
