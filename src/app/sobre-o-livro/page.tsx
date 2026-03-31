import type { Metadata } from "next";
import { ChapterIndex } from "@/components/book/chapter-index";

export const metadata: Metadata = {
  title: "Sobre o Livro",
  description: "Conheça os 12 capítulos de Sozoano – O Improvável com sumário interativo.",
};

const chapters = [
  "A chama que não consome",
  "Quando o medo vira missão",
  "No vale, a fé aprende a correr",
  "Lealdade em tempo de escassez",
  "O olhar que chama pelo nome",
  "Mãos cansadas, joelhos firmes",
  "Silêncio que prepara milagres",
  "A mesa no deserto",
  "As lágrimas que regam propósito",
  "Recomeços que ninguém esperava",
  "O céu invade a rotina",
  "Você é Sozoano",
].map((title, index) => ({
  number: index + 1,
  title,
  excerpt:
    "Meu camarada, aqui você sente o cheiro da estrada, escuta a respiração de quem quase desistiu e vê Deus transformando poeira em promessa. Este capítulo é um convite para você se enxergar dentro da narrativa.",
}));

export default function SobreOLivroPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Universo Sozoano</p>
      <h1 className="mt-2 font-heading text-5xl">Sumário Interativo</h1>
      <p className="mt-4 max-w-3xl text-foreground/80">
        Aqui você pode percorrer os 12 capítulos e abrir trechos que antecipam a experiência sensorial do livro.
        Escolha um capítulo e deixa Deus conversar com você no detalhe.
      </p>

      <div className="mt-10">
        <ChapterIndex chapters={chapters} />
      </div>
    </section>
  );
}
