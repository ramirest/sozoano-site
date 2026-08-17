import type { Metadata } from "next";
import {
  Activity,
  Apple,
  Droplets,
  Microscope,
  Moon,
  Pill,
  Thermometer,
  Waves,
  Zap,
} from "lucide-react";
import { DiscountForm } from "@/components/forms/discount-form";

export const metadata: Metadata = {
  title: "Quiropraxia e Saúde Integrativa",
  description:
    "Leitores de Sozoano – O Improvável têm desconto exclusivo nos tratamentos do Dr. Rogério Márcio Souza de Castro: quiropraxia instrumental, fisioterapia regenerativa, terapia do sono e práticas integrativas.",
};

const procedures = [
  {
    name: "Polissonografia, Terapia do Sono e Apneia",
    tag: "Sono",
    icon: Moon,
    description:
      "Exame que registra respiração, oxigenação, batimentos e ondas cerebrais durante a noite para investigar ronco, insônia e apneia do sono. Com o resultado em mãos, monta-se um plano de terapia do sono para noites mais profundas e reparadoras.",
  },
  {
    name: "Fisioterapia Regenerativa",
    tag: "Reabilitação",
    icon: Activity,
    description:
      "Protocolos que estimulam a capacidade natural de reparo de músculos, tendões e articulações, aliando recursos modernos ao exercício terapêutico. Indicada para lesões, tendinites, artrose e dores crônicas.",
  },
  {
    name: "Quiropraxia Instrumental",
    tag: "Coluna",
    icon: Zap,
    description:
      "Ajustes da coluna realizados com instrumento de precisão que aplica impulsos rápidos e de baixa força — sem os 'estalos' da manipulação manual. Uma alternativa suave, controlada e confortável.",
  },
  {
    name: "Injetáveis Bioativos Termoguiados e Terapia Infravermelho",
    tag: "Integrativa",
    icon: Thermometer,
    description:
      "A termografia infravermelha mapeia o calor do corpo e ajuda a localizar focos de tensão e inflamação; nas regiões identificadas aplicam-se compostos bioativos e terapia por infravermelho como apoio ao conforto e à recuperação dos tecidos.",
  },
  {
    name: "Ozonioterapia",
    tag: "Integrativa",
    icon: Droplets,
    description:
      "Aplicação da mistura de oxigênio e ozônio medicinal, autorizada no Brasil pela Lei 14.648/2023 como procedimento de caráter complementar, utilizada como apoio no manejo de dores e processos inflamatórios.",
  },
  {
    name: "Exames de Microscopia",
    tag: "Avaliação",
    icon: Microscope,
    description:
      "Análise de amostras em microscópio como recurso de avaliação e acompanhamento dentro da abordagem integrativa do consultório.",
  },
  {
    name: "Terapia Quântica de Frequências",
    tag: "Integrativa",
    icon: Waves,
    description:
      "Prática integrativa que utiliza estímulos de frequência buscando equilíbrio físico, mental e emocional — dentro da visão de cuidado do ser como um todo: corpo, mente e espírito.",
  },
  {
    name: "Nutrição Clínica com Abordagem Quântica",
    tag: "Nutrição",
    icon: Apple,
    description:
      "Acompanhamento nutricional individualizado com visão integrativa, unindo alimentação, hábitos e bem-estar como parte do plano de cuidado.",
  },
  {
    name: "Nutracêuticos Frequenciados",
    tag: "Nutrição",
    icon: Pill,
    description:
      "Suplementos de origem natural com propriedades nutricionais, selecionados dentro da abordagem integrativa como apoio à vitalidade e ao equilíbrio do organismo.",
  },
];

export default function QuiropraxiaPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 md:px-6">
      <article className="rounded-3xl border border-primary/25 bg-secondary/30 p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Cuidado além das páginas</p>
        <h1 className="mt-3 font-heading text-4xl leading-tight md:text-6xl">
          Deus cuida da alma. <span className="golden-text">O Dr. Rogério cuida do corpo.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-foreground/85">
          O autor de Sozoano – O Improvável é fisioterapeuta e quiropraxista, com atuação que une o
          cuidado da coluna, a qualidade do sono e práticas de saúde integrativa. E ele decidiu
          estender a mensagem do livro para o corpo: todo leitor que chegar até ele através deste
          site recebe <strong className="text-primary">desconto exclusivo de leitor</strong> em
          qualquer um dos tratamentos abaixo.
        </p>
      </article>

      <article>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">Tratamentos oferecidos</p>
        <h2 className="mt-2 font-heading text-4xl">Como o Dr. Rogério pode te ajudar</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {procedures.map((procedure) => {
            const Icon = procedure.icon;

            return (
              <div
                key={procedure.name}
                className="rounded-2xl border border-primary/20 bg-secondary/30 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-primary/20 p-2 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-wider text-accent">
                    {procedure.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl">{procedure.name}</h3>
                <p className="mt-2 text-sm text-foreground/75">{procedure.description}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 max-w-4xl text-xs text-foreground/60">
          As práticas integrativas e complementares atuam como apoio ao cuidado da saúde e não
          substituem diagnóstico ou tratamento médico convencional. A ozonioterapia é um
          procedimento de caráter complementar, nos termos da Lei nº 14.648/2023.
        </p>
      </article>

      <article id="desconto" className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent">Desconto de leitor</p>
          <h2 className="mt-2 font-heading text-4xl">Garanta sua condição especial</h2>
          <p className="mt-4 text-foreground/80">
            Preencha o formulário e receba na hora o seu voucher de leitor. Apresente o código ao
            agendar sua avaliação e a equipe do Dr. Rogério aplicará o desconto no seu tratamento.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-foreground/75">
            <li>• Voucher gerado na hora, sem custo</li>
            <li>• Válido para todos os tratamentos listados</li>
            <li>• Atendimento em Ipatinga – MG</li>
          </ul>
        </div>

        <DiscountForm procedures={procedures.map((procedure) => procedure.name)} />
      </article>
    </section>
  );
}
