'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { REVIEW_TAGS, SERVICE_LABELS, ServiceUsed } from '@/types'
import StarRating from '@/components/StarRating'

const RATING_ITEMS = [
  { key: 'rating_proposal', label: '提案の質', description: 'ニーズに合った提案をしてくれたか' },
  { key: 'rating_fee_transparency', label: '手数料の透明性', description: '費用・報酬について明確な説明があったか' },
  { key: 'rating_communication', label: 'コミュニケーション', description: 'レスポンスや説明の分かりやすさ' },
  { key: 'rating_expertise', label: '専門知識', description: '専門的な知識・経験を感じたか' },
] as const

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [advisorName, setAdvisorName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [ratings, setRatings] = useState({
    rating_overall: 0,
    rating_proposal: 0,
    rating_fee_transparency: 0,
    rating_communication: 0,
    rating_expertise: 0,
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [serviceUsed, setServiceUsed] = useState<ServiceUsed | ''>('')
  const [comment, setComment] = useState('')
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    // ログインチェック
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/auth/login')
    })
    supabase.from('advisors').select('name').eq('id', id).single().then(({ data }) => {
      if (data) setAdvisorName(data.name)
    })
  }, [id, router])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (ratings.rating_overall === 0) {
      setError('総合評価を選択してください')
      return
    }
    if (Object.values(ratings).some((v) => v === 0)) {
      setError('すべての評価項目を入力してください')
      return
    }

    setSubmitting(true)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      router.push('/auth/login')
      return
    }

    const { error: insertError } = await supabase.from('reviews').insert({
      advisor_id: id,
      user_id: userData.user.id,
      ...ratings,
      tags: selectedTags.length > 0 ? selectedTags : null,
      service_used: serviceUsed || null,
      comment: comment.trim() || null,
    })

    if (insertError) {
      setError(insertError.message === 'duplicate key value violates unique constraint "reviews_advisor_id_user_id_key"'
        ? 'すでにこのアドバイザーへの口コミを投稿済みです'
        : '投稿に失敗しました。もう一度お試しください。')
      setSubmitting(false)
      return
    }

    router.push(`/advisors/${id}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href={`/advisors/${id}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← {advisorName} の詳細に戻る
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">口コミを投稿</h1>
        <p className="text-sm text-gray-500 mb-4">{advisorName}</p>

        {/* 投稿ガイドライン */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-yellow-800 mb-2">投稿前にご確認ください</p>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside mb-2">
            <li>実際に利用した体験に基づく内容のみ投稿してください</li>
            <li>担当者・従業員の個人名（フルネーム・ニックネーム等）の記載は禁止しています</li>
            <li>虚偽の事実・誹謗中傷・侮辱的な表現は禁止しています</li>
            <li>競合他社の関係者による不正投稿は禁止しています</li>
            <li>投稿内容に関する法的責任は投稿者本人が負います</li>
            <li>ガイドライン違反の投稿は運営が確認の上、削除する場合があります</li>
          </ul>
          <Link href="/guidelines" target="_blank" className="text-xs text-yellow-700 underline">
            投稿ガイドライン・免責事項の全文を読む →
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 総合評価 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              総合評価 <span className="text-red-500">*</span>
            </label>
            <StarRating
              value={ratings.rating_overall}
              size="lg"
              interactive
              onChange={(v) => setRatings((prev) => ({ ...prev, rating_overall: v }))}
            />
            <div className="text-xs text-gray-400 mt-1">
              {['', 'とても悪い', '悪い', '普通', '良い', 'とても良い'][ratings.rating_overall]}
            </div>
          </div>

          {/* 項目別評価 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              項目別評価 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {RATING_ITEMS.map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-800">{label}</div>
                    <div className="text-xs text-gray-400">{description}</div>
                  </div>
                  <StarRating
                    value={ratings[key]}
                    interactive
                    onChange={(v) => setRatings((prev) => ({ ...prev, [key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* タグ */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              当てはまるものを選んでください（任意）
            </label>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 利用サービス */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              利用したサービス（任意）
            </label>
            <select
              value={serviceUsed}
              onChange={(e) => setServiceUsed(e.target.value as ServiceUsed | '')}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              {(Object.keys(SERVICE_LABELS) as ServiceUsed[]).map((k) => (
                <option key={k} value={k}>{SERVICE_LABELS[k]}</option>
              ))}
            </select>
          </div>

          {/* コメント */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              コメント（任意・200字以内）
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={200}
              rows={4}
              placeholder="利用して感じたことを自由にご記入ください"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="text-xs text-gray-400 text-right">{comment.length}/200</div>
          </div>

          {/* 同意チェックボックス */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span className="text-sm text-gray-600">
              <Link href="/guidelines" target="_blank" className="text-blue-600 underline">
                投稿ガイドライン・免責事項
              </Link>
              を読み、内容に同意した上で投稿します。投稿内容に関する法的責任は投稿者本人が負うことを理解しています。
            </span>
          </label>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded px-3 py-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting || !agreed}
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '投稿中...' : '口コミを投稿する'}
          </button>
        </form>
      </div>
    </div>
  )
}
