import type { Metadata } from "next";
import { ChapterIndex } from "@/components/book/chapter-index";

export const metadata: Metadata = {
  title: "Sobre o Livro",
  description: "Conheça os 12 capítulos de Sozoano – O Improvável com sumário interativo.",
};

const chapters = [
  {
    number: 1,
    title: "A Origem do Improvável",
    excerpt:
      "Este capítulo abre a jornada mostrando que o improvável, sob a ótica da fé, não é acidente: é chamado. O texto apresenta a ideia de pessoas comuns que, mesmo sem todas as cartas na manga, tornam-se instrumentos poderosos nas mãos de Deus.",
  },
  {
    number: 2,
    title: "Moisés – O Hesitante Líder",
    excerpt:
      "A história começa em dualidade: opressão e privilégio. Do berço de juncos aos corredores do palácio, Moisés carrega o peso de duas origens e o conflito de identidade que o prepara para liderar.",
  },
  {
    number: 3,
    title: "Gideão – O Guerreiro Relutante",
    excerpt:
      "Em meio ao medo de Israel e à opressão dos midianitas, Deus chama alguém improvável: um homem inseguro, escondido na rotina. O capítulo mostra como um encontro transforma fraqueza em coragem obediente.",
  },
  {
    number: 4,
    title: "Davi – O Pastor do Último",
    excerpt:
      "Enquanto os mais fortes são notados, o caçula está no campo, entre ovelhas e anonimato. A narrativa revela que Deus não escolhe pela aparência, mas pelo coração disposto.",
  },
  {
    number: 5,
    title: "Rute – A Estrangeira Redentora",
    excerpt:
      "A lealdade de Rute atravessa dor, luto e incerteza. Sua decisão de permanecer com Noemi torna-se um testemunho de amor firme e de esperança que nasce justamente nos cenários mais difíceis.",
  },
  {
    number: 6,
    title: "Zaqueu – O Pecador Transformado",
    excerpt:
      "Zaqueu vive o peso da rejeição social em Jericó, dividido entre ambição e vazio interior. Este trecho convida o leitor a observar como o encontro com Jesus redefine identidade e destino.",
  },
  {
    number: 7,
    title: "Maria – A Mãe de Jesus",
    excerpt:
      "Em Nazaré, entre simplicidade, expectativas rígidas e opressão romana, Maria recebe um chamado que muda a história. O capítulo desperta a curiosidade para a coragem silenciosa de uma jovem diante do impossível.",
  },
  {
    number: 8,
    title: "Paulo – O Perseguidor Convertido",
    excerpt:
      "Saulo de Tarso surge como defensor fervoroso da tradição, convicto de sua missão contra os cristãos. A narrativa conduz o leitor ao ponto de ruptura onde convicção, queda e graça se encontram.",
  },
  {
    number: 9,
    title: "Ester – A Rainha Corajosa",
    excerpt:
      "Antes do trono, há uma história de origem humilde, identidade preservada e formação em meio à adversidade. O capítulo mostra como fé e discernimento podem reposicionar uma vida inteira para salvar muitos.",
  },
  {
    number: 10,
    title: "Pedro – O Discípulo Imperfeito",
    excerpt:
      "Da rotina simples de pescador às águas incertas da fé, Pedro carrega impulsos, quedas e recomeços. Este capítulo aproxima o leitor de um discípulo real: humano, intenso e profundamente transformado.",
  },
  {
    number: 11,
    title: "As Mulheres no Ministério",
    excerpt:
      "A presença feminina nas Escrituras é apresentada como força que abre caminhos e desafia padrões. Das matriarcas às líderes corajosas, o capítulo amplia a visão do leitor sobre vocação, serviço e legado.",
  },
  {
    number: 12,
    title: "A Esperança do Improvável",
    excerpt:
      "O fechamento revisita as histórias anteriores para reafirmar uma verdade: Deus continua escrevendo com pessoas improváveis. É um convite final para transformar dúvida em resposta e caminhada em propósito.",
  },
];

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
