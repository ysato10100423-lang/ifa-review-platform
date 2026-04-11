'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { INSURANCE_QUESTIONS } from '@/data/diagnosis-insurance'
import DiagnosisLayout from '@/components/DiagnosisLayout'

export default function InsuranceDiagnosisPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = INSURANCE_QUESTIONS[step]
  const isLast = step === INSURANCE_QUESTIONS.length - 1

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (isLast) {
      const params = new URLSearchParams(newAnswers)
      router.push(`/diagnosis/insurance/result?${params.toString()}`)
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <DiagnosisLayout
      title="保険診断"
      subtitle={`${INSURANCE_QUESTIONS.length}つの質問に答えるだけで、あなたに合った保険がわかります`}
      totalSteps={INSURANCE_QUESTIONS.length}
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
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </DiagnosisLayout>
  )
}
