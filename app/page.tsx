import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase-server'
import { AdvisorType } from '@/types'
import AdvisorCard from '@/components/AdvisorCard'
import SearchFilters from '@/components/SearchFilters'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ifa-review-platform.vercel.app'

export const metadata: Metadata = {
  title: 'IFA・保険代理店の口コミ・評判 | IFAレビュー',
  description: '実際に利用したユーザーによるIFA・保険代理店の口コミ・評価プラットフォーム。都道府県・種別・評価順で検索できます。',
  openGraph: {
    title: 'IFA・保険代理店の口コミ・評判 | IFAレビュー',
    description: '実際に利用したユーザーによるIFA・保険代理店の口コミ・評価プラットフォーム。都道府県・種別・評価順で検索できます。',
    type: 'website',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IFAレビュー - IFA・保険代理店の口コミ・評判',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IFA・保険代理店の口コミ・評判 | IFAレビュー',
    description: '実際に利用したユーザーによるIFA・保険代理店の口コミ・評価プラットフォーム。都道府県・種別・評価順で検索できます。',
    images: [`${SITE_URL}/og-image.png`],
  },
}

type SortBy = 'avg_rating' | 'review_count' | 'name'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; prefecture?: string; meeting?: string; sort?: string }>
}) {
  const params = await searchParams
  const q = params.q || ''
  const typeFilter = (params.type as AdvisorType) || ''
  const prefFilter = params.prefecture || ''
  const meetingFilter = params.meeting || ''
  const sortBy: SortBy = (params.sort as SortBy) || 'avg_rating'

  const supabase = createServerClient()
  let query = supabase.from('advisors').select('*')

  if (sortBy === 'name') {
    query = query.order('name', { ascending: true })
  } else {
    query = query.order(sortBy, { ascending: false })
  }

  if (typeFilter) query = query.eq('type', typeFilter)
  if (prefFilter) query = query.eq('prefecture', prefFilter)
  if (meetingFilter) query = query.eq('meeting_method', meetingFilter)

  const { data: advisors = [] } = await query

  const filtered = q
    ? (advisors || []).filter(
        (a) =>
          a.name.includes(q) ||
          a.description?.includes(q) ||
          a.specialties?.some((s: string) => s.includes(q))
      )
    : (advisors || [])

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
      <Suspense>
        <SearchFilters
          initialSearch={q}
          initialType={typeFilter}
          initialPrefecture={prefFilter}
          initialMeeting={meetingFilter}
          initialSort={sortBy}
        />
      </Suspense>

      {/* 件数 */}
      <p className="text-sm text-gray-500 mb-3">{filtered.length}件</p>

      {/* 一覧 */}
      {filtered.length === 0 ? (
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
