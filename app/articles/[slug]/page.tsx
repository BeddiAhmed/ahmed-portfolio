import { getArticle, getAllArticleSlugs } from '@/lib/articles'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug, 'en')
  if (!article) notFound()

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>{article.title}</h1>
      <div className="prose-article" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </main>
  )
}
