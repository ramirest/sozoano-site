import {
  createTestimonial,
  deleteTestimonial,
  toggleTestimonialApproved,
  toggleTestimonialFeatured,
} from "@/actions/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export const dynamic = "force-dynamic";

const actionButton =
  "rounded-lg border border-primary/30 px-3 py-1.5 text-xs transition hover:border-primary/70 hover:text-primary";

const inputClass = "w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-sm";

export default async function AdminTestimonialsPage() {
  await connectToDatabase();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).limit(100).lean();

  return (
    <div className="grid gap-6">
      <form
        action={createTestimonial}
        className="space-y-3 rounded-2xl border border-primary/20 bg-secondary/30 p-5"
      >
        <h2 className="font-heading text-2xl">Adicionar depoimento</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input name="name" required placeholder="Nome" className={inputClass} />
          <input name="city" placeholder="Cidade (opcional)" className={inputClass} />
        </div>
        <textarea name="message" required rows={3} placeholder="Mensagem" className={inputClass} />
        <button type="submit" className={actionButton}>
          Salvar depoimento
        </button>
      </form>

      {testimonials.length === 0 ? (
        <p className="rounded-2xl border border-primary/20 bg-secondary/30 p-6 text-sm text-foreground/75">
          Nenhum depoimento cadastrado.
        </p>
      ) : (
        testimonials.map((testimonial) => {
          const id = String(testimonial._id);

          return (
            <article key={id} className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-primary">
                  {String(testimonial.name)}
                  {testimonial.city ? (
                    <span className="text-foreground/60"> · {String(testimonial.city)}</span>
                  ) : null}
                </p>
                <div className="flex gap-2 text-xs">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      testimonial.approved
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {testimonial.approved ? "Visível na home" : "Oculto"}
                  </span>
                  {testimonial.featured ? (
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
                      Destaque
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mt-3 text-sm text-foreground/85">{String(testimonial.message)}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <form action={toggleTestimonialApproved.bind(null, id)}>
                  <button type="submit" className={actionButton}>
                    {testimonial.approved ? "Ocultar da home" : "Exibir na home"}
                  </button>
                </form>
                <form action={toggleTestimonialFeatured.bind(null, id)}>
                  <button type="submit" className={actionButton}>
                    {testimonial.featured ? "Remover destaque" : "Marcar destaque"}
                  </button>
                </form>
                <form action={deleteTestimonial.bind(null, id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-rose-400/40 px-3 py-1.5 text-xs text-rose-300 transition hover:border-rose-400"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}
