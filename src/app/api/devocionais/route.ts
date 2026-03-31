import { NextResponse } from "next/server";
import { getMdxDevocionais } from "@/lib/mdx";
import { getDevocionaisFromDb } from "@/lib/repositories";

export const runtime = "nodejs";

export async function GET() {
  const [mdx, mongo] = await Promise.all([getMdxDevocionais(), getDevocionaisFromDb()]);

  const normalizedMongo = mongo.map((entry) => ({
    slug: String(entry.slug),
    title: String(entry.title),
    excerpt: String(entry.excerpt),
    content: String(entry.content),
    date: new Date(entry.date).toISOString(),
    tags: entry.tags || [],
    source: "mongo",
  }));

  const normalizedMdx = mdx.map((entry) => ({ ...entry, source: "mdx" }));

  const devocionais = [...normalizedMdx, ...normalizedMongo].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  return NextResponse.json({ devocionais });
}
