import type { Metadata } from "next";
import { HeartPulse } from "lucide-react";
import { DiscountForm } from "@/components/forms/discount-form";

export const metadata: Metadata = {
  title: "Quiropraxia e Fisioterapia",
  description:
    "Leitores de Sozoano – O Improvável têm desconto exclusivo nos tratamentos de coluna do Dr. Rogério Márcio Souza de Castro, fisioterapeuta e quiropraxista.",
};

const procedures = [
  {
    name: "Avaliação postural e biomecânica completa",
    description: "Análise detalhada da coluna e da postura para montar seu plano de cuidado.",
  },
  {
    name: "Ajuste quiropráxico da coluna vertebral",
    description: "Técnicas precisas de alinhamento para devolver mobilidade e aliviar dores.",
  },
  {
    name: "Tratamento de hérnia de disco sem cirurgia",
    description: "Protocolos conservadores com formação internacional em métodos de coluna.",
  },
  {
    name: "Descompressão vertebral",
    description: "Alívio da pressão sobre discos e nervos em casos de dor irradiada.",
  },
  {
    name: "Reeducação Postural Global (RPG)",
    description: "Correção de desequilíbrios posturais que alimentam dores crônicas.",
  },
  {
    name: "Liberação miofascial",
    description: "Trabalho profundo de musculatura e fáscia para tensões acumuladas.",
  },
  {
    name: "Fisioterapia ortopédica e traumato-funcional",
    description: "Recuperação de lesões, pós-operatórios e limitações de movimento.",
  },
  {
    name: "Fisioterapia esportiva",
    description: "Cuidado de atletas — a mesma assistência prestada no E.C. Vila Celeste.",
  },
  {
    name: "Tratamento de dores crônicas",
    description: "Lombalgia, cervicalgia, dor ciática e dores de cabeça de origem cervical.",
  },
];

export default function QuiropraxiaPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 md:px-6">
      <article className="rounded-3xl border border-primary/25 bg-secondary/30 p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Cuidado além das páginas</p>
        <h1 className="mt-3 font-heading text-4xl leading-tight md:text-6xl">
          Deus cuida da alma. <span className="golden-text">O Dr. Rogério cuida da coluna.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-foreground/85">
          O autor de Sozoano – O Improvável é fisioterapeuta e quiropraxista com formação
          internacional em métodos de tratamento da coluna vertebral sem cirurgia. E ele decidiu
          estender a mensagem do livro para o corpo: todo leitor que chegar até ele através deste
          site recebe <strong className="text-primary">desconto exclusivo de leitor</strong> em
          qualquer um dos tratamentos abaixo.
        </p>
      </article>

      <article>
        <p className="text-sm uppercase tracking-[0.25em] text-accent">Tratamentos oferecidos</p>
        <h2 className="mt-2 font-heading text-4xl">Como o Dr. Rogério pode te ajudar</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {procedures.map((procedure) => (
            <div
              key={procedure.name}
              className="rounded-2xl border border-primary/20 bg-secondary/30 p-5"
            >
              <div className="mb-3 inline-flex rounded-full bg-primary/20 p-2 text-primary">
                <HeartPulse className="size-4" />
              </div>
              <h3 className="font-heading text-xl">{procedure.name}</h3>
              <p className="mt-2 text-sm text-foreground/75">{procedure.description}</p>
            </div>
          ))}
        </div>
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
