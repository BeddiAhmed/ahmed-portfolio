import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LocaleDocument from '@/components/LocaleDocument'
import { locales, localeDir, getMessages, isValidLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const t = getMessages(locale as Locale)
  return {
    title: {
      default: `Ahmed Beddi — ${t.home.hero.role}`,
      template: `%s | Ahmed Beddi`,
    },
    description: t.home.hero.bio,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const loc = locale as Locale
  const t = getMessages(loc)
  const dir = localeDir[loc]

  return (
    <>
      {/* Sets document.documentElement.lang and .dir client-side for accessibility */}
      <LocaleDocument locale={loc} dir={dir} />
      {/* dir on this wrapper activates [dir="rtl"] CSS rules immediately (no JS needed) */}
      <div dir={dir} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar locale={loc} t={t.nav} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer locale={loc} t={t.footer} nav={t.nav} />
      </div>
    </>
  )
}
