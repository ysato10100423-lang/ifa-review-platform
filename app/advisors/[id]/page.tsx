import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import AdvisorDetailClient from './AdvisorDetailClient'
import { ADVISOR_TYPE_LABELS, AdvisorType } from '@/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const { data: advisor } = await supabase
    .from('advisors')
    .select('name, description, type, prefecture')
    .eq('id', id)
    .single()

  if (!advisor) return { title: 'IFAレビュー' }

  const typeLabel = ADVISOR_TYPE_LABELS[advisor.type as AdvisorType] ?? 'IFA・保険代理店'
  const title = `${advisor.name}の口コミ・評判 | IFAレビュー`
  const description = advisor.description
    ? `${advisor.name}（${typeLabel}）の口コミ・評判。${advisor.description.slice(0, 80)}`
    : `${advisor.name}（${typeLabel}${advisor.prefecture ? `・${advisor.prefecture}` : ''}）の口コミ・評判。実際に利用したユーザーのリアルな評価を掲載しています。`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  }
}

export default async function AdvisorDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return <AdvisorDetailClient id={id} />
}
