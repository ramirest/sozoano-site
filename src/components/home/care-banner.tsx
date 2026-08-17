import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function CareBanner() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-20 md:px-6">
      <article className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/25 bg-secondary/30 p-8 cinematic-glow">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex rounded-full bg-primary/20 p-2 text-primary">
            <HeartPulse className="size-5" />
          </div>
          <h2 className="font-heading text-3xl">
            O autor também cuida do seu <span className="golden-text">corpo</span>
          </h2>
          <p className="mt-2 text-sm text-foreground/80">
            Dr. Rogério é fisioterapeuta e quiropraxista — coluna, sono e saúde integrativa. Todo
            leitor tem desconto exclusivo nos tratamentos. Gere seu voucher em segundos.
          </p>
        </div>
        <Link
          href="/quiropraxia"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
        >
          Quero meu desconto de leitor
        </Link>
      </article>
    </section>
  );
}
