import { getArticle, getArticles } from "@/lib/articles";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </main>
  );
}
