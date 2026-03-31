"use client";

import { useActionState } from "react";
import { submitUserStory, type UserStoryState } from "@/actions/user-story";
import { Button } from "@/components/ui/button";

const initialState: UserStoryState = {
  success: false,
  message: "",
};

export function StoryForm() {
  const [state, formAction, pending] = useActionState(submitUserStory, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-3xl border border-primary/20 bg-secondary/30 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Seu nome"
          className="rounded-xl border border-primary/30 bg-background/60 px-4 py-3"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Seu e-mail"
          className="rounded-xl border border-primary/30 bg-background/60 px-4 py-3"
        />
      </div>
      <input
        name="title"
        required
        placeholder="Título da sua história"
        className="w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3"
      />
      <textarea
        name="story"
        required
        rows={7}
        placeholder="Me conta, meu camarada: qual improvável Deus começou a transformar em você?"
        className="w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3"
      />
      <label className="flex items-center gap-2 text-sm text-foreground/85">
        <input type="checkbox" name="consentPublic" defaultChecked />
        Autorizo publicar meu depoimento após moderação.
      </label>

      <Button type="submit" disabled={pending} className="w-full md:w-auto">
        {pending ? "Enviando..." : "Compartilhar minha história"}
      </Button>

      {state.message ? (
        <p className={`text-sm ${state.success ? "text-emerald-300" : "text-rose-300"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
