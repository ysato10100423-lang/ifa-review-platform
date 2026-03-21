import { Review, SERVICE_LABELS } from '@/types'
import StarRating from './StarRating'

interface ReviewCardProps {
  review: Review
}

const RATING_LABELS = [
  { key: 'rating_proposal', label: '提案の質' },
  { key: 'rating_fee_transparency', label: '手数料の透明性' },
  { key: 'rating_communication', label: 'コミュニケーション' },
  { key: 'rating_expertise', label: '専門知識' },
] as const

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.created_at).toLocaleDateString('ja-JP')
  const nickname = review.profiles?.nickname || '匿名ユーザー'

  return (
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
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-gray-900">{review.rating_overall}</span>
          <StarRating value={review.rating_overall} size="sm" />
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
    </div>
  )
}
