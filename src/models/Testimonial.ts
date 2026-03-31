import { model, models, Schema } from "mongoose";

export interface TestimonialDocument {
  name: string;
  city?: string;
  message: string;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
}

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    city: String,
    message: { type: String, required: true },
    approved: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Testimonial = models.Testimonial || model<TestimonialDocument>("Testimonial", testimonialSchema);
