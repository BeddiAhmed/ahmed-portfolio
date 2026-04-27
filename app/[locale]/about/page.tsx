import { getMessages, isValidLocale, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
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
  return { title: t.about.title }
}

const skills = [
  { group: 'Languages', items: ['Python', 'R', 'SQL', 'TypeScript'] },
  { group: 'Data', items: ['Pandas', 'dplyr', 'Plotly', 'D3.js', 'Folium'] },
  { group: 'Economics', items: ['Econometrics', 'Growth Accounting', 'IO Analysis'] },
  { group: 'Tools', items: ['Git', 'Next.js', 'PostgreSQL', 'QGIS'] },
]

const timeline = [
  { year: '2024–', role: 'Independent Researcher & Analyst', org: 'West Africa / Remote' },
  { year: '2022', role: 'M.Sc. Economics', org: 'University — Development Economics' },
  { year: '2020', role: 'Research Assistant', org: 'Economic Policy Institute' },
  { year: '2014', role: 'B.A. Economics - Islamic Finance', org: 'International Islamic University Malaysia' },
  { year: '2014', role: 'B.A. Economics - Islamic Finance', org: 'International Islamic University Malaysia' },
]

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const loc = locale as Locale
  const t = getMessages(loc)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '5rem',
          paddingTop: '3.5rem',
          paddingBottom: '5rem',
          alignItems: 'start',
        }}
      >
        {/* ── Main ── */}
        <div>
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
            {t.about.title}
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--fg)',
              lineHeight: 1.15,
              marginBottom: '2.5rem',
            }}
          >
            {t.about.subtitle}
          </h1>

          {[t.about.bio1, t.about.bio2, t.about.bio3].map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '1.05rem',
                color: i === 0 ? '#e8e2d9' : 'var(--fg-2)',
                lineHeight: 1.8,
                marginBottom: '1.4em',
                maxWidth: '65ch',
              }}
            >
              {para}
            </p>
          ))}

          {/* Timeline */}
          <div style={{ marginTop: '3rem' }}>
            <h2
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                marginBottom: '1.5rem',
              }}
            >
              Career
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {timeline.map(({ year, role, org }) => (
                <div
                  key={year}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '1.5rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--border)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, paddingTop: '0.1rem' }}>
                    {year}
                  </span>
                  <div>
                    <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.2rem' }}>
                      {role}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--fg-3)' }}>{org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside style={{ position: 'sticky', top: 80 }}>
          {/* Skills */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                marginBottom: '1.25rem',
              }}
            >
              {t.about.skills}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map(({ group, items }) => (
                <div key={group}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginBottom: '0.4rem' }}>
                    {group}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--accent)',
                          background: 'rgba(201,166,96,0.1)',
                          border: '1px solid rgba(201,166,96,0.2)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 4,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '1.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                marginBottom: '1rem',
              }}
            >
              {t.about.contact}
            </h3>
            <a
              href="mailto:admin@ciroprep.com"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                marginBottom: '0.75rem',
              }}
            >
              admin@ciroprep.com
            </a>
            <a
              href="#"
              style={{
                display: 'inline-block',
                fontSize: '0.82rem',
                color: 'var(--fg)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid var(--border)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius)',
                textDecoration: 'none',
              }}
            >
              {t.about.download}
            </a>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: minmax"] {
            grid-template-columns: 1fr !important;
          }
          aside { position: static !important; }
        }
      `}</style>
    </div>
  )
}
