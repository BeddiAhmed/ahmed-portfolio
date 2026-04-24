import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Ahmed Ould — Economist & Data Analyst',
  description:
    'Analysis on energy markets, trade dynamics, and economic development in West Africa and the Middle East.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  )
}
