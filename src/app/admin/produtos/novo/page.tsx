import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="grid gap-4">
      <h2 className="font-heading text-2xl">Novo produto</h2>
      <ProductForm
        values={{
          id: null,
          title: "",
          description: "",
          price: null,
          image: "",
          category: "camiseta",
          sizes: "P, M, G, GG",
          colors: "",
          checkoutUrl: "",
          active: true,
        }}
      />
    </div>
  );
}
