import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IFAレビュー - IFA・保険代理店の口コミ・評判',
  description: '実際に利用したユーザーによるIFA・保険代理店の口コミ・評価プラットフォーム',
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
