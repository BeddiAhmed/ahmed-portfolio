import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import type { Messages } from '@/lib/i18n'

type Props = {
  locale: Locale
  t: Messages['footer']
  nav: Messages['nav']
}

export default function Footer({ locale, t, nav }: Props) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--fg)',
              marginBottom: '0.2rem',
            }}
          >
            Ahmed Beddi
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)' }}>
            {t.description}
          </p>
        </div>

        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { href: `/${locale}`, label: nav.home },
            { href: `/${locale}/articles`, label: nav.articles },
            { href: `/${locale}/projects`, label: nav.projects },
            { href: `/${locale}/about`, label: nav.about },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '0.82rem',
                color: 'var(--fg-3)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <p style={{ fontSize: '0.78rem', color: 'var(--fg-3)' }}>
          © {new Date().getFullYear()} Ahmed Beddi. {t.rights}
        </p>
      </div>
    </footer>
  )
}
