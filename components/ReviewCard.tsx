'use client'

import { useState, useEffect } from 'react'
import { Review, SERVICE_LABELS } from '@/types'
import StarRating from './StarRating'
import ReportModal from './ReportModal'
import { createClient } from '@/lib/supabase'

interface ReviewCardProps {
  review: Review
  isLoggedIn?: boolean
}

const RATING_LABELS = [
  { key: 'rating_proposal', label: '提案の質' },
  { key: 'rating_fee_transparency', label: '手数料の透明性' },
  { key: 'rating_communication', label: 'コミュニケーション' },
  { key: 'rating_expertise', label: '専門知識' },
] as const

export default function ReviewCard({ review, isLoggedIn }: ReviewCardProps) {
  const [showReport, setShowReport] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [liking, setLiking] = useState(false)
  const date = new Date(review.created_at).toLocaleDateString('ja-JP')
  const nickname = review.profiles?.nickname || '匿名ユーザー'

  useEffect(() => {
    const supabase = createClient()
    supabase.from('review_likes').select('id', { count: 'exact' }).eq('review_id', review.id)
      .then(({ count }) => setHelpfulCount(count ?? 0))
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      supabase.from('review_likes').select('id').eq('review_id', review.id).eq('user_id', data.user.id).single()
        .then(({ data: like }) => setLiked(!!like))
    })
  }, [review.id])

  const handleLike = async () => {
    if (!isLoggedIn || liking) return
    setLiking(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLiking(false); return }
    if (liked) {
      await supabase.from('review_likes').delete().eq('review_id', review.id).eq('user_id', user.id)
      setLiked(false)
      setHelpfulCount((c) => c - 1)
    } else {
      await supabase.from('review_likes').insert({ review_id: review.id, user_id: user.id })
      setLiked(true)
      setHelpfulCount((c) => c + 1)
    }
    setLiking(false)
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
              {nickname.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{nickname}</div>
              <div className="text-xs text-gray-400">{date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-gray-900">{review.rating_overall}</span>
              <StarRating value={review.rating_overall} size="sm" />
            </div>
            {isLoggedIn && (
              <button
                onClick={() => setShowReport(true)}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                title="この口コミを通報する"
              >
                通報
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
          {RATING_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{label}</span>
              <StarRating value={review[key]} size="sm" />
            </div>
          ))}
        </div>

        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {review.tags.map((tag) => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                ✓ {tag}
              </span>
            ))}
          </div>
        )}

        {review.service_used && (
          <div className="text-xs text-gray-500 mb-2">
            利用サービス: <span className="font-medium">{SERVICE_LABELS[review.service_used]}</span>
          </div>
        )}

        {review.comment && (
          <p className="text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
            {review.comment}
          </p>
        )}

        {/* 参考になったボタン */}
        <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={handleLike}
            disabled={!isLoggedIn || liking}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              liked
                ? 'bg-blue-50 border-blue-300 text-blue-600'
                : 'border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500'
            } disabled:cursor-not-allowed`}
            title={isLoggedIn ? undefined : 'ログインすると「参考になった」を押せます'}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
            </svg>
            参考になった {helpfulCount > 0 && <span className="font-medium">{helpfulCount}</span>}
          </button>
        </div>
      </div>

      {showReport && (
        <ReportModal reviewId={review.id} onClose={() => setShowReport(false)} />
      )}
    </>
  )
}
