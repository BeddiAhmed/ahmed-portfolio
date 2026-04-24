'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { locales, localeNames } from '@/lib/i18n'
import type { Messages } from '@/lib/i18n'

type Props = {
  locale: Locale
  t: Messages['nav']
}

export default function Navbar({ locale, t }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  const navLinks = [
    { href: `/${locale}`, label: t.home, exact: true },
    { href: `/${locale}/articles`, label: t.articles, exact: false },
    { href: `/${locale}/projects`, label: t.projects, exact: false },
    { href: `/${locale}/about`, label: t.about, exact: false },
  ]

  const isNavActive = (href: string, exact: boolean) =>
    exact ? pathname === href : isActive(href)

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,9,7,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--fg)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          Ahmed Beddi
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flex: 1,
          }}
          className="hidden-mobile"
        >
          {navLinks.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                textDecoration: 'none',
                color: isNavActive(href, exact) ? 'var(--fg)' : 'var(--fg-2)',
                background: isNavActive(href, exact)
                  ? 'rgba(255,255,255,0.07)'
                  : 'transparent',
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Language switcher */}
        <div style={{ display: 'flex', gap: '0.1rem', flexShrink: 0 }}>
          {locales.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}`}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.78rem',
                fontWeight: loc === locale ? 600 : 400,
                textDecoration: 'none',
                color: loc === locale ? 'var(--accent)' : 'var(--fg-3)',
                background:
                  loc === locale ? 'rgba(201,166,96,0.12)' : 'transparent',
                border:
                  loc === locale
                    ? '1px solid rgba(201,166,96,0.25)'
                    : '1px solid transparent',
                transition: 'all 0.15s',
                letterSpacing: '0.02em',
              }}
            >
              {loc.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--fg)',
            cursor: 'pointer',
            padding: '0.4rem',
            display: 'none',
          }}
          className="show-mobile"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '0.75rem 1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.95rem',
                textDecoration: 'none',
                color: isActive(href) ? 'var(--fg)' : 'var(--fg-2)',
                background: isActive(href)
                  ? 'rgba(255,255,255,0.07)'
                  : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border)',
              marginTop: '0.25rem',
            }}
          >
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                style={{
                  padding: '0.3rem 0.7rem',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.82rem',
                  fontWeight: loc === locale ? 600 : 400,
                  textDecoration: 'none',
                  color: loc === locale ? 'var(--accent)' : 'var(--fg-3)',
                  background:
                    loc === locale ? 'rgba(201,166,96,0.12)' : 'transparent',
                }}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
