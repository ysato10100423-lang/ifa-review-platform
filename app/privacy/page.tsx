import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6">プライバシーポリシー</h1>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">基本方針</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          IFAレビュー（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の保護に努めます。
          本ポリシーは、当サイトにおける個人情報および利用データの取り扱いについて定めるものです。
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">収集する情報</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>アカウント登録時のメールアドレス・ニックネーム</li>
          <li>投稿された口コミの内容・評価</li>
          <li>アクセスログ（IPアドレス・ブラウザ情報・閲覧ページ・滞在時間等）</li>
          <li>Cookie および類似技術により収集される情報</li>
        </ul>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">情報の利用目的</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>サービスの提供・運営・改善</li>
          <li>ユーザー認証・アカウント管理</li>
          <li>お問い合わせへの対応</li>
          <li>ガイドライン違反への対応・不正利用の防止</li>
          <li>アクセス解析によるサービス改善</li>
        </ul>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">第三者サービスの利用</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          当サイトでは、サービス向上のために以下の第三者サービスを利用しており、
          これらのサービスが利用者のアクセス情報を収集・処理する場合があります。
        </p>
        <div className="space-y-3">
          <div className="bg-gray-50 rounded p-3">
            <p className="text-sm font-medium text-gray-800 mb-1">Google Analytics（グーグル・アナリティクス）</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              当サイトはGoogleが提供するアクセス解析ツール「Google Analytics」を使用しています。
              Google AnalyticsはCookieを使用してアクセス情報（閲覧ページ・滞在時間・流入元・デバイス情報等）を収集します。
              収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます。
              Google Analyticsのデータ収集はブラウザのCookie設定により無効化できます。
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
            >
              Googleプライバシーポリシー →
            </a>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-sm font-medium text-gray-800 mb-1">Supabase</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              ユーザー認証・データベース管理にSupabaseを使用しています。
              登録情報・口コミデータはSupabaseのサーバーに保存されます。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">第三者への情報提供</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          当サイトは、以下の場合を除き、利用者の個人情報を第三者に提供しません。
        </p>
        <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
          <li>利用者本人の同意がある場合</li>
          <li>法令に基づき開示が必要な場合</li>
          <li>人の生命・身体・財産の保護のために必要な場合</li>
        </ul>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Cookieについて</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          当サイトはCookieを使用しています。Cookieはログイン状態の維持やアクセス解析に使用されます。
          ブラウザの設定によりCookieの受け入れを拒否することができますが、
          一部のサービスが正常に機能しない場合があります。
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">個人情報の管理・削除</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          利用者は、マイページから自身のニックネームの変更・アカウントの削除依頼を行うことができます。
          アカウントを削除した場合、登録情報および投稿した口コミは削除されます。
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">プライバシーポリシーの改定</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          当サイトは、必要に応じて本ポリシーを予告なく改定する場合があります。
          改定後も引き続きご利用いただいた場合、改定後のポリシーに同意したものとみなします。
        </p>
      </section>

      <div className="text-center">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← トップページに戻る
        </Link>
      </div>
    </div>
  )
}
