import Image from "next/image";
import Link from "next/link";
import { deleteProduct, toggleProductActive } from "@/actions/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

const actionButton =
  "rounded-lg border border-primary/30 px-3 py-1.5 text-xs transition hover:border-primary/70 hover:text-primary";

export default async function AdminProductsPage() {
  await connectToDatabase();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl">Produtos ({products.length})</h2>
        <Link
          href="/admin/produtos/novo"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
        >
          Novo produto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="rounded-2xl border border-primary/20 bg-secondary/30 p-6 text-sm text-foreground/75">
          Nenhum produto cadastrado ainda.
        </p>
      ) : (
        products.map((product) => {
          const id = String(product._id);

          return (
            <article
              key={id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-primary/20 bg-secondary/30 p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-primary/20">
                <Image
                  src={String(product.image)}
                  alt={String(product.title)}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-heading text-xl">{String(product.title)}</p>
                <p className="text-sm text-foreground/70">
                  R$ {Number(product.price).toFixed(2).replace(".", ",")} ·{" "}
                  {String(product.category || "outro")}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  product.active
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {product.active ? "Ativo" : "Inativo"}
              </span>

              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/produtos/${id}`} className={actionButton}>
                  Editar
                </Link>
                <form action={toggleProductActive.bind(null, id)}>
                  <button type="submit" className={actionButton}>
                    {product.active ? "Desativar" : "Ativar"}
                  </button>
                </form>
                <form action={deleteProduct.bind(null, id)}>
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
