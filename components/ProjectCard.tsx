import Link from 'next/link'
import type { Project } from '@/lib/projects'
import type { Messages } from '@/lib/i18n'

type Props = {
  project: Project
  t: Messages['projects']
}

const statusStyle: Record<string, { bg: string; color: string }> = {
  live:       { bg: 'rgba(74,222,128,0.12)', color: '#4ade80' },
  inProgress: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
  archived:   { bg: 'rgba(148,163,184,0.12)', color: '#94a3b8' },
}

const statusLabel = (status: string, t: Messages['projects']) => {
  if (status === 'live') return t.live
  if (status === 'inProgress') return t.inProgress
  return t.archived
}

export default function ProjectCard({ project, t }: Props) {
  const s = statusStyle[project.status] ?? statusStyle.archived

  return (
    <article
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Status badge */}
      <div style={{ marginBottom: '0.85rem' }}>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '0.2rem 0.6rem',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            background: s.bg,
            color: s.color,
          }}
        >
          {statusLabel(project.status, t)}
        </span>
      </div>

      {/* Title + description */}
      <h3
        style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--fg)',
          lineHeight: 1.35,
          marginBottom: '0.55rem',
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--fg-2)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Stack tags */}
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}
      >
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '0.72rem',
              color: 'var(--accent)',
              background: 'rgba(201,166,96,0.1)',
              border: '1px solid rgba(201,166,96,0.2)',
              padding: '0.15rem 0.5rem',
              borderRadius: 4,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {project.dashboardUrl && (
          <Link
            href={project.dashboardUrl}
            style={{
              fontSize: '0.82rem',
              color: 'var(--fg)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
          >
            {t.viewProject}
          </Link>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.82rem',
              color: 'var(--fg-2)',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
            }}
          >
            {t.viewCode}
          </a>
        )}
      </div>
    </article>
  )
}
