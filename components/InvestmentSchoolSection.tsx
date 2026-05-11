import { INVESTMENT_SCHOOLS } from '@/data/investment-schools'

const activeSchools = INVESTMENT_SCHOOLS.filter(s => s.affiliate_url !== '')

export default function InvestmentSchoolSection() {
  if (activeSchools.length === 0) return null

  return (
    <div className="mb-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
        <h2 className="font-bold text-orange-900 text-base mb-1">
          📚 投資を基礎から学ぶ
        </h2>
        <p className="text-xs text-orange-700">
          ファンドを選ぶ前に、投資の基本を学んでおきましょう
        </p>
      </div>

      <div className="space-y-4">
        {activeSchools.map(school => (
          <div key={school.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{school.name}</h3>
                  <p className="text-xs text-gray-500">{school.provider}</p>
                </div>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full shrink-0 font-medium">
                  {school.catchcopy}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                {school.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {school.features.map(f => (
                  <span key={f} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded">
                    ✓ {f}
                  </span>
                ))}
              </div>

              <a
                href={school.affiliate_url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                {school.cta_label}
              </a>
              <p className="text-center text-xs text-gray-400 mt-1">
                体験学習会への参加は無料です
              </p>
            </div>

            {/* トラッキングピクセル */}
            {school.tracking_pixel && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                width={1}
                height={1}
                src={school.tracking_pixel}
                alt=""
                style={{ display: 'none', border: 'none' }}
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3 leading-relaxed">
        ※当セクションにはアフィリエイト広告が含まれます。
      </p>
    </div>
  )
}
