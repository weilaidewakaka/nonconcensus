import type { Metadata } from 'next'
import { Inter, Noto_Serif_SC } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { baseSEO } from '@/lib/seo'
import { WebsiteJsonLd, PersonJsonLd } from '@/components/JsonLd'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const notoSerifSC = Noto_Serif_SC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  ...baseSEO,
  icons: {
    icon: [
      { url: '/icon.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/icon.jpg', sizes: '16x16', type: 'image/jpeg' }
    ],
    apple: [
      { url: '/icon.jpg', sizes: '180x180', type: 'image/jpeg' }
    ],
    shortcut: '/icon.jpg',
    other: [
      {
        rel: 'icon',
        url: '/icon.jpg',
        sizes: '192x192',
        type: 'image/jpeg'
      }
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <WebsiteJsonLd />
        <PersonJsonLd />
      </head>
      <body className={`${inter.className} ${notoSerifSC.variable}`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
            <div className="container py-4">
              <nav className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-foreground font-serif hover:text-accent transition-colors">
                  非共识之路
                </Link>
                
                <div className="flex items-center gap-8">
                  <Link 
                    href="/about" 
                    className="text-foreground font-medium hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    关于
                  </Link>
                  <Link 
                    href="/" 
                    className="text-foreground font-medium hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    首页
                  </Link>
                  <Link 
                    href="/search" 
                    className="text-foreground font-medium hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    搜索
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="container py-12 flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border mt-auto">
            <div className="container py-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center items-center gap-6 text-sm text-muted">
                  <Link 
                    href="/rss.xml" 
                    className="hover:text-accent transition-colors flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.429 2.486c9.36 0 16.966 7.582 16.966 16.923h-3.464c0-7.447-6.061-13.496-13.502-13.496V2.486zM3.662 9.408c6.027 0 10.922 4.883 10.922 10.896h-3.464c0-4.107-3.348-7.443-7.458-7.443V9.408zm3.699 7.71a1.741 1.741 0 11-3.482 0 1.741 1.741 0 013.482 0z"/>
                    </svg>
                    RSS订阅
                  </Link>
                  <Link 
                    href="https://okjk.co/DEmCji" 
                    className="hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    即刻
                  </Link>
                  <span className="text-muted">公众号: 非共识之路</span>
                </div>
                <div className="text-muted text-sm">
                  <p>© 2025 非共识之路. 保持独立思考.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}