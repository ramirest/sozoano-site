import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/repositories";

export const runtime = "nodejs";

export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json({ testimonials });
}
