'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FUND_QUESTIONS } from '@/data/diagnosis-funds'
import DiagnosisLayout from '@/components/DiagnosisLayout'

export default function FundsDiagnosisPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = FUND_QUESTIONS[step]
  const isLast = step === FUND_QUESTIONS.length - 1

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (isLast) {
      const params = new URLSearchParams(newAnswers)
      router.push(`/diagnosis/funds/result?${params.toString()}`)
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <DiagnosisLayout
      title="投資信託診断"
      subtitle={`${FUND_QUESTIONS.length}つの質問に答えるだけで、あなたに合った投資信託がわかります`}
      totalSteps={FUND_QUESTIONS.length}
      currentStep={step}
      onBack={step > 0 ? () => setStep(s => s - 1) : undefined}
    >
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-base font-semibold text-gray-900 mb-5">{question.text}</p>
        <div className="space-y-2.5">
          {question.options.map(opt => (
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
    </DiagnosisLayout>
  )
}
