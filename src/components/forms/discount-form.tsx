"use client";

import { useActionState } from "react";
import { requestDiscount, type DiscountState } from "@/actions/discount";
import { Button } from "@/components/ui/button";

const initialState: DiscountState = { success: false, message: "" };

const inputClass = "w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-sm";

type Props = {
  procedures: string[];
};

export function DiscountForm({ procedures }: Props) {
  const [state, formAction, pending] = useActionState(requestDiscount, initialState);

  if (state.success && state.code) {
    return (
      <div className="rounded-3xl border border-primary/30 bg-secondary/40 p-8 text-center cinematic-glow">
        <p className="text-sm uppercase tracking-[0.25em] text-accent">Seu voucher de leitor</p>
        <p className="mt-4 font-heading text-5xl tracking-wider golden-text">{state.code}</p>
        <p className="mt-4 text-sm text-foreground/80">{state.message}</p>
        <p className="mt-2 text-xs text-foreground/65">
          Guarde este código. A equipe do Dr. Rogério vai validá-lo no primeiro atendimento.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl border border-primary/20 bg-secondary/30 p-6"
    >
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Seu nome" className={inputClass} />
        <input name="email" type="email" required placeholder="Seu e-mail" className={inputClass} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input name="phone" required placeholder="WhatsApp com DDD" className={inputClass} />
        <select name="procedure" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Tratamento de interesse
          </option>
          {procedures.map((procedure) => (
            <option key={procedure} value={procedure}>
              {procedure}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Conte brevemente o que você está sentindo (opcional)"
        className={inputClass}
      />

      <Button type="submit" disabled={pending} className="w-full md:w-auto">
        {pending ? "Gerando voucher..." : "Quero meu desconto de leitor"}
      </Button>

      {state.message && !state.success ? (
        <p className="text-sm text-rose-300">{state.message}</p>
      ) : null}
    </form>
  );
}
