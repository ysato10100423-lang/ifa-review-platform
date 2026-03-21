import Link from 'next/link'
import { Advisor, ADVISOR_TYPE_LABELS } from '@/types'
import StarRating from './StarRating'

interface AdvisorCardProps {
  advisor: Advisor
}

export default function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Link href={`/advisors/${advisor.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                {ADVISOR_TYPE_LABELS[advisor.type]}
              </span>
              {advisor.prefecture && (
                <span className="text-xs text-gray-500">{advisor.prefecture}</span>
              )}
            </div>
            <h2 className="text-base font-semibold text-gray-900 truncate">{advisor.name}</h2>
            {advisor.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{advisor.description}</p>
            )}
            {advisor.specialties && advisor.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {advisor.specialties.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-center shrink-0">
            <div className="text-2xl font-bold text-gray-900">
              {advisor.avg_rating > 0 ? advisor.avg_rating.toFixed(1) : '-'}
            </div>
            <StarRating value={advisor.avg_rating} size="sm" />
            <div className="text-xs text-gray-500 mt-0.5">{advisor.review_count}件</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
