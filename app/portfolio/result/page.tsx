'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { getPortfolio, PORTFOLIO_QUESTIONS } from '@/data/portfolio'

const TYPE_COLOR: Record<string, string> = {
  very_conservative: 'bg-blue-50 border-blue-300 text-blue-700',
  conservative: 'bg-teal-50 border-teal-300 text-teal-700',
  balanced: 'bg-green-50 border-green-300 text-green-700',
  growth: 'bg-orange-50 border-orange-300 text-orange-700',
  aggressive: 'bg-red-50 border-red-300 text-red-700',
}

const BAR_COLOR: Record<string, string> = {
  domestic_stock: 'bg-blue-500',
  global_stock: 'bg-green-500',
  domestic_bond: 'bg-yellow-400',
  global_bond: 'bg-amber-300',
  reit: 'bg-purple-400',
  commodity: 'bg-orange-400',
  cash: 'bg-gray-300',
}

const ALLOC_LABEL: Record<string, string> = {
  domestic_stock: '国内株式',
  global_stock: '海外株式',
  domestic_bond: '国内債券',
  global_bond: '海外債券',
  reit: '不動産投信（REIT）',
  commodity: 'コモディティ',
  cash: '現金・預金',
}

function ResultContent() {
  const searchParams = useSearchParams()
  const answers: Record<string, string> = {}
  PORTFOLIO_QUESTIONS.forEach((q) => {
    const v = searchParams.get(q.id)
    if (v) answers[q.id] = v
  })

  if (Object.keys(answers).length < PORTFOLIO_QUESTIONS.length) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <p className="text-gray-500 mb-4">診断が完了していません</p>
        <Link href="/portfolio" className="text-blue-600 hover:underline">診断をやり直す</Link>
      </div>
    )
  }

  const portfolio = getPortfolio(answers)
  const allocation = portfolio.allocation
  const colorClass = TYPE_COLOR[portfolio.type] ?? 'bg-gray-50 border-gray-300 text-gray-700'

  return (
    <div className="max-w-xl mx-auto">
      {/* タイトル */}
      <div className="mb-6">
        <div className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-2">診断完了</div>
        <h1 className="text-xl font-bold text-gray-900">あなたのおすすめポートフォリオ</h1>
        <p className="text-sm text-gray-500 mt-1">回答をもとに最適な資産配分を提案します</p>
      </div>

      {/* ポートフォリオタイプ */}
      <div className={`border-2 rounded-xl p-5 mb-6 ${colorClass}`}>
        <p className="text-xs font-medium mb-1">あなたのタイプ</p>
        <h2 className="text-2xl font-bold mb-2">{portfolio.label}</h2>
        <p className="text-sm leading-relaxed">{portfolio.description}</p>
      </div>

      {/* 資産配分 */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">推奨 資産配分</h3>

        {/* 積み上げバー */}
        <div className="flex rounded-full overflow-hidden h-6 mb-4">
          {Object.entries(allocation).map(([key, value]) => (
            <div
              key={key}
              className={`${BAR_COLOR[key]} transition-all`}
              style={{ width: `${value}%` }}
              title={`${ALLOC_LABEL[key]}: ${value}%`}
            />
          ))}
        </div>

        {/* 凡例 */}
        <div className="space-y-2.5">
          {Object.entries(allocation).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${BAR_COLOR[key]}`} />
                <span className="text-sm text-gray-700">{ALLOC_LABEL[key]}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${BAR_COLOR[key]} rounded-full`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8 text-right">{value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SNSシェア */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">診断結果をシェアする</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`ポートフォリオ診断をやってみました！\n\n私のタイプ：${portfolio.label}\n国内株${allocation.domestic_stock}% / 海外株${allocation.global_stock}% / 債券${allocation.domestic_bond + allocation.global_bond}% / REIT${allocation.reit}% / 現金${allocation.cash}%\n\nあなたのおすすめ資産配分は？👇`)}&url=${encodeURIComponent('https://ifa-review.com/portfolio?utm_source=twitter&utm_medium=social&utm_campaign=share')}&hashtags=ポートフォリオ診断,NISA,資産運用`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white text-sm py-2.5 rounded hover:bg-gray-800"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Xでシェア
          </a>
          <a
            href={`https://line.me/R/msg/text/?${encodeURIComponent(`ポートフォリオ診断をやってみました！\n私のタイプ：${portfolio.label}\n国内株${allocation.domestic_stock}% / 海外株${allocation.global_stock}% / 債券${allocation.domestic_bond + allocation.global_bond}% / REIT${allocation.reit}% / 現金${allocation.cash}%\n\nあなたも診断してみては？👇\nhttps://ifa-review.com/portfolio?utm_source=line&utm_medium=social&utm_campaign=share`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white text-sm py-2.5 rounded hover:bg-green-600"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            LINEでシェア
          </a>
        </div>
      </div>

      {/* 免責事項 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-xs text-gray-500 space-y-1">
        <p className="font-semibold text-gray-600">【ご注意】</p>
        <p>本診断結果は一般的な情報提供を目的としたものであり、金融商品取引法上の投資助言・勧誘を行うものではありません。</p>
        <p>実際の投資判断は各自の責任において行ってください。</p>
      </div>

      {/* アクション */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/portfolio" className="flex-1 text-center border border-gray-300 text-gray-600 py-2.5 rounded hover:bg-gray-50 text-sm">
          もう一度診断する
        </Link>
        <Link href="/diagnosis" className="flex-1 text-center bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 text-sm">
          証券会社診断もやってみる
        </Link>
      </div>
    </div>
  )
}

export default function PortfolioResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-400">読み込み中...</div>}>
      <ResultContent />
    </Suspense>
  )
}
