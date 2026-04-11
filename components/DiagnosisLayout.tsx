interface Props {
  title: string
  subtitle: string
  totalSteps: number
  currentStep: number
  children: React.ReactNode
  onBack?: () => void
}

export default function DiagnosisLayout({
  title,
  subtitle,
  totalSteps,
  currentStep,
  children,
  onBack,
}: Props) {
  const progress = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>質問 {currentStep + 1} / {totalSteps}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {children}

      {onBack && (
        <button
          onClick={onBack}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600"
        >
          ← 前の質問に戻る
        </button>
      )}
    </div>
  )
}
