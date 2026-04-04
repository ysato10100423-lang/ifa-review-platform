'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/data/diagnosis'

export default function DiagnosisPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1
  const progress = Math.round(((step) / QUESTIONS.length) * 100)

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (isLast) {
      const params = new URLSearchParams(newAnswers)
      router.push(`/diagnosis/result?${params.toString()}`)
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">あなたに合った証券会社診断</h1>
        <p className="text-sm text-gray-500 mt-1">{QUESTIONS.length}つの質問に答えるだけで、おすすめの証券会社がわかります</p>
      </div>

      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>質問 {step + 1} / {QUESTIONS.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問カード */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-base font-semibold text-gray-900 mb-5">{question.text}</p>
        <div className="space-y-2.5">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 戻るボタン */}
      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600"
        >
          ← 前の質問に戻る
        </button>
      )}
    </div>
  )
}
