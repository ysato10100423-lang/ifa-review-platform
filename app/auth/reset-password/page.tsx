'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    })

    if (resetError) {
      setError('送信に失敗しました。メールアドレスを確認してください。')
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto mt-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">✉️</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">メールを送信しました</h2>
          <p className="text-sm text-gray-600 mb-4">
            {email} にパスワード再設定用のリンクを送りました。<br />
            メール内のリンクをクリックして新しいパスワードを設定してください。
          </p>
          <Link href="/auth/login" className="text-blue-600 text-sm hover:underline">
            ログインページへ戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto mt-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">パスワードをお忘れの方</h1>
        <p className="text-sm text-gray-500 mb-5">
          登録済みのメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded px-3 py-2">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '送信中...' : '再設定メールを送る'}
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            ログインページへ戻る
          </Link>
        </p>
      </div>
    </div>
  )
}
