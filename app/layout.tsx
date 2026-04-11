import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '投信・保険 おすすめナビ - 投資信託・保険の比較・無料診断',
  description: '投資信託・保険のおすすめ商品をランキングと無料診断でご紹介。NISAや積立投資に最適なファンド、あなたに合った保険がすぐわかります。',
  verification: {
    google: 'LFV74eYugr7psQeNsXb3NySC4R3pISbN8XgZ4XsiyMU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} bg-gray-50 min-h-screen`}>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-XNRJGYPETE" />
    </html>
  )
}
