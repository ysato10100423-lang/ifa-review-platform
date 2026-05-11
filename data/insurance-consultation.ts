export type InsuranceConsultation = {
  id: string
  name: string
  provider: string
  affiliate_url: string
  tracking_pixel?: string
  reward: string
  features: string[]
  description: string
  campaign?: {
    affiliate_url: string
    tracking_pixel?: string
    end_date: string // YYYY-MM-DD、この日の23:59まで使用
  }
}

function resolveConsultation(c: InsuranceConsultation): InsuranceConsultation {
  if (c.campaign && new Date() <= new Date(c.campaign.end_date + 'T23:59:59+09:00')) {
    return { ...c, affiliate_url: c.campaign.affiliate_url, tracking_pixel: c.campaign.tracking_pixel }
  }
  return c
}

export function getInsuranceConsultations(): InsuranceConsultation[] {
  return INSURANCE_CONSULTATIONS.map(resolveConsultation)
}

const INSURANCE_CONSULTATIONS: InsuranceConsultation[] = [
  {
    id: 'hoken-minaoshi-honpo',
    name: '保険見直し本舗',
    provider: '株式会社保険見直し本舗',
    affiliate_url: 'https://px.a8.net/svt/ejp?a8mat=4B1PLU+FIGM7M+5V54+5YRHE',
    tracking_pixel: 'https://www14.a8.net/0.gif?a8mat=4B1PLU+FIGM7M+5V54+5YRHE',
    reward: '無料相談完了',
    features: ['初回相談でノベルティプレゼント', 'えらべるギフト', '全国対応', '完全無料'],
    description: '初めてのご相談でえらべるノベルティをプレゼント。保険の見直しから新規加入まで、保険のプロが中立的な立場で最適なプランを無料でご提案します。',
    campaign: {
      affiliate_url: 'https://px.a8.net/svt/ejp?a8mat=4B1PLU+FIGM7M+5V54+5YZ75',
      tracking_pixel: 'https://www10.a8.net/0.gif?a8mat=4B1PLU+FIGM7M+5V54+5YZ75',
      end_date: '2026-05-31',
    },
  },
  {
    id: 'minna-no-seimei',
    name: 'みんなの生命保険アドバイザー',
    provider: 'パワープランニング株式会社',
    affiliate_url: 'https://px.a8.net/svt/ejp?a8mat=4B1PLU+FH9R02+20NK+5YZ75',
    tracking_pixel: 'https://www16.a8.net/0.gif?a8mat=4B1PLU+FH9R02+20NK+5YZ75',
    reward: '無料相談完了',
    features: ['全国対応', 'オンライン相談OK', '在籍FP3,000名以上', '何度でも無料'],
    description: '全国3,000名以上のFP（ファイナンシャルプランナー）があなたの保険選びをサポート。オンラインで何度でも無料相談できます。',
  },
  {
    id: 'hoken-mammoth',
    name: '保険マンモス',
    provider: '保険マンモス株式会社',
    affiliate_url: 'https://px.a8.net/svt/ejp?a8mat=4B1PLU+F4RNAQ+5SIO+5YZ75',
    tracking_pixel: 'https://www11.a8.net/0.gif?a8mat=4B1PLU+F4RNAQ+5SIO+5YZ75',
    reward: '無料相談完了',
    features: ['満足度95%', '無料相談でギフト贈呈', '全国対応', '保険のプロが担当'],
    description: '満足度95%の保険相談サービス。無料相談完了でギフトプレゼント。保険のプロが中立的な立場であなたに最適な保険をご提案します。',
  },
  {
    id: 'garden',
    name: '貯蓄の無料相談サイト「ガーデン」',
    provider: 'ガーデン',
    affiliate_url: 'https://h.accesstrade.net/sp/cc?rk=0100pedp00oqh7',
    reward: '無料相談完了',
    features: ['iDeCo・NISA・個人年金対応', 'プロが1対1でサポート', '全国対応', '完全無料'],
    description: 'iDeCo・NISA・個人年金など老後のお金の不安をプロが1対1で解決。あなたにピッタリの貯蓄プランを無料でご提案します。',
  },
]
