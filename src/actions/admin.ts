"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { DiscountVoucher } from "@/models/DiscountVoucher";
import { Order, type OrderStatus } from "@/models/Order";
import { Product } from "@/models/Product";
import { Testimonial } from "@/models/Testimonial";
import { UserStory } from "@/models/UserStory";

function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/loja");
  revalidatePath("/minha-historia");
}

// ---------------------------------------------------------------------------
// Histórias enviadas pelos leitores
// ---------------------------------------------------------------------------

export async function approveStory(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await UserStory.findByIdAndUpdate(id, { approved: true });
  revalidatePublicContent();
  revalidatePath("/admin/historias");
}

export async function deleteStory(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await UserStory.findByIdAndDelete(id);
  revalidatePath("/admin/historias");
}

export async function promoteStoryToTestimonial(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const story = await UserStory.findById(id).lean();
  if (!story) return;

  await Testimonial.create({
    name: String(story.name),
    message: String(story.story).slice(0, 400),
    approved: true,
    featured: false,
  });
  await UserStory.findByIdAndUpdate(id, { approved: true });

  revalidatePublicContent();
  revalidatePath("/admin/historias");
  revalidatePath("/admin/depoimentos");
}

// ---------------------------------------------------------------------------
// Depoimentos exibidos na home
// ---------------------------------------------------------------------------

const testimonialSchema = z.object({
  name: z.string().min(2, "Informe o nome."),
  city: z.string().optional(),
  message: z.string().min(10, "Escreva a mensagem do depoimento."),
});

export async function createTestimonial(formData: FormData) {
  await requireAdmin();

  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    city: formData.get("city") || undefined,
    message: formData.get("message"),
  });
  if (!parsed.success) return;

  await connectToDatabase();
  await Testimonial.create({ ...parsed.data, approved: true, featured: false });

  revalidatePublicContent();
  revalidatePath("/admin/depoimentos");
}

export async function toggleTestimonialApproved(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const testimonial = await Testimonial.findById(id);
  if (!testimonial) return;

  testimonial.approved = !testimonial.approved;
  await testimonial.save();

  revalidatePublicContent();
  revalidatePath("/admin/depoimentos");
}

export async function toggleTestimonialFeatured(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const testimonial = await Testimonial.findById(id);
  if (!testimonial) return;

  testimonial.featured = !testimonial.featured;
  await testimonial.save();

  revalidatePublicContent();
  revalidatePath("/admin/depoimentos");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Testimonial.findByIdAndDelete(id);

  revalidatePublicContent();
  revalidatePath("/admin/depoimentos");
}

// ---------------------------------------------------------------------------
// Produtos da loja
// ---------------------------------------------------------------------------

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const productSchema = z.object({
  title: z.string().min(2, "Informe o título."),
  description: z.string().min(10, "Descreva o produto."),
  price: z.coerce.number().positive("Preço inválido."),
  image: z.string().min(1, "Informe a URL ou caminho da imagem."),
  category: z.string().min(1),
  sizes: z.string().optional(),
  colors: z.string().optional(),
  checkoutUrl: z.string().optional(),
  active: z.boolean(),
});

function splitList(value?: string) {
  return (value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export type ProductFormState = {
  error: string | null;
};

export async function upsertProduct(
  id: string | null,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = productSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    image: formData.get("image"),
    category: formData.get("category") || "outro",
    sizes: formData.get("sizes") || undefined,
    colors: formData.get("colors") || undefined,
    checkoutUrl: formData.get("checkoutUrl") || undefined,
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Dados inválidos." };
  }

  const payload = {
    ...parsed.data,
    sizes: splitList(parsed.data.sizes),
    colors: splitList(parsed.data.colors),
    checkoutUrl: parsed.data.checkoutUrl || undefined,
  };

  try {
    await connectToDatabase();

    if (id) {
      await Product.findByIdAndUpdate(id, payload);
    } else {
      await Product.create({ ...payload, slug: slugify(payload.title) });
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Não foi possível salvar o produto.",
    };
  }

  revalidatePublicContent();
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function toggleProductActive(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const product = await Product.findById(id);
  if (!product) return;

  product.active = !product.active;
  await product.save();

  revalidatePublicContent();
  revalidatePath("/admin/produtos");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await Product.findByIdAndDelete(id);

  revalidatePublicContent();
  revalidatePath("/admin/produtos");
}

// ---------------------------------------------------------------------------
// Vouchers de desconto (quiropraxia)
// ---------------------------------------------------------------------------

export async function markVoucherUsed(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await DiscountVoucher.findByIdAndUpdate(id, { status: "used" });
  revalidatePath("/admin/descontos");
}

export async function deleteVoucher(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await DiscountVoucher.findByIdAndDelete(id);
  revalidatePath("/admin/descontos");
}

// ---------------------------------------------------------------------------
// Pedidos
// ---------------------------------------------------------------------------

const ORDER_STATUSES: OrderStatus[] = ["pending", "paid", "overdue", "canceled", "refunded"];

export async function updateOrderStatus(id: string, status: string) {
  await requireAdmin();

  if (!ORDER_STATUSES.includes(status as OrderStatus)) return;

  await connectToDatabase();
  await Order.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/pedidos");
}
