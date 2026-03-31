import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lançamento",
  description: "Landing page oficial de lançamento do livro Sozoano – O Improvável.",
};

export default function LancamentoPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 md:px-6">
      <article className="rounded-3xl border border-primary/25 bg-secondary/30 p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Lançamento oficial</p>
        <h1 className="mt-3 font-heading text-5xl md:text-6xl">Sozoano – O Improvável</h1>
        <p className="mt-5 max-w-3xl text-lg text-foreground/85">
          Meu camarada, se você sente que já tentou de tudo e mesmo assim não saiu do lugar, esse livro foi escrito para
          você. É a rota da esperança para quem cansou de se achar pequeno.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://hotmart.com"
            target="_blank"
            rel="noreferrer"
            className="cinematic-glow inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
          >
            Quero garantir por R$ 47,90
          </a>
          <p className="text-sm text-accent">ou 3x no cartão</p>
        </div>
      </article>

      <article className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/20 bg-secondary/30 p-6">
          <h2 className="font-heading text-3xl">O problema</h2>
          <p className="mt-3 text-foreground/80">
            Você ora, trabalha, luta... mas por dentro sente que ficou preso na versão &quot;quase&quot; da sua
            história.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-secondary/30 p-6">
          <h2 className="font-heading text-3xl">A solução</h2>
          <p className="mt-3 text-foreground/80">
            Um convite honesto para reencontrar identidade, coragem e direção espiritual no cotidiano.
          </p>
        </div>
      </article>

      <article className="rounded-2xl border border-primary/20 bg-secondary/30 p-6">
        <h2 className="font-heading text-3xl">Bônus</h2>
        <ul className="mt-3 grid gap-2 text-foreground/80">
          <li>• Devocional &quot;7 dias para reacender o coração&quot;</li>
          <li>• Playlist imersiva de oração e leitura</li>
          <li>• Acesso antecipado à comunidade Sozoano</li>
        </ul>
      </article>

      <article className="rounded-2xl border border-primary/20 bg-secondary/30 p-6">
        <h2 className="font-heading text-3xl">Garantia</h2>
        <p className="mt-3 text-foreground/80">
          Garantia incondicional de 7 dias. Se não tocar seu coração, você pode pedir reembolso simples.
        </p>
      </article>

      <article className="rounded-2xl border border-primary/20 bg-secondary/30 p-6">
        <h2 className="font-heading text-3xl">FAQ</h2>
        <div className="mt-4 space-y-4 text-foreground/80">
          <p>
            <strong>É físico ou digital?</strong> No momento, versão digital imediata com edição física na loja
            oficial.
          </p>
          <p>
            <strong>Tem suporte?</strong> Sim, pelo canal oficial após compra.
          </p>
          <p>
            <strong>Para quem é?</strong> Para quem precisa lembrar que o improvável não é o fim da história.
          </p>
        </div>
      </article>

      <div className="text-center">
        <Link
          href="/minha-historia"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
        >
          Antes de sair, me conta sua história
        </Link>
      </div>
    </section>
  );
}
