import ArticleCard from '@/components/ArticleCard'
import { getMessages, isValidLocale, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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
  return { title: t.articles.title, description: t.articles.subtitle }
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const loc = locale as Locale
  const t = getMessages(loc)
  const articles = getArticles(loc)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>

      {/* Header */}
      <header style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '0.75rem',
          }}
        >
          {t.articles.title}
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--fg)',
            lineHeight: 1.2,
            marginBottom: '0.75rem',
          }}
        >
          {t.articles.subtitle}
        </h1>
      </header>

      {/* Articles grid */}
      <section style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {articles.length === 0 ? (
          <p style={{ color: 'var(--fg-3)', fontSize: '1rem', paddingTop: '2rem' }}>
            {t.articles.noArticles}
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {articles.map((a) => (
              <ArticleCard
                key={a.slug}
                article={a}
                locale={loc}
                t={t.articles}
                categories={t.categories}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
