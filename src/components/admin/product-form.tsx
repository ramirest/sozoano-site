"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { upsertProduct, type ProductFormState } from "@/actions/admin";
import { Button } from "@/components/ui/button";

const inputClass = "w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-sm";

export type ProductFormValues = {
  id: string | null;
  title: string;
  description: string;
  price: number | null;
  image: string;
  category: string;
  sizes: string;
  colors: string;
  checkoutUrl: string;
  active: boolean;
};

const initialState: ProductFormState = { error: null };

type Props = {
  values: ProductFormValues;
};

export function ProductForm({ values }: Props) {
  const boundAction = upsertProduct.bind(null, values.id);
  const [state, formAction, pending] = useActionState(boundAction, initialState);
  const [imagePreview, setImagePreview] = useState(values.image);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-primary/20 bg-secondary/30 p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">Título</span>
          <input name="title" required defaultValue={values.title} className={inputClass} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">Preço (R$)</span>
          <input
            name="price"
            required
            type="number"
            step="0.01"
            min="0"
            defaultValue={values.price ?? ""}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-foreground/75">Descrição</span>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={values.description}
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-[1fr_180px]">
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">
            Imagem (caminho local, ex.: /images/produtos/polo-classica.jpg, ou URL)
          </span>
          <input
            name="image"
            required
            defaultValue={values.image}
            onChange={(event) => setImagePreview(event.target.value)}
            className={inputClass}
          />
        </label>
        {imagePreview ? (
          <div className="relative h-28 overflow-hidden rounded-xl border border-primary/20">
            <Image
              src={imagePreview}
              alt="Pré-visualização"
              fill
              className="object-cover"
              sizes="180px"
              unoptimized
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">Categoria</span>
          <select name="category" defaultValue={values.category} className={inputClass}>
            <option value="camiseta">Camiseta</option>
            <option value="polo">Polo</option>
            <option value="acessorio">Acessório</option>
            <option value="livro">Livro</option>
            <option value="outro">Outro</option>
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">Tamanhos (separados por vírgula)</span>
          <input
            name="sizes"
            defaultValue={values.sizes}
            placeholder="P, M, G, GG, XG"
            className={inputClass}
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-foreground/75">Cores (separadas por vírgula)</span>
          <input
            name="colors"
            defaultValue={values.colors}
            placeholder="Azul-marinho, Branco, Preto"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-foreground/75">
          Link de checkout externo (opcional — deixe vazio para usar o checkout Asaas do site)
        </span>
        <input name="checkoutUrl" defaultValue={values.checkoutUrl} className={inputClass} />
      </label>

      <label className="flex items-center gap-2 text-sm text-foreground/85">
        <input type="checkbox" name="active" defaultChecked={values.active} />
        Produto ativo (visível na loja)
      </label>

      <Button type="submit" disabled={pending}>
        {pending ? "Salvando..." : values.id ? "Salvar alterações" : "Cadastrar produto"}
      </Button>

      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}
    </form>
  );
}
