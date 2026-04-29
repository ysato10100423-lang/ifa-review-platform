export type InsuranceConsultation = {
  id: string
  name: string
  provider: string
  affiliate_url: string
  tracking_pixel?: string
  reward: string
  features: string[]
  description: string
}

export const INSURANCE_CONSULTATIONS: InsuranceConsultation[] = [
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
]
