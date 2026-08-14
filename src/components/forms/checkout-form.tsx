"use client";

import { useActionState, useEffect } from "react";
import { createOrder, type CheckoutState } from "@/actions/checkout";
import { Button } from "@/components/ui/button";

const initialState: CheckoutState = { success: false, message: "" };

const inputClass = "w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-sm";

type Props = {
  productId: string;
  sizes: string[];
  colors: string[];
};

export function CheckoutForm({ productId, sizes, colors }: Props) {
  const [state, formAction, pending] = useActionState(createOrder, initialState);

  useEffect(() => {
    if (state.success && state.invoiceUrl) {
      // Redireciona para a fatura do Asaas (Pix, boleto ou cartão).
      window.location.href = state.invoiceUrl;
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl border border-primary/20 bg-secondary/30 p-6"
    >
      <input type="hidden" name="productId" value={productId} />

      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Nome completo" className={inputClass} />
        <input name="email" type="email" required placeholder="E-mail" className={inputClass} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="cpfCnpj"
          required
          placeholder="CPF (obrigatório para a cobrança)"
          className={inputClass}
        />
        <input name="phone" placeholder="Celular com DDD (opcional)" className={inputClass} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sizes.length ? (
          <label className="space-y-1 text-sm">
            <span className="text-foreground/75">Tamanho</span>
            <select name="size" required className={inputClass}>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {colors.length ? (
          <label className="space-y-1 text-sm">
            <span className="text-foreground/75">Cor</span>
            <select name="color" required className={inputClass}>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">Quantidade</span>
          <input
            name="quantity"
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            className={inputClass}
          />
        </label>
      </div>

      <Button type="submit" disabled={pending} className="w-full md:w-auto">
        {pending ? "Gerando cobrança..." : "Ir para o pagamento"}
      </Button>

      <p className="text-xs text-foreground/65">
        Você será direcionado para o ambiente seguro do Asaas, onde poderá pagar com Pix, boleto ou
        cartão.
      </p>

      {state.message && !state.success ? (
        <p className="text-sm text-rose-300">{state.message}</p>
      ) : null}
      {state.success ? <p className="text-sm text-emerald-300">{state.message}</p> : null}
    </form>
  );
}
