'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Advisor, AdvisorType, ADVISOR_TYPE_LABELS, MeetingMethod, MEETING_METHOD_LABELS } from '@/types'
import AdvisorCard from '@/components/AdvisorCard'

const PREFECTURES = [
  '全国',
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export default function Home() {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<AdvisorType | ''>('')
  const [prefFilter, setPrefFilter] = useState('')
  const [meetingFilter, setMeetingFilter] = useState<MeetingMethod | ''>('')
  const [sortBy, setSortBy] = useState<'avg_rating' | 'review_count'>('avg_rating')

  useEffect(() => {
    fetchAdvisors()
  }, [typeFilter, prefFilter, meetingFilter, sortBy])

  async function fetchAdvisors() {
    setLoading(true)
    const supabase = createClient()
    let query = supabase
      .from('advisors')
      .select('*')
      .order(sortBy, { ascending: false })

    if (typeFilter) query = query.eq('type', typeFilter)
    if (prefFilter) query = query.eq('prefecture', prefFilter)
    if (meetingFilter) query = query.eq('meeting_method', meetingFilter)

    const { data } = await query
    setAdvisors(data || [])
    setLoading(false)
  }

  const filtered = advisors.filter((a) =>
    a.name.includes(search) ||
    (a.description?.includes(search)) ||
    (a.specialties?.some((s) => s.includes(search)))
  )

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">IFA・保険代理店の口コミ・評判</h1>
        <p className="text-sm text-gray-500">実際に利用したユーザーによる口コミ・評価を掲載しています</p>
      </div>

      {/* 免責バナー */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          当サイトは利用者の口コミ情報の掲載のみを目的としており、金融商品・保険の勧誘・媒介・紹介は行っておりません。
          掲載された口コミはユーザー個人の意見であり、特定の事業者を推薦・保証するものではありません。
          契約・申込みは必ずご自身の判断と責任で行ってください。
        </p>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 space-y-3">
        <input
          type="text"
          placeholder="社名・専門分野で検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as AdvisorType | '')}
            className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
          >
            <option value="">種別: すべて</option>
            {(Object.keys(ADVISOR_TYPE_LABELS) as AdvisorType[]).map((k) => (
              <option key={k} value={k}>{ADVISOR_TYPE_LABELS[k]}</option>
            ))}
          </select>
          <select
            value={prefFilter}
            onChange={(e) => setPrefFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
          >
            <option value="">地域: すべて</option>
            {PREFECTURES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={meetingFilter}
            onChange={(e) => setMeetingFilter(e.target.value as MeetingMethod | '')}
            className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
          >
            <option value="">面談方法: すべて</option>
            {(Object.keys(MEETING_METHOD_LABELS) as MeetingMethod[]).map((k) => (
              <option key={k} value={k}>{MEETING_METHOD_LABELS[k]}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'avg_rating' | 'review_count')}
            className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none"
          >
            <option value="avg_rating">評価が高い順</option>
            <option value="review_count">口コミが多い順</option>
          </select>
        </div>
      </div>

      {/* 件数 */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-3">{filtered.length}件</p>
      )}

      {/* 一覧 */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">読み込み中...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">該当する結果がありません</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((advisor) => (
            <AdvisorCard key={advisor.id} advisor={advisor} />
          ))}
        </div>
      )}
    </div>
  )
}
