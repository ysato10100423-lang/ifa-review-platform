'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { getRankedBrokers, BROKERS, QUESTIONS } from '@/data/diagnosis'

const BADGE_COLOR: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
}

const RANK_STYLE = [
  'border-2 border-yellow-400 bg-white',
  'border border-gray-300 bg-white',
  'border border-gray-200 bg-gray-50',
]

const RANK_LABEL = ['1位', '2位', '3位']
const RANK_LABEL_COLOR = [
  'text-yellow-600 font-bold text-lg',
  'text-gray-500 font-semibold',
  'text-gray-400 font-medium',
]

function ResultContent() {
  const searchParams = useSearchParams()
  const answers: Record<string, string> = {}
  QUESTIONS.forEach((q) => {
    const v = searchParams.get(q.id)
    if (v) answers[q.id] = v
  })

  const ranked = getRankedBrokers(answers)
  const top3 = ranked.slice(0, 3)
  const rest = ranked.slice(3)

  if (Object.keys(answers).length < QUESTIONS.length) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <p className="text-gray-500 mb-4">診断が完了していません</p>
        <Link href="/diagnosis" className="text-blue-600 hover:underline">診断をやり直す</Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* タイトル */}
      <div className="mb-6">
        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-2">診断完了</div>
        <h1 className="text-xl font-bold text-gray-900">あなたにおすすめの証券会社</h1>
        <p className="text-sm text-gray-500 mt-1">回答をもとにスコアリングした結果です</p>
      </div>

      {/* TOP3 */}
      <div className="space-y-3 mb-6">
        {top3.map((broker, i) => (
          <div key={broker.id} className={`rounded-lg p-4 ${RANK_STYLE[i] ?? 'border border-gray-200'}`}>
            <div className="flex items-start gap-3">
              <div className="shrink-0 text-center w-8">
                <span className={RANK_LABEL_COLOR[i] ?? 'text-gray-400'}>{RANK_LABEL[i]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{broker.name}</span>
                  {broker.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_COLOR[broker.color] ?? 'bg-gray-100 text-gray-600'}`}>
                      {broker.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{broker.tagline}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {broker.strengths.map((s) => (
                    <li key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={broker.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-3 inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  公式サイトを見る →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4位以下 */}
      {rest.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-xs font-semibold text-gray-500 mb-3">その他の証券会社</p>
          <div className="space-y-3">
            {rest.map((broker, i) => (
              <div key={broker.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 w-6 shrink-0">{i + 4}位</span>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{broker.name}</span>
                    <p className="text-xs text-gray-500 line-clamp-1">{broker.tagline}</p>
                  </div>
                </div>
                <a
                  href={broker.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-xs text-blue-600 hover:underline shrink-0"
                >
                  公式サイト
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 免責事項 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-xs text-gray-500 space-y-1">
        <p className="font-semibold text-gray-600">【ご注意】</p>
        <p>本診断結果は一般的な情報提供を目的としたものであり、金融商品取引法上の投資助言・勧誘を行うものではありません。</p>
        <p>実際の投資判断は各自の責任において行ってください。各証券会社の最新の手数料・サービス内容は公式サイトをご確認ください。</p>
      </div>

      {/* アクション */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/diagnosis"
          className="flex-1 text-center border border-gray-300 text-gray-600 py-2.5 rounded hover:bg-gray-50 text-sm"
        >
          もう一度診断する
        </Link>
        <Link
          href="/"
          className="flex-1 text-center bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 text-sm"
        >
          IFAのロコミを見る
        </Link>
      </div>
    </div>
  )
}

export default function DiagnosisResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-400">読み込み中...</div>}>
      <ResultContent />
    </Suspense>
  )
}
