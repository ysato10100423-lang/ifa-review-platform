export interface PortfolioQuestion {
  id: string
  text: string
  options: { value: string; label: string; score: number }[]
}

export const PORTFOLIO_QUESTIONS: PortfolioQuestion[] = [
  {
    id: 'age',
    text: '現在の年齢を教えてください',
    options: [
      { value: '20s', label: '20代', score: 5 },
      { value: '30s', label: '30代', score: 4 },
      { value: '40s', label: '40代', score: 3 },
      { value: '50s', label: '50代以上', score: 1 },
    ],
  },
  {
    id: 'period',
    text: '投資を続けたい期間はどのくらいですか？',
    options: [
      { value: 'short', label: '3年以内', score: 1 },
      { value: 'medium', label: '5〜10年', score: 2 },
      { value: 'long', label: '10〜20年', score: 4 },
      { value: 'very_long', label: '20年以上', score: 5 },
    ],
  },
  {
    id: 'drop',
    text: '投資した資産が30%下落したらどうしますか？',
    options: [
      { value: 'sell', label: 'すぐに売って損失を確定させる', score: 1 },
      { value: 'hold', label: '不安だが保有し続ける', score: 2 },
      { value: 'wait', label: '回復を信じて保有する', score: 4 },
      { value: 'buy', label: 'むしろ買い増す機会と考える', score: 5 },
    ],
  },
  {
    id: 'goal',
    text: '投資の主な目的は何ですか？',
    options: [
      { value: 'preserve', label: '資産を守りたい（元本重視）', score: 1 },
      { value: 'stable', label: '少しずつ安定して増やしたい', score: 2 },
      { value: 'grow', label: 'リスクをとってしっかり増やしたい', score: 4 },
      { value: 'aggressive', label: '積極的に増やしたい（リスク許容）', score: 5 },
    ],
  },
  {
    id: 'reserve',
    text: '生活費の緊急予備金（すぐ使えるお金）はありますか？',
    options: [
      { value: 'none', label: 'ほとんどない', score: 1 },
      { value: 'three', label: '3ヶ月分程度ある', score: 2 },
      { value: 'six', label: '6ヶ月分以上ある', score: 4 },
      { value: 'plenty', label: '1年分以上ある', score: 5 },
    ],
  },
]

export interface Portfolio {
  type: string
  label: string
  description: string
  allocation: {
    domestic_stock: number
    global_stock: number
    domestic_bond: number
    global_bond: number
    reit: number
    commodity: number
    cash: number
  }
  color: string
  scoreRange: [number, number]
}

export const PORTFOLIOS: Portfolio[] = [
  {
    type: 'very_conservative',
    label: '超安定型',
    description: '元本の保全を最優先。リスクを極力避け、安定した資産を守ることを重視します。',
    allocation: {
      domestic_stock: 5,
      global_stock: 5,
      domestic_bond: 30,
      global_bond: 20,
      reit: 5,
      commodity: 5,
      cash: 30,
    },
    color: 'blue',
    scoreRange: [5, 10],
  },
  {
    type: 'conservative',
    label: '安定型',
    description: '安定性を重視しながら、少しずつ資産を増やすことを目指します。',
    allocation: {
      domestic_stock: 10,
      global_stock: 15,
      domestic_bond: 25,
      global_bond: 20,
      reit: 10,
      commodity: 5,
      cash: 15,
    },
    color: 'teal',
    scoreRange: [11, 14],
  },
  {
    type: 'balanced',
    label: 'バランス型',
    description: 'リスクとリターンのバランスを取りながら、中長期的な資産形成を目指します。',
    allocation: {
      domestic_stock: 15,
      global_stock: 30,
      domestic_bond: 15,
      global_bond: 15,
      reit: 10,
      commodity: 5,
      cash: 10,
    },
    color: 'green',
    scoreRange: [15, 18],
  },
  {
    type: 'growth',
    label: '成長型',
    description: 'ある程度のリスクを許容し、長期的な資産成長を積極的に狙います。',
    allocation: {
      domestic_stock: 20,
      global_stock: 40,
      domestic_bond: 5,
      global_bond: 15,
      reit: 10,
      commodity: 5,
      cash: 5,
    },
    color: 'orange',
    scoreRange: [19, 22],
  },
  {
    type: 'aggressive',
    label: '積極成長型',
    description: '高いリスクを許容し、長期的な高いリターンを目指します。',
    allocation: {
      domestic_stock: 20,
      global_stock: 45,
      domestic_bond: 5,
      global_bond: 10,
      reit: 10,
      commodity: 5,
      cash: 5,
    },
    color: 'red',
    scoreRange: [23, 25],
  },
]

export function getPortfolio(answers: Record<string, string>): Portfolio {
  const total = PORTFOLIO_QUESTIONS.reduce((sum, q) => {
    const selected = q.options.find((o) => o.value === answers[q.id])
    return sum + (selected?.score ?? 1)
  }, 0)

  return (
    PORTFOLIOS.find((p) => total >= p.scoreRange[0] && total <= p.scoreRange[1]) ??
    PORTFOLIOS[2]
  )
}
