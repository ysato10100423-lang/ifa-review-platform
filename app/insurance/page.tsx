'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { INSURANCES, INSURANCE_CATEGORIES, InsuranceCategory } from '@/data/insurance'
import InsuranceConsultationSection from '@/components/InsuranceConsultationSection'
import Link from 'next/link'

export default function InsurancePage() {
  const [category, setCategory] = useState<InsuranceCategory | 'all'>('all')

  const filtered = INSURANCES.filter(i => {
    if (category !== 'all' && i.category !== category) return false
    return true
  }).sort((a, b) => a.rank - b.rank)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">保険ランキング</h1>
        <p className="text-sm text-gray-500">人気の保険商品を比較・ランキング形式でご紹介します</p>
      </div>

      {/* 診断CTA */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-green-900">あなたに合った保険を診断</p>
          <p className="text-xs text-green-600">5問に答えるだけでおすすめの保険がわかります</p>
        </div>
        <Link
          href="/diagnosis/insurance"
          className="shrink-0 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          無料診断する →
        </Link>
      </div>

      {/* フィルター */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-xs font-medium text-gray-500 mb-2">保険の種類</p>
        <div className="flex flex-wrap gap-2">
          {INSURANCE_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value as InsuranceCategory | 'all')}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                category === cat.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length}件の保険商品</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(ins => (
          <ProductCard key={ins.id} product={ins} />
        ))}
      </div>

      <div className="mt-6 mb-6">
        <InsuranceConsultationSection />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 leading-relaxed">
        当サイトの情報は情報提供のみを目的としており、保険の勧誘・媒介は行っておりません。
        掲載の保険料はあくまで参考例であり、年齢・健康状態・加入条件によって異なります。
        最新情報・詳細条件は各社公式サイトにてご確認の上、ご自身の判断で加入をご検討ください。
      </div>
    </div>
  )
}
