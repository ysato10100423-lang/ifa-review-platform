'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Advisor } from '@/types'
import AdvisorForm from '@/components/AdvisorForm'

export default function EditAdvisorPage() {
  const { id } = useParams<{ id: string }>()
  const [advisor, setAdvisor] = useState<Advisor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('advisors').select('*').eq('id', id).single().then(({ data }) => {
      setAdvisor(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>
  if (!advisor) return <div className="text-center py-12 text-gray-400">見つかりません</div>

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← 管理画面に戻る
      </Link>
      <h1 className="text-xl font-bold text-gray-900 mb-5">アドバイザーを編集</h1>
      <AdvisorForm initial={advisor} />
    </div>
  )
}
