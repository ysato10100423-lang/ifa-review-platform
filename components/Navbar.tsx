'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-700">
          IFAレビュー
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.email === 'y.sato10100423@gmail.com' && (
                <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                  管理画面
                </Link>
              )}
              <Link href="/mypage" className="text-sm text-gray-600 hover:text-gray-900">
                マイページ
              </Link>
              <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                ログイン
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                新規登録
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
