import { NextResponse } from "next/server";
import { getPublicStories } from "@/lib/repositories";

export const runtime = "nodejs";

// O envio de histórias acontece exclusivamente pela Server Action (com honeypot e
// rate limit). O POST público foi removido por ser uma superfície aberta de abuso.
export async function GET() {
  const stories = await getPublicStories();
  return NextResponse.json({ stories });
}
