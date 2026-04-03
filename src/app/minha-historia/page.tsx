import type { Metadata } from "next";
import { StoryForm } from "@/components/forms/story-form";

export const metadata: Metadata = {
  title: "Minha História",
  description: "Compartilhe sua história improvável e inspire outras vidas.",
};

export default function MinhaHistoriaPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Seu testemunho importa</p>
      <h1 className="mt-2 font-heading text-5xl">Minha história improvável</h1>
      <p className="mt-4 text-foreground/80">
        Esse espaço é seu. Fala com sinceridade, sem filtro, com fé e verdade. Sua história pode ser o
        abraço que alguém está pedindo em oração hoje.
      </p>

      <div className="mt-8">
        <StoryForm />
      </div>
    </section>
  );
}
