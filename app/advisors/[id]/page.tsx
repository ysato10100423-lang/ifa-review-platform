import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { ADVISOR_TYPE_LABELS, AdvisorType, Review } from '@/types'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import ReviewCTA from './ReviewCTA'

export const revalidate = 3600
// generateStaticParams で生成していないIDは404を返す
export const dynamicParams = false

const RATING_ITEMS = [
  { key: 'rating_proposal' as keyof Review, label: '提案の質' },
  { key: 'rating_fee_transparency' as keyof Review, label: '手数料の透明性' },
  { key: 'rating_communication' as keyof Review, label: 'コミュニケーション' },
  { key: 'rating_expertise' as keyof Review, label: '専門知識' },
]

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data } = await supabase.from('advisors').select('id')
  return (data || []).map((a) => ({ id: a.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const supabase = createServerClient()
  const { data: advisor } = await supabase
    .from('advisors')
    .select('name, description, type, prefecture, avg_rating, review_count')
    .eq('id', id)
    .single()

  if (!advisor) return { title: 'IFAレビュー' }

  const typeLabel = ADVISOR_TYPE_LABELS[advisor.type as AdvisorType] ?? 'IFA・保険代理店'
  const title = `${advisor.name}の口コミ・評判 | IFAレビュー`
  const description = advisor.description
    ? `${advisor.name}（${typeLabel}）の口コミ・評判。${advisor.description.slice(0, 80)}`
    : `${advisor.name}（${typeLabel}${advisor.prefecture ? `・${advisor.prefecture}` : ''}）の口コミ・評判。実際に利用したユーザーのリアルな評価を掲載しています。`

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ifa-review-platform.vercel.app'
  const pageUrl = `${baseUrl}/advisors/${id}`
  const ogImage = `${baseUrl}/og-image.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: pageUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function AdvisorDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createServerClient()

  const [{ data: advisor }, { data: reviewsRaw }] = await Promise.all([
    supabase.from('advisors').select('*').eq('id', id).single(),
    supabase
      .from('reviews')
      .select('*, profiles(nickname)')
      .eq('advisor_id', id)
      .order('created_at', { ascending: false }),
  ])

  if (!advisor) notFound()

  const reviews: Review[] = reviewsRaw || []

  // 項目別平均
  const avgByKey = (key: keyof Review) => {
    if (reviews.length === 0) return 0
    return reviews.reduce((sum, r) => sum + (r[key] as number), 0) / reviews.length
  }

  const typeLabel = ADVISOR_TYPE_LABELS[advisor.type as AdvisorType] ?? 'IFA・保険代理店'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ifa-review-platform.vercel.app'

  // JSON-LD 構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: advisor.name,
    description: advisor.description || undefined,
    url: advisor.website_url || undefined,
    address: advisor.prefecture
      ? {
          '@type': 'PostalAddress',
          addressLocality: advisor.prefecture,
          addressCountry: 'JP',
          streetAddress: advisor.address || undefined,
        }
      : undefined,
    ...(advisor.review_count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: advisor.avg_rating,
            reviewCount: advisor.review_count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  }

  const pageUrl = `${baseUrl}/advisors/${id}`
  const shareText = `${advisor.name}の口コミ・評判 | IFAレビュー`
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          ← 一覧に戻る
        </Link>

        {/* アドバイザー基本情報 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                  {typeLabel}
                </span>
                {advisor.prefecture && (
                  <span className="text-sm text-gray-500">{advisor.prefecture}</span>
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">{advisor.name}</h1>
              {advisor.description && (
                <p className="text-sm text-gray-600 mb-3">{advisor.description}</p>
              )}
              {advisor.address && (
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">住所：</span>{advisor.address}
                </p>
              )}
              {advisor.specialties && advisor.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {advisor.specialties.map((tag: string) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {advisor.website_url && (
                <a
                  href={advisor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                >
                  公式サイト →
                </a>
              )}
            </div>
            <div className="text-center shrink-0">
              <div className="text-4xl font-bold text-gray-900">
                {advisor.avg_rating > 0 ? Number(advisor.avg_rating).toFixed(1) : '-'}
              </div>
              <StarRating value={advisor.avg_rating} size="lg" />
              <div className="text-sm text-gray-500 mt-1">{advisor.review_count}件の口コミ</div>
            </div>
          </div>

          {/* 項目別平均 */}
          {reviews.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-x-6 gap-y-2">
              {RATING_ITEMS.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <div className="flex items-center gap-1">
                    <StarRating value={avgByKey(key)} size="sm" />
                    <span className="text-xs text-gray-500">{avgByKey(key).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 免責文 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            掲載されている評価・口コミはユーザー個人の体験・意見です。当サイトはこの事業者を推薦・保証するものではなく、金融商品・保険の勧誘・媒介は行っておりません。
            契約・申込みはご自身の判断と責任で行ってください。
          </p>
        </div>

        {/* SNSシェアボタン */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-gray-500">シェア：</span>
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1.5 rounded hover:bg-gray-800"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </a>
          <a
            href={lineShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-green-500 text-white text-xs px-3 py-1.5 rounded hover:bg-green-600"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.630 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE
          </a>
        </div>

        {/* 口コミ投稿 CTA（クライアントコンポーネント） */}
        <ReviewCTA advisorId={id} reviewCount={reviews.length} />

        {/* 口コミ一覧 */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white border border-gray-200 rounded-lg">
            まだ口コミがありません。最初の口コミを書いてみましょう。
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} isLoggedIn={false} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
