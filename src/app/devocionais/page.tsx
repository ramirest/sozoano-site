import type { Metadata } from "next";
import Link from "next/link";
import { getMdxDevocionais } from "@/lib/mdx";
import { getDevocionaisFromDb } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Devocionais",
  description: "Devocionais diários do universo Sozoano.",
};

export default async function DevocionaisPage() {
  const [mdxEntries, mongoEntries] = await Promise.all([
    getMdxDevocionais(),
    getDevocionaisFromDb(),
  ]);

  const mdxSlugs = new Set(mdxEntries.map((entry) => entry.slug));

  const feed = [
    ...mdxEntries.map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      excerpt: entry.excerpt,
      date: entry.date,
      tags: entry.tags,
    })),
    ...mongoEntries
      .filter((entry) => !mdxSlugs.has(String(entry.slug)))
      .map((entry) => ({
        slug: String(entry.slug),
        title: String(entry.title),
        excerpt: String(entry.excerpt),
        date: new Date(entry.date).toISOString(),
        tags: (entry.tags || []).map(String),
      })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Alimento diário</p>
      <h1 className="mt-2 font-heading text-5xl">Devocionais Sozoano</h1>
      <p className="mt-4 text-foreground/80">
        Um feed diário para aquecer o coração, alinhar a mente e reacender sua esperança no meio da
        rotina.
      </p>

      <div className="mt-10 grid gap-4">
        {feed.map((entry) => (
          <Link
            key={entry.slug}
            href={`/devocionais/${entry.slug}`}
            className="group rounded-2xl border border-primary/20 bg-secondary/30 p-5 transition hover:-translate-y-0.5 hover:border-primary/60"
          >
            <h2 className="font-heading text-3xl group-hover:text-primary">{entry.title}</h2>
            <p className="mt-2 text-sm text-foreground/70">
              {new Date(entry.date).toLocaleDateString("pt-BR")}
            </p>
            <p className="mt-4 text-foreground/85">{entry.excerpt}</p>
            <p className="mt-3 text-sm text-accent">Ler devocional completo →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
