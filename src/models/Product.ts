import { model, models, Schema } from "mongoose";

export interface ProductDocument {
  title: string;
  description: string;
  price: number;
  image: string;
  checkoutUrl: string;
  active: boolean;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    checkoutUrl: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = models.Product || model<ProductDocument>("Product", productSchema);
