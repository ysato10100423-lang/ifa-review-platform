import { INSURANCE_CONSULTATIONS } from '@/data/insurance-consultation'

export default function InsuranceConsultationSection() {
  if (INSURANCE_CONSULTATIONS.length === 0) return null

  return (
    <div className="mb-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h2 className="font-bold text-green-900 text-base mb-1">
          🛡️ プロのFPに無料で保険相談する
        </h2>
        <p className="text-xs text-green-700">
          診断結果をもとに、専門家があなたに最適な保険プランをご提案します
        </p>
      </div>

      <div className="space-y-4">
        {INSURANCE_CONSULTATIONS.map(service => (
          <div key={service.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
                  <p className="text-xs text-gray-500">{service.provider}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0 font-medium">
                  完全無料
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {service.features.map(f => (
                  <span key={f} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                    ✓ {f}
                  </span>
                ))}
              </div>

              {/* こんな方におすすめ */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-600 space-y-1">
                <p className="font-medium text-gray-700 mb-1">こんな方におすすめ</p>
                <p>・保険の見直しを考えているが何から始めればいいかわからない</p>
                <p>・複数の保険を比較して最適なものを選びたい</p>
                <p>・保険料を節約したい</p>
              </div>

              <a
                href={service.affiliate_url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                無料で保険相談を申し込む →
              </a>
              <p className="text-center text-xs text-gray-400 mt-1">
                相談・診断は何度でも無料です
              </p>
            </div>

            {/* トラッキングピクセル */}
            {service.tracking_pixel && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                width={1}
                height={1}
                src={service.tracking_pixel}
                alt=""
                style={{ display: 'none', border: 'none' }}
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3 leading-relaxed">
        ※当セクションにはアフィリエイト広告が含まれます。掲載情報は情報提供のみを目的としており、保険の勧誘は行っておりません。
      </p>
    </div>
  )
}
