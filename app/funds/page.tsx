'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { FUNDS, FUND_CATEGORIES, FundCategory } from '@/data/funds'
import Link from 'next/link'

export default function FundsPage() {
  const [category, setCategory] = useState<FundCategory | 'all'>('all')
  const [maxExpense, setMaxExpense] = useState<string>('all')

  const filtered = FUNDS.filter(f => {
    if (category !== 'all' && f.category !== category) return false
    if (maxExpense === '0.1' && f.expense_ratio > 0.1) return false
    if (maxExpense === '0.2' && f.expense_ratio > 0.2) return false
    if (maxExpense === '0.5' && f.expense_ratio > 0.5) return false
    return true
  }).sort((a, b) => a.rank - b.rank)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">投資信託ランキング</h1>
        <p className="text-sm text-gray-500">人気の投資信託を比較・ランキング形式でご紹介します</p>
      </div>

      {/* 診断CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-blue-900">あなたに合った投資信託を診断</p>
          <p className="text-xs text-blue-600">5問に答えるだけでおすすめファンドがわかります</p>
        </div>
        <Link
          href="/diagnosis/funds"
          className="shrink-0 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          無料診断する →
        </Link>
      </div>

      {/* フィルター */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">カテゴリ</p>
          <div className="flex flex-wrap gap-2">
            {FUND_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value as FundCategory | 'all')}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  category === cat.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">信託報酬（年率）</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'すべて' },
              { value: '0.1', label: '0.1%以下' },
              { value: '0.2', label: '0.2%以下' },
              { value: '0.5', label: '0.5%以下' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setMaxExpense(opt.value)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  maxExpense === opt.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length}件の投資信託</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(fund => (
          <ProductCard key={fund.id} product={fund} />
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed">
        当サイトの情報は情報提供のみを目的としており、金融商品の勧誘・媒介は行っておりません。
        最新の信託報酬・基準価額・運用実績は各ファンドの目論見書および各社公式サイトをご確認ください。
        過去の運用実績は将来の成果を保証するものではありません。
      </div>
    </div>
  )
}
