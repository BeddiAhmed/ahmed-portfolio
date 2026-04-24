'use client'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import type { Locale } from '@/lib/i18n'
import type { Messages } from '@/lib/i18n'

type Props = {
  article: ArticleMeta
  locale: Locale
  t: Messages['articles']
  categories: Messages['categories']
}

export default function ArticleCard({ article, locale, t, categories }: Props) {
  const catKey = article.category as keyof typeof categories
  const catLabel = categories[catKey] ?? article.category

  return (
    <Link
      href={`/${locale}/articles/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '1.5rem',
          height: '100%',
          transition: 'border-color 0.2s, transform 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderColor =
            'rgba(201,166,96,0.4)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }}
      >
        {/* Category + read time */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.85rem',
          }}
        >
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
          <span style={{ fontSize: '0.75rem', color: 'var(--fg-3)' }}>
            {article.readTime} {t.minRead}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--fg)',
            lineHeight: 1.35,
            marginBottom: '0.6rem',
          }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--fg-2)',
            lineHeight: 1.6,
            marginBottom: '1.1rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>

        {/* Date + tags */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <time
            dateTime={article.date}
            style={{ fontSize: '0.75rem', color: 'var(--fg-3)' }}
          >
            {new Date(article.date).toLocaleDateString(
              locale === 'ar' ? 'ar-SA' : locale === 'fr' ? 'fr-FR' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </time>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--fg-3)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 999,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
