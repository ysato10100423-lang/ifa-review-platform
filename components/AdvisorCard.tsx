import Link from 'next/link'
import { Advisor, ADVISOR_TYPE_LABELS, MEETING_METHOD_LABELS, MeetingMethod } from '@/types'
import StarRating from './StarRating'

interface AdvisorCardProps {
  advisor: Advisor
}

export default function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Link href={`/advisors/${advisor.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* バッジ行 */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                {ADVISOR_TYPE_LABELS[advisor.type]}
              </span>
              {advisor.prefecture && (
                <span className="text-xs text-gray-500 flex items-center gap-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {advisor.prefecture}
                </span>
              )}
              {advisor.meeting_method && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {MEETING_METHOD_LABELS[advisor.meeting_method as MeetingMethod]}
                </span>
              )}
            </div>

            {/* 社名 */}
            <h2 className="text-base font-semibold text-gray-900 truncate">{advisor.name}</h2>

            {/* 説明文 */}
            {advisor.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{advisor.description}</p>
            )}

            {/* 専門タグ */}
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

          {/* 評価 */}
          <div className="text-center shrink-0 min-w-[56px]">
            <div className="text-2xl font-bold text-gray-900 leading-none">
              {advisor.avg_rating > 0 ? advisor.avg_rating.toFixed(1) : '-'}
            </div>
            <StarRating value={advisor.avg_rating} size="sm" />
            <div className="text-xs text-gray-400 mt-0.5">{advisor.review_count}件</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
