import Link from 'next/link'
import AdvisorForm from '@/components/AdvisorForm'

export default function NewAdvisorPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← 管理画面に戻る
      </Link>
      <h1 className="text-xl font-bold text-gray-900 mb-5">アドバイザーを追加</h1>
      <AdvisorForm />
    </div>
  )
}
