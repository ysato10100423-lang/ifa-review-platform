export type Broker = {
  id: string
  name: string
  tagline: string
  affiliate_url: string // TODO: A8承認後にトラッキングURLを差し替え
  features: string[]
  point_rate: number   // つみたて投資のポイント還元率（%）
  card_id: string      // 相性の良いクレカID（creditcards.tsと対応）
}

export const BROKERS: Broker[] = [
  {
    id: 'sbi',
    name: 'SBI証券',
    tagline: '投信ラインナップ国内最多水準。NISA・つみたて投資の定番',
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['投信ラインナップ最多水準', 'NISA対応◎', 'クレカ積立でポイント還元', 'IPO取扱数業界トップ'],
    point_rate: 0.5,
    card_id: 'smbc-nl',
  },
  {
    id: 'rakuten',
    name: '楽天証券',
    tagline: '楽天カードで積立するとポイント還元。楽天経済圏との相性抜群',
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['楽天カードでポイント還元', 'アプリが使いやすい', 'NISA積立に最適', '楽天銀行連携でお得'],
    point_rate: 0.5,
    card_id: 'rakuten-card',
  },
  {
    id: 'monex',
    name: 'マネックス証券',
    tagline: 'マネックスカードのクレカ積立ポイント還元率が業界最高水準',
    affiliate_url: 'https://h.accesstrade.net/sp/cc?rk=0100p8ju00oqh7',
    features: ['クレカ積立還元率1.1%', '米国株・ETFが充実', '銘柄スカウター無料', 'dポイント連携'],
    point_rate: 1.1,
    card_id: 'monex-card',
  },
  {
    id: 'aukabu',
    name: 'auカブコム証券',
    tagline: 'au PAYカードで積立するとPontaポイントが貯まる',
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['Pontaポイント還元1.0%', 'au銀行との金利優遇', 'NISA対応◎', 'auユーザーにお得'],
    point_rate: 1.0,
    card_id: 'au-pay-card',
  },
]
