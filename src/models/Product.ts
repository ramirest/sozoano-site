import { model, models, Schema } from "mongoose";

export interface ProductDocument {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  checkoutUrl?: string;
  active: boolean;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, default: "outro" },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    // Link externo legado; com o checkout Asaas interno ele é opcional.
    checkoutUrl: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = models.Product || model<ProductDocument>("Product", productSchema);
