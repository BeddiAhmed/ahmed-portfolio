import Link from 'next/link'
import { getMessages, isValidLocale, locales, localeNames } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getArticle, getAllArticleSlugs, articleExistsForLocale } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const article = await getArticle(slug, locale as Locale)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()
  const loc = locale as Locale

  const article = await getArticle(slug, loc)
  if (!article) notFound()

  const t = getMessages(loc)
  const catKey = article.category as keyof typeof t.categories
  const catLabel = t.categories[catKey] ?? article.category

  const altLocales = locales.filter(
    (l) => l !== loc && articleExistsForLocale(slug, l)
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: '4rem',
          paddingTop: '3rem',
          paddingBottom: '5rem',
          alignItems: 'start',
        }}
      >
        {/* ── Main content ── */}
        <article>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '2rem', fontSize: '0.82rem', color: 'var(--fg-3)' }}>
            <Link href={`/${loc}`} style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>
              Ahmed Ould
            </Link>
            {' / '}
            <Link href={`/${loc}/articles`} style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>
              {t.nav.articles}
            </Link>
            {' / '}
            <span style={{ color: 'var(--fg-2)' }}>{article.title}</span>
          </nav>

          {/* Category + read time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              className={`cat-${article.category}`}
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '0.2rem 0.6rem',
                borderRadius: 999,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              {catLabel}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--fg-3)' }}>
              {article.readTime} {t.articles.minRead}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--fg)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}
          >
            {article.title}
          </h1>

          {/* Date */}
          <p style={{ fontSize: '0.82rem', color: 'var(--fg-3)', marginBottom: '2.5rem' }}>
            {t.articles.publishedOn}{' '}
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString(
                loc === 'ar' ? 'ar-SA' : loc === 'fr' ? 'fr-FR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
          </p>

          {/* Body */}
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--fg-2)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 999,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* ── Sidebar ── */}
        <aside
          style={{
            position: 'sticky',
            top: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Language switcher */}
          {altLocales.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '1.25rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--fg-3)',
                  marginBottom: '0.75rem',
                }}
              >
                {t.articles.otherLanguages}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {altLocales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}/articles/${slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      padding: '0.35rem 0',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        background: 'rgba(201,166,96,0.12)',
                        border: '1px solid rgba(201,166,96,0.25)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: 3,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {l.toUpperCase()}
                    </span>
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to articles */}
          <Link
            href={`/${loc}/articles`}
            style={{
              fontSize: '0.82rem',
              color: 'var(--fg-3)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ← {t.nav.articles}
          </Link>
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          aside { position: static !important; }
        }
      `}</style>
    </div>
  )
}
