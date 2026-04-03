import Image from "next/image";

type AuthorSectionProps = {
  variant?: "author" | "improvavel";
};

export function AuthorSection({ variant = "author" }: AuthorSectionProps) {
  const isImprovavel = variant === "improvavel";

  return (
    <section className="mx-auto mt-14 w-full max-w-5xl px-4 pb-16 md:px-6">
      <article className="rounded-3xl border border-primary/20 bg-secondary/30 p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-accent">
          {isImprovavel ? "O Improvável" : "Sobre o Autor"}
        </p>

        <div className="mt-5 grid gap-6 md:grid-cols-[280px_1fr] md:items-start">
          <div className="overflow-hidden rounded-2xl border border-primary/20">
            <Image
              src="/images/rogerio-marcio-souza-de-castro-autor-sozoano.jpg"
              alt="Dr. Rogério Márcio Souza de Castro"
              width={755}
              height={1041}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4 text-foreground/85">
            {isImprovavel ? (
              <>
                <p>
                  O livro <strong className="text-primary">Sozoano – O Improvável</strong> nasceu de uma faísca.
                </p>
                <p>
                  Daquela sensação de que, muitas vezes, nos vemos como &quot;menos&quot; do que somos. Que a vida, Deus, sei
                  lá, parece ter escolhido os outros. Mas e se eu te dissesse que a história é bem diferente? Que a
                  Bíblia, essa fonte inesgotável de histórias, está repleta de pessoas... improváveis.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong className="text-primary">Dr. Rogério Márcio Souza de Castro</strong> é natural da cidade de
                  Dom Cavati, Minas Gerais, e filho da professora de Português e Francês Hilda Souza de Castro (in
                  memoriam) e de Ayrthon Dias de Castro, desportista e presidente do E.C. Vila Celeste há mais de 50
                  anos, em Ipatinga.
                </p>
                <p>
                  Dr. Rogério também foi coordenador da Atenção Básica do município de Ipatinga, na gestão de 2004 a
                  2008.
                </p>

                <p>
                  Fisioterapeuta e quiropraxista, formado pela Universidade de Alfenas (UNIFENAS), possui formação
                  internacional em diversos métodos de tratamento da coluna vertebral sem cirurgia.
                </p>

                <p>
                  Atualmente, acumula os cargos de presidente e fisioterapeuta do E.C. Vila Celeste, onde presta
                  assistência aos atletas do próprio clube.
                </p>
              </>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
