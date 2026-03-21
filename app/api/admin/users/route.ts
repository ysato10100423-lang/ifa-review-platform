import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_EMAIL = 'y.sato10100423@gmail.com'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET(request: NextRequest) {
  // 管理者認証
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: { user } } = await supabaseAdmin.auth.getUser(token)
  if (user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // プロフィール（ニックネーム）を取得
  const { data: profiles } = await supabaseAdmin.from('profiles').select('id, nickname')
  const profileMap = Object.fromEntries((profiles || []).map((p) => [p.id, p.nickname]))

  // 口コミ数を取得
  const { data: reviewCounts } = await supabaseAdmin
    .from('reviews')
    .select('user_id')
  const countMap: Record<string, number> = {}
  ;(reviewCounts || []).forEach(({ user_id }) => {
    countMap[user_id] = (countMap[user_id] || 0) + 1
  })

  const result = users.map((u) => ({
    id: u.id,
    email: u.email,
    nickname: profileMap[u.id] || null,
    review_count: countMap[u.id] || 0,
    created_at: u.created_at,
  }))

  return NextResponse.json(result)
}

export async function DELETE(request: NextRequest) {
  // 管理者認証
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: { user } } = await supabaseAdmin.auth.getUser(token)
  if (user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { userId, userEmail } = await request.json()
  if (!userId || !userEmail) {
    return NextResponse.json({ error: 'Missing userId or userEmail' }, { status: 400 })
  }

  // 削除完了メールを送信
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: userEmail,
      subject: '【IFAレビュー】アカウント削除完了のお知らせ',
      html: `
        <h2>アカウント削除完了のお知らせ</h2>
        <p>IFAレビューをご利用いただきありがとうございました。</p>
        <p>お客様のアカウントおよび関連データ（口コミ等）はすべて削除されました。</p>
        <p>またのご利用をお待ちしております。</p>
        <p style="color:#888;font-size:12px;">
          このメールに心当たりがない場合は、お手数ですがご連絡ください。
        </p>
      `,
    }),
  })

  // ユーザーを削除（profilesとreviewsはカスケード削除）
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
