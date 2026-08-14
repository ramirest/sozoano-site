import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  await connectToDatabase();
  const product = await Product.findById(id).lean().catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <h2 className="font-heading text-2xl">Editar produto</h2>
      <ProductForm
        values={{
          id,
          title: String(product.title),
          description: String(product.description),
          price: Number(product.price),
          image: String(product.image),
          category: String(product.category || "outro"),
          sizes: (product.sizes || []).map(String).join(", "),
          colors: (product.colors || []).map(String).join(", "),
          checkoutUrl: product.checkoutUrl ? String(product.checkoutUrl) : "",
          active: Boolean(product.active),
        }}
      />
    </div>
  );
}
