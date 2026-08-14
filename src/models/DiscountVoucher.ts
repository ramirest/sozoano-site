import { model, models, Schema } from "mongoose";

export interface DiscountVoucherDocument {
  name: string;
  email: string;
  phone?: string;
  procedure: string;
  message?: string;
  code: string;
  status: "issued" | "used";
  createdAt?: Date;
}

const discountVoucherSchema = new Schema<DiscountVoucherDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: String,
    procedure: { type: String, required: true },
    message: String,
    code: { type: String, required: true, unique: true },
    status: { type: String, enum: ["issued", "used"], default: "issued" },
  },
  { timestamps: true },
);

export const DiscountVoucher =
  models.DiscountVoucher ||
  model<DiscountVoucherDocument>("DiscountVoucher", discountVoucherSchema);
