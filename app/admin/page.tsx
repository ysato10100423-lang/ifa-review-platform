'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Advisor, ADVISOR_TYPE_LABELS } from '@/types'

const ADMIN_EMAIL = 'y.sato10100423@gmail.com'

export default function AdminPage() {
  const router = useRouter()
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      if (data.user.email !== ADMIN_EMAIL) {
        setUnauthorized(true)
        setLoading(false)
        return
      }
      supabase.from('advisors').select('*').order('created_at', { ascending: false }).then(({ data: advisorData }) => {
        setAdvisors(advisorData || [])
        setLoading(false)
      })
    })
  }, [router])

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  if (unauthorized) return (
    <div className="text-center py-12">
      <p className="text-red-500 font-medium">アクセス権限がありません</p>
      <Link href="/" className="text-blue-600 text-sm mt-2 inline-block hover:underline">トップへ戻る</Link>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">アドバイザー管理</h1>
        <Link
          href="/admin/advisors/new"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          + 新規追加
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">社名</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">種別</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">都道府県</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">評価</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">口コミ</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {advisors.map((advisor) => (
              <tr key={advisor.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{advisor.name}</td>
                <td className="px-4 py-3 text-gray-600">{ADVISOR_TYPE_LABELS[advisor.type]}</td>
                <td className="px-4 py-3 text-gray-600">{advisor.prefecture || '-'}</td>
                <td className="px-4 py-3 text-gray-600">{advisor.avg_rating > 0 ? advisor.avg_rating.toFixed(1) : '-'}</td>
                <td className="px-4 py-3 text-gray-600">{advisor.review_count}件</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/advisors/${advisor.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {advisors.length === 0 && (
          <div className="text-center py-8 text-gray-400">アドバイザーがいません</div>
        )}
      </div>
    </div>
  )
}
