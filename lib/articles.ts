import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'
import type { Locale } from './i18n'

const articlesBase = path.join(process.cwd(), 'content/articles')

export type ArticleMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  readTime: number
}

export type Article = ArticleMeta & {
  contentHtml: string
  locale: Locale
}

function localeDir(locale: Locale) {
  return path.join(articlesBase, locale)
}

export function getArticles(locale: Locale = 'en'): ArticleMeta[] {
  const dir = localeDir(locale)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const { data } = matter(fs.readFileSync(path.join(dir, filename), 'utf8'))
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'general',
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime: data.readTime ?? 5,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getAllArticleSlugs(): string[] {
  const dir = localeDir('en')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export async function getArticle(slug: string, locale: Locale = 'en'): Promise<Article | null> {
  let filepath = path.join(localeDir(locale), `${slug}.md`)
  let resolvedLocale = locale

  if (!fs.existsSync(filepath)) {
    filepath = path.join(localeDir('en'), `${slug}.md`)
    resolvedLocale = 'en'
    if (!fs.existsSync(filepath)) return null
  }

  const { data, content } = matter(fs.readFileSync(filepath, 'utf8'))
  const processed = await remark().use(remarkGfm).use(html).process(content)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    category: data.category ?? 'general',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: data.readTime ?? 5,
    locale: resolvedLocale,
    contentHtml: processed.toString(),
  }
}

export function articleExistsForLocale(slug: string, locale: Locale): boolean {
  return fs.existsSync(path.join(localeDir(locale), `${slug}.md`))
}
