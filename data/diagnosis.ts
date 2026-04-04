export interface Question {
  id: string
  text: string
  options: { value: string; label: string }[]
}

export interface BrokerScore {
  [brokerId: string]: number
}

export const QUESTIONS: Question[] = [
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
      { value: 'retirement', label: '老後の資金づくり' },
      { value: 'growth', label: '資産をしっかり増やしたい' },
      { value: 'education', label: '教育費・住宅購入など目的がある' },
      { value: 'income', label: '配当・インカムゲインが欲しい' },
    ],
  },
  {
    id: 'period',
    text: '投資はどのくらいの期間で考えていますか？',
    options: [
      { value: 'short', label: '3年以内の短期' },
      { value: 'medium', label: '3〜10年の中期' },
      { value: 'long', label: '10年以上の長期' },
      { value: 'very_long', label: '20年以上（老後まで）' },
    ],
  },
  {
    id: 'risk',
    text: '投資した金額が一時的に20%下落しても保有し続けられますか？',
    options: [
      { value: 'no', label: 'できない。損失はなるべく避けたい' },
      { value: 'maybe', label: 'できるだけ持ち続けるが不安になる' },
      { value: 'yes', label: 'はい。長期的には戻ると思える' },
      { value: 'absolutely', label: '全く問題ない。むしろ買い増したい' },
    ],
  },
  {
    id: 'amount',
    text: '月々投資に回せる金額はどのくらいですか？',
    options: [
      { value: 'micro', label: '1万円未満' },
      { value: 'small', label: '1〜3万円程度' },
      { value: 'medium', label: '3〜10万円程度' },
      { value: 'large', label: '10万円以上' },
    ],
  },
  {
    id: 'interest',
    text: '最も興味のある投資商品・制度はどれですか？',
    options: [
      { value: 'nisa', label: '新NISA（積立・成長投資枠）' },
      { value: 'ideco', label: 'iDeCo（個人型確定拠出年金）' },
      { value: 'us_stocks', label: '米国株・海外ETF' },
      { value: 'jp_stocks', label: '日本株・IPO' },
    ],
  },
]

export interface Broker {
  id: string
  name: string
  tagline: string
  strengths: string[]
  url: string
  badge?: string
  color: string
}

export const BROKERS: Broker[] = [
  {
    id: 'sbi',
    name: 'SBI証券',
    tagline: '国内最大級の口座数。投信・株・NISA何でも揃う万能派',
    strengths: ['投信ラインナップ国内最多水準', 'NISA対応◎', 'IPO取扱数業界トップ', '手数料無料化済み'],
    url: 'https://www.sbisec.co.jp/',
    badge: '総合No.1',
    color: 'blue',
  },
  {
    id: 'rakuten',
    name: '楽天証券',
    tagline: '楽天ポイントで投資できる。初心者に使いやすいUI',
    strengths: ['楽天ポイント投資', 'アプリが使いやすい', 'NISA積立に最適', '楽天銀行との連携でお得'],
    url: 'https://www.rakuten-sec.co.jp/',
    badge: '初心者向け',
    color: 'red',
  },
  {
    id: 'monex',
    name: 'マネックス証券',
    tagline: '米国株の品揃えと分析ツールが業界随一',
    strengths: ['米国株・ETF種類が豊富', '銘柄スカウター（分析ツール）', 'dポイント連携', '米国株手数料が低い'],
    url: 'https://www.monex.co.jp/',
    badge: '米国株に強い',
    color: 'green',
  },
  {
    id: 'matsui',
    name: '松井証券',
    tagline: '長期投資家向けのサービスと丁寧なサポートが強み',
    strengths: ['投信毎月ポイント還元', 'ロボアド「投信工房」無料', 'サポートが充実', '日本株デイトレ手数料特典'],
    url: 'https://www.matsui.co.jp/',
    color: 'orange',
  },
  {
    id: 'paypay',
    name: 'PayPay証券',
    tagline: '1000円から米国株・日本株に投資できる少額投資向け',
    strengths: ['1,000円から投資可能', 'PayPayポイント連携', 'スマホ完結でシンプル', '米国株・日本株のみに特化'],
    url: 'https://www.paypay-sec.co.jp/',
    badge: '少額OK',
    color: 'yellow',
  },
  {
    id: 'aukabu',
    name: 'auカブコム証券',
    tagline: 'auユーザーならポイント還元でお得。NISA・投信も充実',
    strengths: ['Pontaポイント還元', 'au銀行との金利優遇', 'NISA対応◎', 'IPO参加可能'],
    url: 'https://kabu.com/',
    color: 'purple',
  },
]

// 回答の組み合わせからスコアを算出する
export function calcScores(answers: Record<string, string>): Record<string, number> {
  const scores: Record<string, number> = {
    sbi: 0, rakuten: 0, monex: 0, matsui: 0, paypay: 0, aukabu: 0,
  }

  // 経験レベル
  if (answers.experience === 'none') {
    scores.rakuten += 3; scores.paypay += 3; scores.sbi += 1
  } else if (answers.experience === 'beginner') {
    scores.rakuten += 2; scores.sbi += 2; scores.matsui += 1; scores.aukabu += 1
  } else if (answers.experience === 'intermediate') {
    scores.sbi += 2; scores.monex += 2; scores.matsui += 2; scores.rakuten += 1
  } else if (answers.experience === 'advanced') {
    scores.sbi += 3; scores.monex += 3; scores.matsui += 2
  }

  // 投資目的
  if (answers.goal === 'retirement') {
    scores.sbi += 2; scores.rakuten += 2; scores.matsui += 2; scores.aukabu += 1
  } else if (answers.goal === 'growth') {
    scores.sbi += 2; scores.monex += 3; scores.matsui += 1
  } else if (answers.goal === 'education') {
    scores.rakuten += 2; scores.sbi += 2; scores.aukabu += 2
  } else if (answers.goal === 'income') {
    scores.monex += 2; scores.sbi += 2; scores.matsui += 2
  }

  // 投資期間
  if (answers.period === 'short') {
    scores.paypay += 2; scores.sbi += 1; scores.monex += 1
  } else if (answers.period === 'medium') {
    scores.sbi += 2; scores.rakuten += 2; scores.monex += 1
  } else if (answers.period === 'long') {
    scores.sbi += 2; scores.rakuten += 2; scores.matsui += 2
  } else if (answers.period === 'very_long') {
    scores.sbi += 3; scores.rakuten += 2; scores.matsui += 3; scores.aukabu += 1
  }

  // リスク許容度
  if (answers.risk === 'no') {
    scores.rakuten += 2; scores.matsui += 2; scores.paypay += 1
  } else if (answers.risk === 'maybe') {
    scores.rakuten += 2; scores.sbi += 1; scores.aukabu += 1
  } else if (answers.risk === 'yes') {
    scores.sbi += 2; scores.monex += 2; scores.matsui += 1
  } else if (answers.risk === 'absolutely') {
    scores.monex += 3; scores.sbi += 2; scores.matsui += 1
  }

  // 投資金額
  if (answers.amount === 'micro') {
    scores.paypay += 4; scores.rakuten += 2; scores.sbi += 1
  } else if (answers.amount === 'small') {
    scores.rakuten += 2; scores.sbi += 2; scores.aukabu += 1; scores.matsui += 1
  } else if (answers.amount === 'medium') {
    scores.sbi += 2; scores.monex += 2; scores.matsui += 2; scores.rakuten += 1
  } else if (answers.amount === 'large') {
    scores.sbi += 3; scores.monex += 3; scores.matsui += 2
  }

  // 興味のある商品
  if (answers.interest === 'nisa') {
    scores.sbi += 3; scores.rakuten += 3; scores.aukabu += 2; scores.matsui += 1
  } else if (answers.interest === 'ideco') {
    scores.sbi += 3; scores.rakuten += 2; scores.matsui += 2; scores.monex += 1
  } else if (answers.interest === 'us_stocks') {
    scores.monex += 4; scores.sbi += 2; scores.paypay += 1
  } else if (answers.interest === 'jp_stocks') {
    scores.sbi += 2; scores.matsui += 3; scores.monex += 2; scores.rakuten += 1
  }

  return scores
}

export function getRankedBrokers(answers: Record<string, string>): Broker[] {
  const scores = calcScores(answers)
  return [...BROKERS].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
}
