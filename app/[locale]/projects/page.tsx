import ProjectCard from '@/components/ProjectCard'
import { getMessages, isValidLocale, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getProjectsByStatus, getAllProjects } from '@/lib/projects'
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
  return { title: t.projects.title, description: t.projects.subtitle }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const loc = locale as Locale
  const t = getMessages(loc)

  const live       = getProjectsByStatus('live')
  const inProgress = getProjectsByStatus('inProgress')
  const archived   = getProjectsByStatus('archived')

  const Section = ({
    title,
    projects,
  }: {
    title: string
    projects: ReturnType<typeof getAllProjects>
  }) =>
    projects.length === 0 ? null : (
      <section style={{ marginBottom: '3.5rem' }}>
        <h2
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {title}
        </h2>
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
    )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <header style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)', marginBottom: '3rem' }}>
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
          {t.projects.title}
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--fg)',
            lineHeight: 1.2,
          }}
        >
          {t.projects.subtitle}
        </h1>
      </header>

      <Section title={t.projects.liveProjects}       projects={live} />
      <Section title={t.projects.inProgressProjects} projects={inProgress} />
      <Section title={t.projects.archivedProjects}   projects={archived} />
    </div>
  )
}
