import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type MdxDevocional = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
};

const contentDir = path.join(process.cwd(), "content", "devocionais");

export async function getMdxDevocionais(): Promise<MdxDevocional[]> {
  try {
    const files = await fs.readdir(contentDir);

    const devocionais = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const raw = await fs.readFile(path.join(contentDir, file), "utf-8");
          const { data, content } = matter(raw);
          return {
            slug: String(data.slug || file.replace(/\.mdx$/, "")),
            title: String(data.title || "Devocional sem título"),
            excerpt: String(data.excerpt || ""),
            date: String(data.date || new Date().toISOString()),
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
            content,
          };
        }),
    );

    return devocionais.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}
