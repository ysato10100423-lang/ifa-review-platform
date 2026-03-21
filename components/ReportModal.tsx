'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const REPORT_REASONS = [
  '個人名（担当者名）が含まれている',
  '誹謗中傷・侮辱的な表現がある',
  '事実と異なる内容が含まれている',
  '広告・スパムと思われる',
  'その他',
]

interface ReportModalProps {
  reviewId: string
  onClose: () => void
}

export default function ReportModal({ reviewId, onClose }: ReportModalProps) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason) {
      setError('通報理由を選択してください')
      return
    }

    setSubmitting(true)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) {
      setError('ログインが必要です')
      setSubmitting(false)
      return
    }

    const { error: insertError } = await supabase.from('reports').insert({
      review_id: reviewId,
      user_id: userData.user.id,
      reason,
    })

    if (insertError) {
      setError(
        insertError.message.includes('unique')
          ? 'この口コミはすでに通報済みです'
          : '送信に失敗しました。もう一度お試しください。'
      )
      setSubmitting(false)
      return
    }

    setDone(true)
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {done ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-3">✓</div>
            <p className="font-medium text-gray-900 mb-1">通報を受け付けました</p>
            <p className="text-sm text-gray-500 mb-4">内容を確認の上、運営が対応いたします。</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
            >
              閉じる
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-900 mb-1">口コミを通報する</h2>
            <p className="text-sm text-gray-500 mb-4">
              投稿ガイドラインに違反していると思われる理由を選択してください。
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              {REPORT_REASONS.map((r) => (
                <label key={r} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}

              {error && (
                <div className="bg-red-50 text-red-600 text-sm rounded px-3 py-2">{error}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-500 text-white px-5 py-2 rounded text-sm font-medium hover:bg-red-600 disabled:opacity-50"
                >
                  {submitting ? '送信中...' : '通報する'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-gray-300 text-gray-600 px-5 py-2 rounded text-sm hover:bg-gray-50"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
