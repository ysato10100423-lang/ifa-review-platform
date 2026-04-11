export type InsuranceCategory = 'life' | 'medical' | 'cancer' | 'accident' | 'income'

export type Insurance = {
  id: string
  name: string
  provider: string
  category: InsuranceCategory
  monthly_premium_example: number
  affiliate_url: string
  features: string[]
  rank: number
  badge?: string
  description: string
}

export const INSURANCES: Insurance[] = [
  {
    id: 'lifenet-term',
    name: 'かぞくへの保険',
    provider: 'ライフネット生命',
    category: 'life',
    monthly_premium_example: 1500,
    affiliate_url: 'https://www.lifenet-seimei.co.jp/',
    features: ['業界最安水準の保険料', 'ネット完結申込', '無解約返戻金型', '1年更新型'],
    rank: 1,
    badge: '人気No.1',
    description: 'インターネット完結で申し込みができる割安な定期死亡保険。無駄な貯蓄要素を省いた純粋な保障型。',
  },
  {
    id: 'zurich-term',
    name: 'ズバリ！定期',
    provider: 'チューリッヒ生命',
    category: 'life',
    monthly_premium_example: 1800,
    affiliate_url: 'https://www.zurichlife.co.jp/',
    features: ['保険料割安', 'オンライン申込', '非喫煙者割引', '豊富な特約'],
    rank: 2,
    description: '喫煙・非喫煙を区分した保険料設定で非喫煙者は特にお得。充実した特約でカスタマイズ可能な定期保険。',
  },
  {
    id: 'rakuten-life',
    name: '楽天生命スーパー定期保険',
    provider: '楽天生命',
    category: 'life',
    monthly_premium_example: 1600,
    affiliate_url: 'https://www.rakuten-life.co.jp/',
    features: ['楽天ポイント贈呈', 'ネット申込完結', '低保険料', 'NISA積立との組み合わせ推奨'],
    rank: 3,
    description: '楽天グループの生命保険。加入で楽天ポイントが付与される。掛け捨てで保障に徹したシンプルな定期保険。',
  },
  {
    id: 'lifenet-medical',
    name: 'じぶんへの保険3',
    provider: 'ライフネット生命',
    category: 'medical',
    monthly_premium_example: 2000,
    affiliate_url: 'https://www.lifenet-seimei.co.jp/',
    features: ['日帰り入院から保障', '実手術保障', 'シンプル設計', '手頃な保険料'],
    rank: 4,
    badge: '医療保険人気',
    description: '日帰り入院から保障対象。ネット申込で手頃な保険料。必要な保障に絞ったシンプルな医療保険。',
  },
  {
    id: 'orix-medical',
    name: '新キュア',
    provider: 'オリックス生命',
    category: 'medical',
    monthly_premium_example: 2200,
    affiliate_url: 'https://www.orix-life.co.jp/',
    features: ['入院一時金あり', '先進医療保障', '保険料割安', '長期保障'],
    rank: 5,
    description: '入院日額保障に加えて入院一時金や先進医療保障も充実。コスパが高く長期で安心できる医療保険。',
  },
  {
    id: 'sony-medical',
    name: 'メディカル保険',
    provider: 'ソニー生命',
    category: 'medical',
    monthly_premium_example: 2800,
    affiliate_url: 'https://www.sonylife.co.jp/',
    features: ['担当者によるサポート', '豊富なオプション', '長期契約', '精神疾患特約'],
    rank: 6,
    description: 'ソニー生命の担当者が個人に合った設計をサポート。精神疾患特約など充実したカスタマイズが可能。',
  },
  {
    id: 'lifenet-cancer',
    name: 'がん保険ダブル',
    provider: 'ライフネット生命',
    category: 'cancer',
    monthly_premium_example: 1800,
    affiliate_url: 'https://www.lifenet-seimei.co.jp/',
    features: ['診断一時金100万円', '抗がん剤治療保障', 'ネット申込', '割安保険料'],
    rank: 7,
    badge: 'がん保険人気',
    description: 'がんと診断されたら一時金100万円を支給。抗がん剤・放射線治療も手厚く保障するネット完結がん保険。',
  },
  {
    id: 'aflac-cancer',
    name: 'がん保険DAYS',
    provider: 'アフラック生命',
    category: 'cancer',
    monthly_premium_example: 2200,
    affiliate_url: 'https://www.aflac.co.jp/',
    features: ['業界No.1シェア', '充実した通院保障', '長期実績', '先進医療対応'],
    rank: 8,
    description: 'がん保険のパイオニアとして長い実績を誇る。通院保障が充実しており、入院から自宅療養まで幅広くカバー。',
  },
  {
    id: 'zurich-income',
    name: 'しゅうにゅう保険',
    provider: 'チューリッヒ生命',
    category: 'income',
    monthly_premium_example: 3000,
    affiliate_url: 'https://www.zurichlife.co.jp/',
    features: ['毎月収入のように保険金受取', '就業不能も保障', 'リーズナブル', '長期保障'],
    rank: 9,
    badge: '就労不能保障',
    description: '万一の死亡・高度障害時に毎月収入のように保険金を受け取れる収入保障保険。割安で合理的な保障形態。',
  },
  {
    id: 'macnica-accident',
    name: 'パーソナルワン',
    provider: '三井住友海上あいおい生命',
    category: 'accident',
    monthly_premium_example: 800,
    affiliate_url: 'https://www.msa-life.co.jp/',
    features: ['傷害・入院保障', '低保険料', '手軽に加入', '日常事故・交通事故両対応'],
    rank: 10,
    description: '日常生活の傷害・入院を手頃な保険料で保障。医療保険の補完として活用できる傷害保険。',
  },
  {
    id: 'neolive-medical',
    name: 'ネオde医療',
    provider: 'ネオファースト生命',
    category: 'medical',
    monthly_premium_example: 1900,
    affiliate_url: 'https://www.neo1st.co.jp/',
    features: ['無解約返戻金型', '保険料割安', '日帰り入院保障', 'シンプル設計'],
    rank: 11,
    description: '無解約返戻金型のシンプルな医療保険。貯蓄性を省いて保障に特化したことで業界最安水準の保険料を実現。',
  },
  {
    id: 'macnica-income',
    name: '収入保障保険',
    provider: 'マニュライフ生命',
    category: 'income',
    monthly_premium_example: 2500,
    affiliate_url: 'https://www.manulife.co.jp/',
    features: ['逓減型保険金', '低コスト', '就業不能特約', 'タバコ区分あり'],
    rank: 12,
    description: '保険期間が経過するほど受取総額が減少する収入保障保険。若い世代ほど割安で加入できるコスパ優秀な保険。',
  },
]

export const INSURANCE_CATEGORIES: { value: InsuranceCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'life', label: '死亡保険' },
  { value: 'medical', label: '医療保険' },
  { value: 'cancer', label: 'がん保険' },
  { value: 'income', label: '収入保障保険' },
  { value: 'accident', label: '傷害保険' },
]
