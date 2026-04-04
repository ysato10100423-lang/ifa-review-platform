'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useTransition, useState } from 'react'
import { AdvisorType, ADVISOR_TYPE_LABELS, MeetingMethod, MEETING_METHOD_LABELS } from '@/types'

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

interface SearchFiltersProps {
  initialSearch: string
  initialType: string
  initialPrefecture: string
  initialMeeting: string
  initialSort: string
}

export default function SearchFilters({
  initialSearch,
}: SearchFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchInput, setSearchInput] = useState(initialSearch)

  const currentType = searchParams.get('type') || ''
  const currentPrefecture = searchParams.get('prefecture') || ''
  const currentMeeting = searchParams.get('meeting') || ''
  const currentSort = searchParams.get('sort') || 'avg_rating'

  const hasActiveFilters = !!(currentType || currentPrefecture || currentMeeting || searchInput)

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams]
  )

  const resetFilters = () => {
    setSearchInput('')
    const params = new URLSearchParams()
    if (currentSort && currentSort !== 'avg_rating') params.set('sort', currentSort)
    startTransition(() => {
      router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 mb-4 space-y-3 ${isPending ? 'opacity-70' : ''}`}>
      {/* 検索ボックス */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateParam('q', searchInput)
        }}
        className="relative"
      >
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          name="q"
          placeholder="社名・専門分野で検索..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={() => updateParam('q', searchInput)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* フィルター */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <select
          value={currentType}
          onChange={(e) => updateParam('type', e.target.value)}
          className={`border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentType ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'
          }`}
        >
          <option value="">種別: すべて</option>
          {(Object.keys(ADVISOR_TYPE_LABELS) as AdvisorType[]).map((k) => (
            <option key={k} value={k}>{ADVISOR_TYPE_LABELS[k]}</option>
          ))}
        </select>

        <select
          value={currentPrefecture}
          onChange={(e) => updateParam('prefecture', e.target.value)}
          className={`border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentPrefecture ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'
          }`}
        >
          <option value="">地域: すべて</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={currentMeeting}
          onChange={(e) => updateParam('meeting', e.target.value)}
          className={`border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentMeeting ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'
          }`}
        >
          <option value="">面談: すべて</option>
          {(Object.keys(MEETING_METHOD_LABELS) as MeetingMethod[]).map((k) => (
            <option key={k} value={k}>{MEETING_METHOD_LABELS[k]}</option>
          ))}
        </select>

        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="avg_rating">評価が高い順</option>
          <option value="review_count">口コミが多い順</option>
          <option value="name">名前順</option>
        </select>
      </div>

      {/* リセットボタン */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={resetFilters}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  )
}
