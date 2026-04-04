'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

interface ReviewCTAProps {
  advisorId: string
  reviewCount: number
}

export default function ReviewCTA({ advisorId, reviewCount }: ReviewCTAProps) {
  const [state, setState] = useState<'loading' | 'guest' | 'reviewed' | 'can_review'>('loading')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setState('guest')
        return
      }
      const { data: existing } = await supabase
        .from('reviews')
        .select('id')
        .eq('advisor_id', advisorId)
        .eq('user_id', data.user.id)
        .maybeSingle()
      setState(existing ? 'reviewed' : 'can_review')
    })
  }, [advisorId])

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">口コミ ({reviewCount}件)</h2>
      {state === 'loading' && <span className="text-sm text-gray-300">...</span>}
      {state === 'guest' && (
        <Link
          href="/auth/login"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ログインして口コミを書く
        </Link>
      )}
      {state === 'reviewed' && <span className="text-sm text-gray-400">投稿済み</span>}
      {state === 'can_review' && (
        <Link
          href={`/advisors/${advisorId}/review`}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          口コミを書く
        </Link>
      )}
    </div>
  )
}
