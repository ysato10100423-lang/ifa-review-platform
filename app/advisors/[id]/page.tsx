'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Advisor, Review, ADVISOR_TYPE_LABELS } from '@/types'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import { User } from '@supabase/supabase-js'

const RATING_ITEMS = [
  { key: 'rating_proposal', label: '提案の質' },
  { key: 'rating_fee_transparency', label: '手数料の透明性' },
  { key: 'rating_communication', label: 'コミュニケーション' },
  { key: 'rating_expertise', label: '専門知識' },
] as const

export default function AdvisorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [advisor, setAdvisor] = useState<Advisor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('advisors').select('*').eq('id', id).single(),
      supabase.from('reviews').select('*').eq('advisor_id', id).order('created_at', { ascending: false }),
      supabase.auth.getUser(),
    ]).then(([{ data: advisorData }, { data: reviewsData }, { data: userData }]) => {
      setAdvisor(advisorData)
      setReviews(reviewsData || [])
      const currentUser = userData.user
      setUser(currentUser)
      if (currentUser) {
        setHasReviewed(reviewsData?.some((r) => r.user_id === currentUser.id) ?? false)
      }
      setLoading(false)
    })
  }, [id])

  // 項目別平均
  const avgByKey = (key: keyof Review) => {
    if (reviews.length === 0) return 0
    return reviews.reduce((sum, r) => sum + (r[key] as number), 0) / reviews.length
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>
  if (!advisor) return <div className="text-center py-12 text-gray-400">見つかりません</div>

  return (
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
                {ADVISOR_TYPE_LABELS[advisor.type]}
              </span>
              {advisor.prefecture && (
                <span className="text-sm text-gray-500">{advisor.prefecture}</span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{advisor.name}</h1>
            {advisor.description && (
              <p className="text-sm text-gray-600 mb-3">{advisor.description}</p>
            )}
            {advisor.specialties && advisor.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {advisor.specialties.map((tag) => (
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
                className="text-sm text-blue-600 hover:underline mt-3 inline-block"
              >
                公式サイト →
              </a>
            )}
          </div>
          <div className="text-center shrink-0">
            <div className="text-4xl font-bold text-gray-900">
              {advisor.avg_rating > 0 ? advisor.avg_rating.toFixed(1) : '-'}
            </div>
            <StarRating value={advisor.avg_rating} size="lg" />
            <div className="text-sm text-gray-500 mt-1">{advisor.review_count}件の口コミ</div>
          </div>
        </div>

        {/* 項目別平均（レビューがある場合のみ） */}
        {reviews.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-x-6 gap-y-2">
            {RATING_ITEMS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="flex items-center gap-1">
                  <StarRating value={avgByKey(key as keyof Review)} size="sm" />
                  <span className="text-xs text-gray-500">{avgByKey(key as keyof Review).toFixed(1)}</span>
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

      {/* 口コミ投稿ボタン */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">口コミ ({reviews.length}件)</h2>
        {user ? (
          hasReviewed ? (
            <span className="text-sm text-gray-400">投稿済み</span>
          ) : (
            <Link
              href={`/advisors/${id}/review`}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
            >
              口コミを書く
            </Link>
          )
        ) : (
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:underline"
          >
            ログインして口コミを書く
          </Link>
        )}
      </div>

      {/* 口コミ一覧 */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white border border-gray-200 rounded-lg">
          まだ口コミがありません。最初の口コミを書いてみましょう。
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} isLoggedIn={!!user} />
          ))}
        </div>
      )}
    </div>
  )
}
