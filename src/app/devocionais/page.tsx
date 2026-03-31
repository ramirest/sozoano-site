import type { Metadata } from "next";
import { getMdxDevocionais } from "@/lib/mdx";
import { getDevocionaisFromDb } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Devocionais",
  description: "Devocionais diários do universo Sozoano com conteúdo em MDX e MongoDB.",
};

export default async function DevocionaisPage() {
  const [mdxEntries, mongoEntries] = await Promise.all([getMdxDevocionais(), getDevocionaisFromDb()]);

  const feed = [
    ...mdxEntries.map((entry) => ({ ...entry, source: "MDX" })),
    ...mongoEntries.map((entry) => ({
      slug: String(entry.slug),
      title: String(entry.title),
      excerpt: String(entry.excerpt),
      date: new Date(entry.date).toISOString(),
      content: String(entry.content),
      tags: entry.tags || [],
      source: "MongoDB",
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Alimento diário</p>
      <h1 className="mt-2 font-heading text-5xl">Devocionais Sozoano</h1>
      <p className="mt-4 text-foreground/80">
        Um feed diário para aquecer o coração, alinhar a mente e reacender sua esperança no meio da rotina.
      </p>

      <div className="mt-10 grid gap-4">
        {feed.map((entry) => (
          <article key={`${entry.source}-${entry.slug}`} className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{entry.source}</p>
            <h2 className="mt-2 font-heading text-3xl">{entry.title}</h2>
            <p className="mt-2 text-sm text-foreground/70">{new Date(entry.date).toLocaleDateString("pt-BR")}</p>
            <p className="mt-4 text-foreground/85">{entry.excerpt}</p>
            <p className="mt-3 line-clamp-2 text-sm text-foreground/70">{entry.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
