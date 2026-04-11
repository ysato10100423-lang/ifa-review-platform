import { BROKERS } from '@/data/brokers'
import { getCardByBroker } from '@/data/creditcards'

// affiliate_urlが空のブローカーは非表示（承認前は表示しない）
const activeBrokers = BROKERS.filter(b => b.affiliate_url !== '')

export default function BrokerCreditCardSection() {
  // 承認済みのブローカーが1件もなければセクション自体を非表示
  if (activeBrokers.length === 0) return null

  return (
    <div className="mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h2 className="font-bold text-blue-900 text-base mb-1">
          📊 このファンドを買える証券会社
        </h2>
        <p className="text-xs text-blue-700">
          クレカ積立を利用するとポイントが貯まってお得です
        </p>
      </div>

      <div className="space-y-4">
        {activeBrokers.map(broker => {
          const card = getCardByBroker(broker.id)
          return (
            <div key={broker.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* 証券会社 */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{broker.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shrink-0">
                    つみたて還元 {broker.point_rate}%
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{broker.tagline}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {broker.features.map(f => (
                    <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                </div>
                <a
                  href={broker.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  {broker.name}で口座開設（無料）→
                </a>
                <p className="text-center text-xs text-gray-400 mt-1">
                  最新情報は公式サイトをご確認ください
                </p>
              </div>

              {/* 相性の良いクレカ */}
              {card && card.affiliate_url !== '' && (
                <div className="p-4 bg-amber-50">
                  <p className="text-xs font-medium text-amber-800 mb-2">
                    💳 {broker.name}のつみたてにおすすめのクレジットカード
                  </p>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{card.name}</p>
                      <p className="text-xs text-gray-500">{card.provider}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                        還元率 {card.point_rate}%
                      </span>
                      {card.annual_fee === 0 && (
                        <p className="text-xs text-green-600 mt-0.5">年会費無料</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {card.features.map(f => (
                      <span key={f} className="text-xs bg-white text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                  <a
                    href={card.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                  >
                    {card.name}に申し込む（無料）→
                  </a>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    最新情報は公式サイトをご確認ください
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3 leading-relaxed">
        ※当セクションにはアフィリエイト広告が含まれます。掲載情報は情報提供のみを目的としており、金融商品の勧誘は行っておりません。
      </p>
    </div>
  )
}
