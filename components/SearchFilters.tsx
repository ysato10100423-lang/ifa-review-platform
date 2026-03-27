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
  // テキスト入力のみローカルstate（タイピング中のURL書き換えを防ぐため）
  const [searchInput, setSearchInput] = useState(initialSearch)

  // セレクトはURLを正とする（controlled）
  const currentType = searchParams.get('type') || ''
  const currentPrefecture = searchParams.get('prefecture') || ''
  const currentMeeting = searchParams.get('meeting') || ''
  const currentSort = searchParams.get('sort') || 'avg_rating'

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

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 mb-4 space-y-3 ${isPending ? 'opacity-70' : ''}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateParam('q', searchInput)
        }}
      >
        <input
          type="text"
          name="q"
          placeholder="社名・専門分野で検索..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={() => updateParam('q', searchInput)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      <div className="flex flex-wrap gap-2">
        <select
          value={currentType}
          onChange={(e) => updateParam('type', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
        >
          <option value="">種別: すべて</option>
          {(Object.keys(ADVISOR_TYPE_LABELS) as AdvisorType[]).map((k) => (
            <option key={k} value={k}>{ADVISOR_TYPE_LABELS[k]}</option>
          ))}
        </select>
        <select
          value={currentPrefecture}
          onChange={(e) => updateParam('prefecture', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
        >
          <option value="">地域: すべて</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={currentMeeting}
          onChange={(e) => updateParam('meeting', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
        >
          <option value="">面談方法: すべて</option>
          {(Object.keys(MEETING_METHOD_LABELS) as MeetingMethod[]).map((k) => (
            <option key={k} value={k}>{MEETING_METHOD_LABELS[k]}</option>
          ))}
        </select>
        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
        >
          <option value="avg_rating">評価が高い順</option>
          <option value="review_count">口コミが多い順</option>
          <option value="name">名前順</option>
        </select>
      </div>
    </div>
  )
}
