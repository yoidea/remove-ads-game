import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: '広告消しチャレンジ',
  description: '速く正確にポップアップ広告を閉じるゲーム',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
