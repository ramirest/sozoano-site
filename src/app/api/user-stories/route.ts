import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { getPublicStories } from "@/lib/repositories";
import { UserStory } from "@/models/UserStory";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  title: z.string().min(5),
  story: z.string().min(30),
  consentPublic: z.boolean().default(true),
});

export async function GET() {
  const stories = await getPublicStories();
  return NextResponse.json({ stories });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  await connectToDatabase();
  const story = await UserStory.create({ ...parsed.data, approved: false });

  return NextResponse.json({ story }, { status: 201 });
}
