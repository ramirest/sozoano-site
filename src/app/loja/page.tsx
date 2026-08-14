import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Loja",
  description: "Vitrine oficial de produtos físicos Sozoano.",
};

const buyButtonClass =
  "inline-flex h-8 w-full items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/85";

export default async function LojaPage() {
  const products = await getProducts();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <h1 className="font-heading text-5xl">Loja Sozoano</h1>
      <p className="mt-3 text-foreground/80">
        Escolha itens que carregam a mensagem do improvável em cada detalhe.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const id = product._id ? String(product._id) : null;
          const externalCheckout = product.checkoutUrl ? String(product.checkoutUrl) : null;

          return (
            <article
              key={String(product.slug || product.title)}
              className="flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-secondary/30"
            >
              <div className="relative h-56">
                <Image
                  src={String(product.image)}
                  alt={String(product.title)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h2 className="font-heading text-3xl">{String(product.title)}</h2>
                <p className="flex-1 text-sm text-foreground/75">{String(product.description)}</p>
                <p className="text-lg text-primary">
                  R$ {Number(product.price).toFixed(2).replace(".", ",")}
                </p>
                {id ? (
                  <Link href={`/checkout/${id}`} className={buyButtonClass}>
                    Comprar agora
                  </Link>
                ) : externalCheckout ? (
                  <a
                    href={externalCheckout}
                    target="_blank"
                    rel="noreferrer"
                    className={buyButtonClass}
                  >
                    Comprar agora
                  </a>
                ) : (
                  <span className="inline-flex h-8 w-full items-center justify-center rounded-lg border border-primary/30 text-sm text-foreground/60">
                    Em breve
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
