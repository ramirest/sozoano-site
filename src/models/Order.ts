import { model, models, Schema } from "mongoose";

export type OrderStatus = "pending" | "paid" | "overdue" | "canceled" | "refunded";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface OrderDocument {
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    cpfCnpj?: string;
    phone?: string;
  };
  total: number;
  status: OrderStatus;
  asaasCustomerId?: string;
  asaasPaymentId?: string;
  asaasInvoiceUrl?: string;
  createdAt?: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        size: String,
        color: String,
      },
    ],
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      cpfCnpj: String,
      phone: String,
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "overdue", "canceled", "refunded"],
      default: "pending",
    },
    asaasCustomerId: String,
    asaasPaymentId: String,
    asaasInvoiceUrl: String,
  },
  { timestamps: true },
);

export const Order = models.Order || model<OrderDocument>("Order", orderSchema);
