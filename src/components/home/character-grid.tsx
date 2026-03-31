import Link from "next/link";
import { Flame } from "lucide-react";
import { getCharacters } from "@/lib/repositories";

export async function CharacterGrid() {
  const characters = await getCharacters();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent">Capítulos vivos</p>
          <h2 className="font-heading text-4xl text-foreground">Personagens que Deus usou</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((character) => (
          <Link
            key={String(character.slug)}
            href={`/personagens/${String(character.slug)}`}
            className="group rounded-2xl border border-primary/20 bg-secondary/30 p-6 transition hover:-translate-y-1 hover:border-primary/60"
          >
            <div className="mb-3 inline-flex rounded-full bg-primary/20 p-2 text-primary">
              <Flame className="size-4" />
            </div>
            <h3 className="font-heading text-2xl">{String(character.name)}</h3>
            <p className="mt-1 text-sm text-accent">{String(character.symbol)}</p>
            <p className="mt-3 text-sm text-foreground/75">{String(character.summary)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
