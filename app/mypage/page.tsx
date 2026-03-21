'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { SERVICE_LABELS, ServiceUsed } from '@/types'
import StarRating from '@/components/StarRating'

interface MyReview {
  id: string
  advisor_id: string
  rating_overall: number
  comment: string | null
  service_used: ServiceUsed | null
  created_at: string
  advisors: { name: string } | null
}

export default function MyPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [editingNickname, setEditingNickname] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [savingNickname, setSavingNickname] = useState(false)
  const [reviews, setReviews] = useState<MyReview[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      setEmail(data.user.email || '')

      const [{ data: profileData }, { data: reviewData }] = await Promise.all([
        supabase.from('profiles').select('nickname').eq('id', data.user.id).single(),
        supabase.from('reviews').select('*, advisors(name)').eq('user_id', data.user.id).order('created_at', { ascending: false }),
      ])

      setNickname(profileData?.nickname || '')
      setEditingNickname(profileData?.nickname || '')
      setReviews(reviewData || [])
      setLoading(false)
    })
  }, [router])

  const handleSaveNickname = async () => {
    setSavingNickname(true)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from('profiles').upsert({
      id: userData.user.id,
      nickname: editingNickname.trim() || null,
    })

    setNickname(editingNickname.trim())
    setIsEditing(false)
    setSavingNickname(false)
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('この口コミを削除しますか？')) return
    setDeletingId(reviewId)
    const supabase = createClient()
    await supabase.from('reviews').delete().eq('id', reviewId)
    setReviews((prev) => prev.filter((r) => r.id !== reviewId))
    setDeletingId(null)
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-5">マイページ</h1>

      {/* アカウント情報 */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">アカウント情報</h2>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">メールアドレス</p>
            <p className="text-sm text-gray-900">{email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">ニックネーム</p>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editingNickname}
                  onChange={(e) => setEditingNickname(e.target.value)}
                  placeholder="匿名ユーザー"
                  maxLength={20}
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <button
                  onClick={handleSaveNickname}
                  disabled={savingNickname}
                  className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingNickname ? '保存中...' : '保存'}
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditingNickname(nickname) }}
                  className="text-sm text-gray-500 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
                >
                  キャンセル
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-900">{nickname || '未設定（匿名ユーザー）'}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  変更
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 投稿した口コミ */}
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        投稿した口コミ（{reviews.length}件）
      </h2>

      {reviews.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-400">
          <p className="mb-3">まだ口コミを投稿していません</p>
          <Link href="/" className="text-blue-600 text-sm hover:underline">
            アドバイザーを探す
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <Link
                    href={`/advisors/${review.advisor_id}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {review.advisors?.name || '削除済みのアドバイザー'}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(review.created_at).toLocaleDateString('ja-JP')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-gray-900">{review.rating_overall}</span>
                    <StarRating value={review.rating_overall} size="sm" />
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={deletingId === review.id}
                    className="text-xs text-red-400 hover:text-red-600 disabled:opacity-50"
                  >
                    {deletingId === review.id ? '削除中...' : '削除'}
                  </button>
                </div>
              </div>
              {review.service_used && (
                <p className="text-xs text-gray-500 mb-1">
                  利用サービス: <span className="font-medium">{SERVICE_LABELS[review.service_used]}</span>
                </p>
              )}
              {review.comment && (
                <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
