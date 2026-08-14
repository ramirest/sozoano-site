import { approveStory, deleteStory, promoteStoryToTestimonial } from "@/actions/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { UserStory } from "@/models/UserStory";

export const dynamic = "force-dynamic";

const actionButton =
  "rounded-lg border border-primary/30 px-3 py-1.5 text-xs transition hover:border-primary/70 hover:text-primary";

export default async function AdminStoriesPage() {
  await connectToDatabase();
  const stories = await UserStory.find({}).sort({ createdAt: -1 }).limit(100).lean();

  if (!stories.length) {
    return (
      <p className="rounded-2xl border border-primary/20 bg-secondary/30 p-6 text-sm text-foreground/75">
        Nenhuma história enviada ainda.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {stories.map((story) => {
        const id = String(story._id);

        return (
          <article key={id} className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-heading text-2xl">{String(story.title)}</h2>
                <p className="text-sm text-foreground/70">
                  {String(story.name)} · {String(story.email)} ·{" "}
                  {story.createdAt ? new Date(story.createdAt).toLocaleDateString("pt-BR") : ""}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  story.approved
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {story.approved ? "Aprovada" : "Pendente"}
              </span>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm text-foreground/85">
              {String(story.story)}
            </p>

            <p className="mt-2 text-xs text-foreground/60">
              {story.consentPublic
                ? "Autorizou publicação após moderação."
                : "NÃO autorizou publicação — uso interno apenas."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {!story.approved ? (
                <form action={approveStory.bind(null, id)}>
                  <button type="submit" className={actionButton}>
                    Aprovar
                  </button>
                </form>
              ) : null}
              {story.consentPublic ? (
                <form action={promoteStoryToTestimonial.bind(null, id)}>
                  <button type="submit" className={actionButton}>
                    Promover a depoimento da home
                  </button>
                </form>
              ) : null}
              <form action={deleteStory.bind(null, id)}>
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
      })}
    </div>
  );
}
