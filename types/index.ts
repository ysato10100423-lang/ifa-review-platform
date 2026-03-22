export type AdvisorType = 'ifa' | 'insurance' | 'both'

export type MeetingMethod = 'in_person' | 'online' | 'both'

export const MEETING_METHOD_LABELS: Record<MeetingMethod, string> = {
  in_person: '対面',
  online: 'オンライン',
  both: 'どちらも可',
}

export type ServiceUsed =
  | 'investment_trust'
  | 'stocks'
  | 'insurance'
  | 'idc'
  | 'nisa'
  | 'other'

export const SERVICE_LABELS: Record<ServiceUsed, string> = {
  investment_trust: '投資信託',
  stocks: '株式',
  insurance: '保険',
  idc: '確定拠出年金',
  nisa: 'NISA',
  other: 'その他',
}

export const ADVISOR_TYPE_LABELS: Record<AdvisorType, string> = {
  ifa: 'IFA',
  insurance: '保険代理店',
  both: 'IFA・保険代理店',
}

export const REVIEW_TAGS = [
  '説明が丁寧',
  '親切・親身',
  'レスポンスが早い',
  '手数料が明確',
  '専門知識が豊富',
  '押し付けがない',
  '長期的な視点',
  '定期的にフォローあり',
]

export interface Advisor {
  id: string
  name: string
  type: AdvisorType
  description: string | null
  address: string | null
  prefecture: string | null
  website_url: string | null
  specialties: string[] | null
  meeting_method: MeetingMethod | null
  avg_rating: number
  review_count: number
  created_at: string
}

export interface Review {
  id: string
  advisor_id: string
  user_id: string
  rating_overall: number
  rating_proposal: number
  rating_fee_transparency: number
  rating_communication: number
  rating_expertise: number
  tags: string[] | null
  comment: string | null
  service_used: ServiceUsed | null
  created_at: string
  profiles?: { nickname: string | null }
}

export interface Profile {
  id: string
  nickname: string | null
  created_at: string
}
