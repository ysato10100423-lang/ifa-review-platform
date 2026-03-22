import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ifa-review-platform.vercel.app'

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: advisors } = await supabase
    .from('advisors')
    .select('id, created_at')

  const advisorUrls: MetadataRoute.Sitemap = (advisors || []).map((a) => ({
    url: `${baseUrl}/advisors/${a.id}`,
    lastModified: new Date(a.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/guidelines`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...advisorUrls,
  ]
}
