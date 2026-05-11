export type InvestmentSchool = {
  id: string
  name: string
  provider: string
  affiliate_url: string
  tracking_pixel?: string
  catchcopy: string
  features: string[]
  description: string
  cta_label: string
}

export const INVESTMENT_SCHOOLS: InvestmentSchool[] = [
  {
    id: 'financial-academy',
    name: 'ファイナンシャルアカデミー',
    provider: '株式会社ファイナンシャルアカデミー',
    affiliate_url: 'https://px.a8.net/svt/ejp?a8mat=4B3NZ0+1JYRN6+1IRY+25GPIP',
    tracking_pixel: 'https://www10.a8.net/0.gif?a8mat=4B3NZ0+1JYRN6+1IRY+25GPIP',
    catchcopy: '受講生の7割以上がプラスの運用実績',
    features: ['体験学習会に無料参加OK', '累計受講生20万人以上', '株・不動産・お金の学校', 'オンライン受講対応'],
    description: '累計受講生20万人超の投資スクール。株式投資・不動産投資・お金の基礎まで幅広く学べます。まずは無料の体験学習会で内容を確認できます。',
    cta_label: '無料体験学習会に申し込む →',
  },
]
