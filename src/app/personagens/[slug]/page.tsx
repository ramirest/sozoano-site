import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SymbolicScene } from "@/components/characters/symbolic-scene";
import { getCharacterBySlug, getCharacters } from "@/lib/repositories";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const characters = await getCharacters();
  return characters.map((character) => ({ slug: String(character.slug) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);

  if (!character) {
    return { title: "Personagem não encontrado" };
  }

  return {
    title: `${String(character.name)} – Personagem`,
    description: String(character.summary),
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Capítulo {String(character.chapter)}</p>
      <h1 className="mt-2 font-heading text-5xl">{String(character.name)}</h1>
      <p className="mt-3 text-xl text-primary">{String(character.title)}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <article className="space-y-5 rounded-3xl border border-primary/20 bg-secondary/30 p-6">
          <p className="text-foreground/90">{String(character.sensoryNarrative)}</p>
          <p className="rounded-xl bg-primary/10 p-4 text-foreground/90">
            <strong className="text-primary">Lição viva:</strong> {String(character.lesson)}
          </p>
          <div className="rounded-xl border border-primary/20 bg-background/40 p-4 text-sm text-foreground/75">
            Áudio narrado (placeholder): em breve você poderá ouvir esse capítulo em uma experiência sonora completa.
          </div>
        </article>

        <div className="space-y-4">
          <SymbolicScene symbol={String(character.symbol)} />
          <Link
            href="/minha-historia"
            className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
          >
            Minha história parecida
          </Link>
        </div>
      </div>
    </section>
  );
}
