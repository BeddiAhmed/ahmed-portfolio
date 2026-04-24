import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import ProjectCard from '@/components/ProjectCard'
import { getMessages, isValidLocale, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getArticles } from '@/lib/articles'
import { getAllProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const loc = locale as Locale

  const t = getMessages(loc)
  const articles = getArticles(loc).slice(0, 3)
  const projects = getAllProjects().slice(0, 3)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 10vw, 8rem)',
          paddingBottom: 'clamp(3rem, 8vw, 6rem)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Overline */}
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1.5rem',
          }}
        >
          {t.home.hero.role}
        </p>

        {/* Name */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            marginBottom: '1.75rem',
            maxWidth: '14ch',
          }}
        >
          {t.home.hero.name}
        </h1>

        {/* Bio */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--fg-2)',
            maxWidth: '55ch',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          {t.home.hero.bio}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            href={`/${loc}/articles`}
            style={{
              display: 'inline-block',
              padding: '0.7rem 1.5rem',
              background: 'var(--accent)',
              color: '#0a0907',
              borderRadius: 'var(--radius)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
          >
            {t.home.hero.readArticles}
          </Link>
          <Link
            href={`/${loc}/projects`}
            style={{
              display: 'inline-block',
              padding: '0.7rem 1.5rem',
              background: 'transparent',
              color: 'var(--fg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            {t.home.hero.viewProjects}
          </Link>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {[
          { value: articles.length || '1', label: t.home.stats.articles },
          { value: projects.length, label: t.home.stats.projects },
          { value: '3', label: t.home.stats.languages },
        ].map(({ value, label }) => (
          <div
            key={label}
            style={{
              padding: '2rem 0',
              textAlign: 'center',
              borderRight: '1px solid var(--border)',
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              {value}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {label}
            </p>
          </div>
        ))}
      </section>

      {/* ── Latest articles ── */}
      <section style={{ paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <h2
            className="font-display"
            style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--fg)' }}
          >
            {t.home.latestArticles}
          </h2>
          <Link
            href={`/${loc}/articles`}
            style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none' }}
          >
            {t.home.viewAllArticles}
          </Link>
        </div>

        {articles.length === 0 ? (
          <p style={{ color: 'var(--fg-3)', fontSize: '0.9rem' }}>{t.articles.noArticles}</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1rem',
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

      {/* ── Projects preview ── */}
      <section style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <h2
            className="font-display"
            style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--fg)' }}
          >
            {t.home.featuredProjects}
          </h2>
          <Link
            href={`/${loc}/projects`}
            style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none' }}
          >
            {t.home.viewAllProjects}
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1rem',
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} t={t.projects} />
          ))}
        </div>
      </section>
    </div>
  )
}
