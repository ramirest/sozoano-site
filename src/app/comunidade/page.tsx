import type { Metadata } from "next";
import { AuthPanel } from "@/components/community/auth-panel";

export const metadata: Metadata = {
  title: "Comunidade",
  description: "Entre para a comunidade Sozoano no WhatsApp/Telegram e prepare-se para a área de membros.",
};

export default function ComunidadePage() {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-16 md:grid-cols-2 md:px-6">
      <article className="rounded-2xl border border-primary/20 bg-secondary/30 p-6">
        <h1 className="font-heading text-5xl">Comunidade Sozoano</h1>
        <p className="mt-4 text-foreground/80">
          Meu camarada, você não precisa caminhar sozinho. A comunidade é o lugar onde fé, amizade e propósito se
          encontram todos os dias.
        </p>

        <div className="mt-6 space-y-3 text-sm">
          <a className="block rounded-xl border border-primary/25 p-3 hover:border-primary/55" href="https://wa.me/5500000000000">
            Entrar no WhatsApp oficial
          </a>
          <a className="block rounded-xl border border-primary/25 p-3 hover:border-primary/55" href="https://t.me/sozoano">
            Entrar no Telegram oficial
          </a>
        </div>
      </article>

      <AuthPanel />
    </section>
  );
}
