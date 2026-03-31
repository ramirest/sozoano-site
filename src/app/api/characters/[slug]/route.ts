import { NextResponse } from "next/server";
import { getCharacterBySlug } from "@/lib/repositories";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: Context) {
  const { slug } = await context.params;
  const character = await getCharacterBySlug(slug);

  if (!character) {
    return NextResponse.json({ error: "Personagem não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ character });
}
