import Link from "next/link";
import { getArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
