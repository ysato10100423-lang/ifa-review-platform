import { Fund } from '@/data/funds'
import { Insurance } from '@/data/insurance'

type Product = Fund | Insurance

function isFund(p: Product): p is Fund {
  return 'expense_ratio' in p
}

interface Props {
  product: Product
  showRank?: boolean
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-yellow-400 text-yellow-900',
  2: 'bg-gray-300 text-gray-700',
  3: 'bg-amber-600 text-white',
}

const CATEGORY_LABELS: Record<string, string> = {
  global_stock: '全世界・先進国株',
  domestic_stock: '国内株式',
  bond: '債券',
  balanced: 'バランス型',
  reit: 'REIT',
  life: '死亡保険',
  medical: '医療保険',
  cancer: 'がん保険',
  accident: '傷害保険',
  income: '収入保障',
}

const RISK_LABELS = ['', '低リスク', '低〜中', '中リスク', '中〜高', '高リスク']

export default function ProductCard({ product, showRank = true }: Props) {
  const fund = isFund(product) ? product : null
  const insurance = !isFund(product) ? product : null

  const rankStyle = RANK_STYLES[product.rank] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {showRank && (
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${rankStyle}`}>
              {product.rank}
            </span>
          )}
          {product.badge && (
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </span>
        </div>
        {fund && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${
            fund.risk_level <= 2 ? 'bg-green-100 text-green-700' :
            fund.risk_level <= 3 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {RISK_LABELS[fund.risk_level]}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-0.5">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{product.provider}</p>
      <p className="text-xs text-gray-600 leading-relaxed mb-3">{product.description}</p>

      {fund && (
        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div className="bg-gray-50 rounded p-2">
            <div className="text-xs text-gray-400 mb-0.5">信託報酬</div>
            <div className="text-sm font-bold text-gray-800">{fund.expense_ratio.toFixed(4)}%</div>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <div className="text-xs text-gray-400 mb-0.5">1年リターン</div>
            <div className={`text-sm font-bold ${fund.return_1y == null ? 'text-gray-400' : fund.return_1y >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {fund.return_1y == null ? '―' : `${fund.return_1y > 0 ? '+' : ''}${fund.return_1y}%`}
            </div>
          </div>
          <div className="bg-gray-50 rounded p-2">
            <div className="text-xs text-gray-400 mb-0.5">最低投資額</div>
            <div className="text-sm font-bold text-gray-800">{fund.min_investment.toLocaleString()}円〜</div>
          </div>
        </div>
      )}

      {insurance && (
        <div className="bg-gray-50 rounded p-2 mb-3 text-center">
          <div className="text-xs text-gray-400 mb-0.5">保険料例（月額）</div>
          <div className="text-sm font-bold text-gray-800">約{insurance.monthly_premium_example.toLocaleString()}円〜</div>
        </div>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {product.features.map((f) => (
          <span key={f} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
            {f}
          </span>
        ))}
      </div>

      <a
        href={product.affiliate_url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        {fund ? '公式サイトで詳細を見る →' : '無料で資料請求 →'}
      </a>
      <p className="text-center text-xs text-gray-400 mt-1">最新情報は各社公式サイトをご確認ください</p>
    </div>
  )
}
