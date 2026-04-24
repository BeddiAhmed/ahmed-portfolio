import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDir = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

export function getArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(articlesDir, filename), "utf8"));
      return { slug, title: data.title ?? slug, date: data.date ?? "" };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filepath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const { data, content } = matter(fs.readFileSync(filepath, "utf8"));
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    contentHtml: processed.toString(),
  };
}
