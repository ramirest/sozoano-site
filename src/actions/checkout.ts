"use server";

import { z } from "zod";
import {
  createAsaasPayment,
  findOrCreateAsaasCustomer,
  isAsaasConfigured,
} from "@/lib/asaas";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const checkoutSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("Use um e-mail válido."),
  cpfCnpj: z
    .string()
    .min(11, "Informe um CPF válido.")
    .transform((value) => value.replace(/\D/g, "")),
  phone: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  quantity: z.coerce.number().int().min(1).max(10).default(1),
});

export type CheckoutState = {
  success: boolean;
  message: string;
  invoiceUrl?: string;
};

export async function createOrder(
  _prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  if (!isAsaasConfigured()) {
    return {
      success: false,
      message: "Checkout temporariamente indisponível. Tente novamente em breve.",
    };
  }

  const parsed = checkoutSchema.safeParse({
    productId: formData.get("productId"),
    name: formData.get("name"),
    email: formData.get("email"),
    cpfCnpj: formData.get("cpfCnpj"),
    phone: formData.get("phone") || undefined,
    size: formData.get("size") || undefined,
    color: formData.get("color") || undefined,
    quantity: formData.get("quantity") || 1,
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Dados inválidos." };
  }

  try {
    await connectToDatabase();

    const product = await Product.findById(parsed.data.productId).lean();
    if (!product || !product.active) {
      return { success: false, message: "Produto indisponível no momento." };
    }

    const total = Number(product.price) * parsed.data.quantity;

    const order = await Order.create({
      items: [
        {
          productId: String(product._id),
          title: String(product.title),
          price: Number(product.price),
          quantity: parsed.data.quantity,
          size: parsed.data.size,
          color: parsed.data.color,
        },
      ],
      customer: {
        name: parsed.data.name,
        email: parsed.data.email,
        cpfCnpj: parsed.data.cpfCnpj,
        phone: parsed.data.phone,
      },
      total,
      status: "pending",
    });

    const customer = await findOrCreateAsaasCustomer({
      name: parsed.data.name,
      email: parsed.data.email,
      cpfCnpj: parsed.data.cpfCnpj,
      mobilePhone: parsed.data.phone,
    });

    const payment = await createAsaasPayment({
      customerId: customer.id,
      value: total,
      description: `${String(product.title)} x${parsed.data.quantity} – Loja Sozoano`,
      externalReference: String(order._id),
    });

    order.asaasCustomerId = customer.id;
    order.asaasPaymentId = payment.id;
    order.asaasInvoiceUrl = payment.invoiceUrl;
    await order.save();

    return {
      success: true,
      message: "Pedido criado! Você será redirecionado para o pagamento.",
      invoiceUrl: payment.invoiceUrl,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Não consegui criar o pedido. Tente novamente.",
    };
  }
}
