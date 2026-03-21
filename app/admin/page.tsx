'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Advisor, ADVISOR_TYPE_LABELS } from '@/types'

const ADMIN_EMAIL = 'y.sato10100423@gmail.com'

interface Report {
  id: string
  review_id: string
  reason: string
  created_at: string
  reviews: { comment: string | null; advisor_id: string } | null
}

export default function AdminPage() {
  const router = useRouter()
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)
  const [tab, setTab] = useState<'advisors' | 'reports'>('advisors')
  const [deletingId, setDeletingId] = useState<string | null>(null)

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
      Promise.all([
        supabase.from('advisors').select('*').order('created_at', { ascending: false }),
        supabase.from('reports').select('*, reviews(comment, advisor_id)').order('created_at', { ascending: false }),
      ]).then(([{ data: advisorData }, { data: reportData }]) => {
        setAdvisors(advisorData || [])
        setReports(reportData || [])
        setLoading(false)
      })
    })
  }, [router])

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('この口コミを削除しますか？この操作は取り消せません。')) return
    setDeletingId(reviewId)
    const supabase = createClient()
    await supabase.from('reviews').delete().eq('id', reviewId)
    setReports((prev) => prev.filter((r) => r.review_id !== reviewId))
    setDeletingId(null)
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  if (unauthorized) return (
    <div className="text-center py-12">
      <p className="text-red-500 font-medium">アクセス権限がありません</p>
      <Link href="/" className="text-blue-600 text-sm mt-2 inline-block hover:underline">トップへ戻る</Link>
    </div>
  )

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-5">管理画面</h1>

      {/* タブ */}
      <div className="flex gap-1 mb-5 border-b border-gray-200">
        <button
          onClick={() => setTab('advisors')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === 'advisors' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          アドバイザー
        </button>
        <button
          onClick={() => setTab('reports')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
            tab === 'reports' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          通報
          {reports.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              {reports.length}
            </span>
          )}
        </button>
      </div>

      {/* アドバイザー一覧 */}
      {tab === 'advisors' && (
        <>
          <div className="flex justify-end mb-3">
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
                      <Link href={`/admin/advisors/${advisor.id}/edit`} className="text-blue-600 hover:underline">
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
        </>
      )}

      {/* 通報一覧 */}
      {tab === 'reports' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">通報理由</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">口コミ内容</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">日時</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-red-600 font-medium">{report.reason}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                    {report.reviews?.comment || '（コメントなし）'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(report.created_at).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {report.reviews?.advisor_id && (
                        <Link
                          href={`/advisors/${report.reviews.advisor_id}`}
                          className="text-blue-600 hover:underline text-xs"
                          target="_blank"
                        >
                          口コミを見る
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeleteReview(report.review_id)}
                        disabled={deletingId === report.review_id}
                        className="text-red-500 hover:text-red-700 text-xs disabled:opacity-50"
                      >
                        {deletingId === report.review_id ? '削除中...' : '口コミを削除'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.length === 0 && (
            <div className="text-center py-8 text-gray-400">通報はありません</div>
          )}
        </div>
      )}
    </div>
  )
}
