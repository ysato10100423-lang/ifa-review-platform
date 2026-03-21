'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Advisor, AdvisorType, ADVISOR_TYPE_LABELS } from '@/types'

const PREFECTURES = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県',
]

interface AdvisorFormProps {
  initial?: Advisor
}

export default function AdvisorForm({ initial }: AdvisorFormProps) {
  const router = useRouter()
  const isEdit = !!initial

  const [form, setForm] = useState({
    name: initial?.name || '',
    type: initial?.type || 'ifa' as AdvisorType,
    description: initial?.description || '',
    prefecture: initial?.prefecture || '',
    address: initial?.address || '',
    website_url: initial?.website_url || '',
    specialties: initial?.specialties?.join('、') || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('社名を入力してください')
      return
    }

    setSubmitting(true)
    const supabase = createClient()

    const payload = {
      name: form.name.trim(),
      type: form.type,
      description: form.description.trim() || null,
      prefecture: form.prefecture || null,
      address: form.address.trim() || null,
      website_url: form.website_url.trim() || null,
      specialties: form.specialties
        ? form.specialties.split(/[、,，]/).map((s) => s.trim()).filter(Boolean)
        : null,
    }

    if (isEdit) {
      const { error: updateError } = await supabase
        .from('advisors')
        .update(payload)
        .eq('id', initial.id)
      if (updateError) {
        setError('更新に失敗しました: ' + updateError.message)
        setSubmitting(false)
        return
      }
    } else {
      const { error: insertError } = await supabase
        .from('advisors')
        .insert(payload)
      if (insertError) {
        setError('追加に失敗しました: ' + insertError.message)
        setSubmitting(false)
        return
      }
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          社名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          種別 <span className="text-red-500">*</span>
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {(Object.keys(ADVISOR_TYPE_LABELS) as AdvisorType[]).map((k) => (
            <option key={k} value={k}>{ADVISOR_TYPE_LABELS[k]}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">都道府県</label>
        <select
          name="prefecture"
          value={form.prefecture}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="例：東京都千代田区丸の内1-1-1"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">公式サイトURL</label>
        <input
          type="url"
          name="website_url"
          value={form.website_url}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          専門分野タグ
          <span className="text-gray-400 font-normal ml-1">（読点「、」または「,」区切り）</span>
        </label>
        <input
          type="text"
          name="specialties"
          value={form.specialties}
          onChange={handleChange}
          placeholder="例：NISA、資産形成、投資信託"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">説明文</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="会社の概要・特徴を入力してください"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded px-3 py-2">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? '保存中...' : isEdit ? '更新する' : '追加する'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded hover:bg-gray-50"
        >
          キャンセル
        </button>
      </div>
    </form>
  )
}
