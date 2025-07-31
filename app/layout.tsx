import type { Metadata } from 'next'
import { Inter, Noto_Serif_SC } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSerifSC = Noto_Serif_SC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif' 
})

export const metadata: Metadata = {
  title: '非共识之路',
  description: '个人博客 - 探索技术、思考人生',
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
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
              <div className="text-center text-muted text-sm">
                <p>© 2025 非共识之路. 保持独立思考.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}