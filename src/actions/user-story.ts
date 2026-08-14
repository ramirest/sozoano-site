"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { UserStory } from "@/models/UserStory";

const userStorySchema = z.object({
  name: z.string().min(2, "Seu nome precisa ter pelo menos 2 caracteres."),
  email: z.string().email("Use um e-mail válido."),
  title: z.string().min(5, "Dê um título para sua jornada."),
  story: z.string().min(30, "Conte um pouco mais da sua história."),
  consentPublic: z.boolean().default(true),
});

export type UserStoryState = {
  success: boolean;
  message: string;
};

// Rate limit simples em memória (por instância) para conter abuso do formulário público.
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    submissionLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionLog.set(ip, recent);
  return false;
}

export async function submitUserStory(
  _prevState: UserStoryState,
  formData: FormData,
): Promise<UserStoryState> {
  // Honeypot: campo invisível para humanos. Preenchido = bot; respondemos sucesso sem gravar.
  if (formData.get("website")) {
    return { success: true, message: "Sua história foi recebida com carinho." };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      message: "Recebemos vários envios seguidos. Respira um pouco e tenta novamente em instantes.",
    };
  }

  const parsed = userStorySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    title: formData.get("title"),
    story: formData.get("story"),
    consentPublic: formData.get("consentPublic") === "on",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Dados inválidos." };
  }

  try {
    await connectToDatabase();
    await UserStory.create({ ...parsed.data, approved: false });
    revalidatePath("/");
    revalidatePath("/minha-historia");
    return {
      success: true,
      message:
        "Sua história foi recebida com carinho. Ela já está no forno da esperança e pode aparecer em nossos depoimentos após moderação.",
    };
  } catch {
    return {
      success: false,
      message: "Não consegui salvar agora. Respira fundo e tenta novamente daqui a pouco.",
    };
  }
}
