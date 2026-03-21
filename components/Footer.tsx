export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-xs font-semibold text-gray-600 mb-2">投稿ガイドライン</p>
        <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside mb-4">
          <li>担当者の個人名（フルネーム・ニックネーム等）の記載は禁止しています</li>
          <li>事実に基づかない誹謗中傷・侮辱的な表現は禁止しています</li>
          <li>ガイドライン違反の投稿は運営が確認の上、削除する場合があります</li>
          <li>違反と思われる口コミは各投稿の「通報」ボタンからご報告ください</li>
        </ul>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} IFAレビュー　当サイトの口コミは利用者個人の意見であり、運営は内容の正確性を保証しません。
        </p>
      </div>
    </footer>
  )
}
