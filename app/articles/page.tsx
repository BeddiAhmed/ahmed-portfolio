import Link from 'next/link'
import { getArticles } from '@/lib/articles'

export default function ArticlesPage() {
  const articles = getArticles('en')

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
