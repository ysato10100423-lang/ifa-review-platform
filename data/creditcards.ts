export type CreditCard = {
  id: string
  name: string
  provider: string
  broker_id: string    // 対応する証券会社ID（brokers.tsと対応）
  point_rate: number   // つみたて投資のポイント還元率（%）
  annual_fee: number   // 年会費（0=無料）
  affiliate_url: string // TODO: A8承認後にトラッキングURLを差し替え
  features: string[]
  points_program: string // ポイントの種類
}

export const CREDIT_CARDS: CreditCard[] = [
  {
    id: 'smbc-nl',
    name: '三井住友カード（NL）',
    provider: '三井住友カード',
    broker_id: 'sbi',
    point_rate: 0.5,
    annual_fee: 0,
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['年会費永年無料', 'SBI証券つみたて対応', 'Vポイント還元', '最短即日発行'],
    points_program: 'Vポイント',
  },
  {
    id: 'smbc-olive',
    name: '三井住友カード Oliveフレキシブルペイ',
    provider: '三井住友カード',
    broker_id: 'sbi',
    point_rate: 0.5,
    annual_fee: 0,
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['年会費永年無料', 'SBI証券つみたて対応', '三井住友銀行と一体化', '家族ポイント優遇'],
    points_program: 'Vポイント',
  },
  {
    id: 'rakuten-card',
    name: '楽天カード',
    provider: '楽天カード',
    broker_id: 'rakuten',
    point_rate: 0.5,
    annual_fee: 0,
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['年会費永年無料', '楽天証券つみたて対応', '楽天ポイント還元', '楽天経済圏で更にお得'],
    points_program: '楽天ポイント',
  },
  {
    id: 'monex-card',
    name: 'マネックスカード',
    provider: 'マネックス証券',
    broker_id: 'monex',
    point_rate: 1.1,
    annual_fee: 0,
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['つみたて還元率1.1%（業界最高水準）', '年会費無料', 'マネックスポイント還元', 'マネックス証券専用'],
    points_program: 'マネックスポイント',
  },
  {
    id: 'au-pay-card',
    name: 'au PAYカード',
    provider: 'auフィナンシャルサービス',
    broker_id: 'aukabu',
    point_rate: 1.0,
    annual_fee: 0,
    affiliate_url: '', // TODO: A8承認後に差し替え
    features: ['つみたて還元率1.0%', '年会費無料', 'Pontaポイント還元', 'auユーザー優遇'],
    points_program: 'Pontaポイント',
  },
]

export function getCardByBroker(brokerId: string): CreditCard | undefined {
  return CREDIT_CARDS.find(c => c.broker_id === brokerId)
}
