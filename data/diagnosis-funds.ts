import { Fund, FUNDS } from './funds'

export interface FundQuestion {
  id: string
  text: string
  options: { value: string; label: string }[]
}

export const FUND_QUESTIONS: FundQuestion[] = [
  {
    id: 'experience',
    text: '投資の経験はどのくらいですか？',
    options: [
      { value: 'none', label: 'まったくない（これから始めたい）' },
      { value: 'beginner', label: '少しある（NISAや積立投信程度）' },
      { value: 'intermediate', label: 'ある程度ある（株・ETFなど）' },
      { value: 'advanced', label: '豊富にある（幅広く取引経験あり）' },
    ],
  },
  {
    id: 'goal',
    text: '投資の主な目的は何ですか？',
    options: [
      { value: 'retirement', label: '老後の資金づくり（20年以上）' },
      { value: 'midterm', label: '10年程度の資産形成' },
      { value: 'education', label: '教育費・住宅購入など目標がある' },
      { value: 'income', label: '分配金・インカムゲインが欲しい' },
    ],
  },
  {
    id: 'risk',
    text: '投資した金額が一時的に30%下落しても保有し続けられますか？',
    options: [
      { value: 'no', label: 'できない。元本割れは避けたい' },
      { value: 'uneasy', label: '不安だが保有し続けられると思う' },
      { value: 'yes', label: 'はい。長期では回復すると考える' },
      { value: 'buy_more', label: '全く問題ない。むしろ買い増す' },
    ],
  },
  {
    id: 'amount',
    text: '月々の積立金額はどのくらいを想定していますか？',
    options: [
      { value: 'micro', label: '〜5,000円程度' },
      { value: 'small', label: '5,000〜30,000円程度' },
      { value: 'medium', label: '30,000〜100,000円程度' },
      { value: 'large', label: '100,000円以上' },
    ],
  },
  {
    id: 'preference',
    text: '投資信託に対してどのような志向をお持ちですか？',
    options: [
      { value: 'low_cost', label: 'とにかくコストを低く抑えたい' },
      { value: 'global', label: '世界全体に広く分散したい' },
      { value: 'us_focus', label: '米国市場の成長に乗りたい' },
      { value: 'balanced', label: 'リスクを分散してバランスよく' },
      { value: 'commodity', label: '金・コモディティでインフレ対策をしたい' },
    ],
  },
]

export function calcFundScores(answers: Record<string, string>): Record<string, number> {
  const scores: Record<string, number> = {}
  FUNDS.forEach(f => { scores[f.id] = 0 })

  // 経験レベル
  if (answers.experience === 'none') {
    scores['emaxis-slim-all-country'] += 3
    scores['emaxis-slim-balanced'] += 4
    scores['rakuten-all-country'] += 3
    scores['emaxis-slim-sp500'] += 2
  } else if (answers.experience === 'beginner') {
    scores['emaxis-slim-all-country'] += 4
    scores['emaxis-slim-sp500'] += 3
    scores['sbi-v-sp500'] += 3
    scores['emaxis-slim-balanced'] += 2
  } else if (answers.experience === 'intermediate') {
    scores['emaxis-slim-sp500'] += 3
    scores['sbi-v-sp500'] += 3
    scores['emaxis-slim-all-country'] += 3
    scores['emaxis-slim-developed'] += 2
    scores['emaxis-slim-emerging'] += 2
  } else if (answers.experience === 'advanced') {
    scores['fidelity-global-stock'] += 4
    scores['emaxis-slim-emerging'] += 3
    scores['sbi-v-total-us'] += 3
    scores['maxis-j-reit'] += 2
  }

  // 投資目的
  if (answers.goal === 'retirement') {
    scores['emaxis-slim-all-country'] += 4
    scores['emaxis-slim-sp500'] += 3
    scores['sbi-v-sp500'] += 3
    scores['emaxis-slim-balanced'] += 2
  } else if (answers.goal === 'midterm') {
    scores['emaxis-slim-sp500'] += 3
    scores['emaxis-slim-all-country'] += 3
    scores['emaxis-slim-balanced'] += 2
    scores['emaxis-slim-developed'] += 2
  } else if (answers.goal === 'education') {
    scores['emaxis-slim-balanced'] += 4
    scores['emaxis-slim-bond'] += 3
    scores['emaxis-slim-all-country'] += 2
    scores['seimei-futekigo'] += 2
  } else if (answers.goal === 'income') {
    scores['maxis-j-reit'] += 4
    scores['seimei-futekigo'] += 3
    scores['emaxis-slim-balanced'] += 2
  }

  // リスク許容度
  if (answers.risk === 'no') {
    scores['emaxis-slim-bond'] += 5
    scores['emaxis-slim-balanced'] += 4
    scores['seimei-futekigo'] += 3
    scores['emaxis-slim-domestic'] += 1
  } else if (answers.risk === 'uneasy') {
    scores['emaxis-slim-balanced'] += 4
    scores['emaxis-slim-all-country'] += 3
    scores['seimei-futekigo'] += 2
    scores['emaxis-slim-developed'] += 2
  } else if (answers.risk === 'yes') {
    scores['emaxis-slim-all-country'] += 3
    scores['emaxis-slim-sp500'] += 3
    scores['sbi-v-sp500'] += 3
    scores['emaxis-slim-developed'] += 2
  } else if (answers.risk === 'buy_more') {
    scores['emaxis-slim-emerging'] += 4
    scores['sbi-v-total-us'] += 4
    scores['fidelity-global-stock'] += 3
    scores['emaxis-slim-sp500'] += 2
  }

  // 積立金額
  if (answers.amount === 'micro') {
    scores['emaxis-slim-all-country'] += 3
    scores['rakuten-all-country'] += 3
    scores['emaxis-slim-sp500'] += 3
  } else if (answers.amount === 'small') {
    scores['emaxis-slim-all-country'] += 3
    scores['emaxis-slim-sp500'] += 3
    scores['sbi-v-sp500'] += 3
    scores['rakuten-sp500'] += 2
  } else if (answers.amount === 'medium') {
    scores['emaxis-slim-all-country'] += 3
    scores['emaxis-slim-sp500'] += 3
    scores['emaxis-slim-balanced'] += 2
    scores['emaxis-slim-emerging'] += 2
  } else if (answers.amount === 'large') {
    scores['fidelity-global-stock'] += 3
    scores['emaxis-slim-emerging'] += 3
    scores['sbi-v-total-us'] += 3
    scores['emaxis-slim-all-country'] += 2
  }

  // 投資志向
  if (answers.preference === 'low_cost') {
    scores['emaxis-slim-all-country'] += 5
    scores['rakuten-all-country'] += 4
    scores['emaxis-slim-sp500'] += 3
    scores['sbi-v-sp500'] += 3
  } else if (answers.preference === 'global') {
    scores['emaxis-slim-all-country'] += 5
    scores['rakuten-all-country'] += 4
    scores['emaxis-slim-developed'] += 3
    scores['emaxis-slim-balanced'] += 2
  } else if (answers.preference === 'us_focus') {
    scores['emaxis-slim-sp500'] += 5
    scores['sbi-v-sp500'] += 5
    scores['rakuten-sp500'] += 4
    scores['sbi-v-total-us'] += 4
  } else if (answers.preference === 'balanced') {
    scores['emaxis-slim-balanced'] += 5
    scores['seimei-futekigo'] += 4
    scores['emaxis-slim-bond'] += 2
    scores['maxis-j-reit'] += 2
  } else if (answers.preference === 'commodity') {
    scores['sbi-ishares-gold'] += 6
    scores['mitsubishi-pure-gold'] += 5
    scores['emaxis-plus-commodity'] += 5
    scores['emaxis-slim-balanced'] += 1
  }

  return scores
}

export function getRankedFunds(answers: Record<string, string>): Fund[] {
  const scores = calcFundScores(answers)
  return [...FUNDS].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
}
