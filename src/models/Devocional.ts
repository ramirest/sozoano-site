import { model, models, Schema } from "mongoose";

export interface DevocionalDocument {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  tags: string[];
  published: boolean;
}

const devocionalSchema = new Schema<DevocionalDocument>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Devocional = models.Devocional || model<DevocionalDocument>("Devocional", devocionalSchema);
