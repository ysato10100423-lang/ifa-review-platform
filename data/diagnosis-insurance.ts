import { Insurance, INSURANCES } from './insurance'

export interface InsuranceQuestion {
  id: string
  text: string
  options: { value: string; label: string }[]
}

export const INSURANCE_QUESTIONS: InsuranceQuestion[] = [
  {
    id: 'age',
    text: '現在のご年齢は？',
    options: [
      { value: '20s', label: '20代' },
      { value: '30s', label: '30代' },
      { value: '40s', label: '40代' },
      { value: '50plus', label: '50代以上' },
    ],
  },
  {
    id: 'family',
    text: '家族構成を教えてください',
    options: [
      { value: 'single', label: '独身（扶養家族なし）' },
      { value: 'couple', label: '夫婦（子どもなし）' },
      { value: 'family_young', label: '子どもあり（小学生以下）' },
      { value: 'family_grown', label: '子どもあり（中学生以上）' },
    ],
  },
  {
    id: 'concern',
    text: '最も心配なリスクは何ですか？',
    options: [
      { value: 'death', label: '自分の死亡（遺族への生活費）' },
      { value: 'illness', label: '病気・怪我による入院・手術' },
      { value: 'cancer', label: 'がんの診断・治療費' },
      { value: 'disability', label: '長期の就業不能・働けなくなる' },
    ],
  },
  {
    id: 'budget',
    text: '保険料の月額予算はどのくらいですか？',
    options: [
      { value: 'low', label: '〜3,000円程度' },
      { value: 'medium', label: '3,000〜8,000円程度' },
      { value: 'high', label: '8,000〜15,000円程度' },
      { value: 'flexible', label: '保障内容に応じて柔軟に考える' },
    ],
  },
  {
    id: 'priority',
    text: '保険に最も求めることは何ですか？',
    options: [
      { value: 'cost', label: '保険料の安さ・コスパ重視' },
      { value: 'coverage', label: '手厚い保障を重視' },
      { value: 'simplicity', label: 'シンプルでわかりやすい商品' },
      { value: 'support', label: '担当者のサポートや相談体制' },
    ],
  },
]

export function calcInsuranceScores(answers: Record<string, string>): Record<string, number> {
  const scores: Record<string, number> = {}
  INSURANCES.forEach(i => { scores[i.id] = 0 })

  // 年齢
  if (answers.age === '20s') {
    scores['lifenet-term'] += 3
    scores['lifenet-medical'] += 3
    scores['lifenet-cancer'] += 2
    scores['neolive-medical'] += 2
    scores['rakuten-life'] += 2
  } else if (answers.age === '30s') {
    scores['lifenet-term'] += 4
    scores['zurich-term'] += 3
    scores['zurich-income'] += 3
    scores['lifenet-medical'] += 3
    scores['lifenet-cancer'] += 2
  } else if (answers.age === '40s') {
    scores['zurich-term'] += 4
    scores['orix-medical'] += 4
    scores['aflac-cancer'] += 4
    scores['zurich-income'] += 3
    scores['sony-medical'] += 3
  } else if (answers.age === '50plus') {
    scores['aflac-cancer'] += 5
    scores['orix-medical'] += 4
    scores['sony-medical'] += 4
    scores['emaxis-slim-bond'] += 0 // ignore non-insurance
  }

  // 家族構成
  if (answers.family === 'single') {
    scores['lifenet-medical'] += 3
    scores['lifenet-cancer'] += 3
    scores['neolive-medical'] += 3
    scores['macnica-accident'] += 2
  } else if (answers.family === 'couple') {
    scores['lifenet-term'] += 3
    scores['zurich-income'] += 3
    scores['lifenet-medical'] += 2
    scores['macnica-income'] += 2
  } else if (answers.family === 'family_young') {
    scores['lifenet-term'] += 5
    scores['zurich-income'] += 5
    scores['macnica-income'] += 4
    scores['zurich-term'] += 3
  } else if (answers.family === 'family_grown') {
    scores['zurich-term'] += 4
    scores['lifenet-term'] += 3
    scores['zurich-income'] += 3
    scores['orix-medical'] += 2
  }

  // 心配なリスク
  if (answers.concern === 'death') {
    scores['lifenet-term'] += 5
    scores['zurich-term'] += 4
    scores['rakuten-life'] += 3
    scores['zurich-income'] += 3
  } else if (answers.concern === 'illness') {
    scores['lifenet-medical'] += 5
    scores['orix-medical'] += 5
    scores['sony-medical'] += 4
    scores['neolive-medical'] += 4
  } else if (answers.concern === 'cancer') {
    scores['lifenet-cancer'] += 6
    scores['aflac-cancer'] += 6
    scores['orix-medical'] += 2
  } else if (answers.concern === 'disability') {
    scores['zurich-income'] += 6
    scores['macnica-income'] += 6
    scores['sony-medical'] += 2
  }

  // 予算
  if (answers.budget === 'low') {
    scores['lifenet-term'] += 3
    scores['neolive-medical'] += 3
    scores['macnica-accident'] += 4
    scores['lifenet-cancer'] += 2
  } else if (answers.budget === 'medium') {
    scores['lifenet-term'] += 3
    scores['lifenet-medical'] += 3
    scores['lifenet-cancer'] += 3
    scores['rakuten-life'] += 2
  } else if (answers.budget === 'high') {
    scores['sony-medical'] += 3
    scores['aflac-cancer'] += 3
    scores['orix-medical'] += 3
    scores['zurich-income'] += 3
  } else if (answers.budget === 'flexible') {
    scores['sony-medical'] += 4
    scores['aflac-cancer'] += 3
    scores['orix-medical'] += 3
    scores['zurich-income'] += 3
  }

  // 優先事項
  if (answers.priority === 'cost') {
    scores['lifenet-term'] += 4
    scores['neolive-medical'] += 4
    scores['lifenet-cancer'] += 3
    scores['rakuten-life'] += 3
  } else if (answers.priority === 'coverage') {
    scores['sony-medical'] += 4
    scores['aflac-cancer'] += 4
    scores['orix-medical'] += 3
    scores['zurich-income'] += 3
  } else if (answers.priority === 'simplicity') {
    scores['lifenet-medical'] += 4
    scores['lifenet-cancer'] += 4
    scores['lifenet-term'] += 3
    scores['neolive-medical'] += 3
  } else if (answers.priority === 'support') {
    scores['sony-medical'] += 5
    scores['aflac-cancer'] += 3
    scores['orix-medical'] += 2
  }

  return scores
}

export function getRankedInsurances(answers: Record<string, string>): Insurance[] {
  const scores = calcInsuranceScores(answers)
  return [...INSURANCES].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
}
