import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra na loja oficial Sozoano.",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CheckoutPage({ params }: Props) {
  const { id } = await params;

  await connectToDatabase();
  const product = await Product.findById(id).lean().catch(() => null);

  if (!product || !product.active) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Loja Sozoano</p>
      <h1 className="mt-2 font-heading text-4xl md:text-5xl">Finalizar compra</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[320px_1fr]">
        <article className="h-fit overflow-hidden rounded-2xl border border-primary/20 bg-secondary/30">
          <div className="relative h-64">
            <Image
              src={String(product.image)}
              alt={String(product.title)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              unoptimized
            />
          </div>
          <div className="space-y-2 p-5">
            <h2 className="font-heading text-2xl">{String(product.title)}</h2>
            <p className="text-sm text-foreground/75">{String(product.description)}</p>
            <p className="text-lg text-primary">
              R$ {Number(product.price).toFixed(2).replace(".", ",")}
            </p>
          </div>
        </article>

        <CheckoutForm
          productId={String(product._id)}
          sizes={(product.sizes || []).map(String)}
          colors={(product.colors || []).map(String)}
        />
      </div>
    </section>
  );
}
