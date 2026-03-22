import Link from 'next/link'

export default function GuidelinesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6">投稿ガイドライン・免責事項</h1>

      {/* サイトの位置づけ */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-blue-900 mb-3">当サイトの位置づけ</h2>
        <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
          <li>当サイトは、実際にIFA・保険代理店を利用したユーザーの<strong>口コミ情報の掲載のみ</strong>を目的としています</li>
          <li>金融商品・保険商品の<strong>勧誘・媒介・紹介・斡旋は一切行っておりません</strong></li>
          <li>特定の事業者を推薦・保証・格付けするものではありません</li>
          <li>掲載内容は金融商品取引法・保険業法における「金融商品の販売・勧誘」には該当しません</li>
          <li>投資・保険等の契約・申込みは必ずご自身の判断と責任で行ってください</li>
        </ul>
      </section>

      {/* 基本方針 */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">基本方針</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          IFAレビューは、実際にIFA・保険代理店を利用したユーザーが体験談を共有するプラットフォームです。
          投稿された口コミは投稿者個人の意見・感想であり、当サイト運営の見解を代表するものではありません。
          当サイトは、すべての利用者が安心して情報を発信・閲覧できる環境を維持するため、以下のガイドラインを定めています。
        </p>
      </section>

      {/* 禁止事項 */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">禁止事項</h2>
        <p className="text-sm text-gray-500 mb-3">以下に該当する投稿は、予告なく削除する場合があります。</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>虚偽の事実の記載</strong>：実際に体験していない内容や、事実と異なる情報の投稿</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>個人名・個人情報の記載</strong>：担当者・従業員のフルネーム・ニックネーム・連絡先・SNSアカウント等</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>誹謗中傷・侮辱的な表現</strong>：根拠のない人格攻撃や、著しく侮辱的な言葉を含む投稿</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>業務妨害を目的とした投稿</strong>：競業他社や第三者による意図的な低評価・不正操作</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>利害関係者による投稿</strong>：対象事業者の関係者による自社への高評価・競合への低評価</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>第三者のプライバシー侵害</strong>：他のユーザーや第三者の個人情報を含む投稿</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold shrink-0">✕</span>
            <span><strong>広告・宣伝目的の投稿</strong>：特定の商品・サービスの宣伝を目的とした内容</span>
          </li>
        </ul>
      </section>

      {/* 投稿者の責任 */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">投稿者の責任</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>投稿内容に関する一切の法的責任は、投稿者本人が負うものとします</li>
          <li>投稿は実際の体験に基づく事実と意見を明確に区別して記載してください</li>
          <li>投稿することで、当サイトが当該内容を掲載・利用することに同意したものとみなします</li>
          <li>虚偽の内容によって事業者に損害が生じた場合、当該投稿者が賠償責任を負う可能性があります</li>
        </ul>
      </section>

      {/* 免責事項 */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">免責事項</h2>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>当サイトに掲載された口コミは投稿者個人の意見・感想であり、当サイト運営の見解ではありません</li>
          <li>当サイトは口コミ内容の正確性・完全性・有用性を保証しません</li>
          <li>口コミ内容を参考にした投資・金融判断に関して、当サイトは一切の責任を負いません</li>
          <li>当サイトは予告なくサービス内容の変更・停止・終了を行う場合があります</li>
          <li>掲載情報（評価・口コミ等）は現時点での利用者の主観的評価であり、将来の品質を保証するものではありません</li>
        </ul>
      </section>

      {/* 削除申請・通報制度 */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">削除申請・通報制度</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          掲載内容についてガイドライン違反または権利侵害の疑いがある場合は、以下の方法でご申請ください。
          当サイト運営は内容を確認の上、適切に対応します。
        </p>
        <div className="bg-gray-50 rounded p-3 text-sm text-gray-600 mb-3">
          <p className="font-medium mb-1">削除申請・お問い合わせ</p>
          <p>各口コミの「通報」ボタンからご報告いただくか、運営までメールにてご連絡ください。</p>
          <p className="mt-1 text-gray-400 text-xs">※ 申請内容を確認後、原則7営業日以内に対応いたします。</p>
        </div>
        <p className="text-sm text-gray-600">
          なお、以下に該当する場合は削除対応を行います：
        </p>
        <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
          <li>明らかに虚偽の事実が記載されている場合</li>
          <li>個人名・個人情報が含まれている場合</li>
          <li>誹謗中傷・侮辱的な表現が含まれている場合</li>
          <li>その他、当サイト運営が不適切と判断した場合</li>
        </ul>
      </section>

      {/* ガイドライン改定 */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">ガイドラインの改定</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          当サイトは、必要に応じて本ガイドラインを予告なく改定する場合があります。
          改定後も引き続きご利用いただいた場合、改定後のガイドラインに同意したものとみなします。
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
