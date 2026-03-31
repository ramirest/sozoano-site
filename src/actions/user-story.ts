"use server";

import { revalidatePath } from "next/cache";
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

export async function submitUserStory(
  _prevState: UserStoryState,
  formData: FormData,
): Promise<UserStoryState> {
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
        "Meu camarada, sua história foi recebida com carinho. Ela já está no forno da esperança e pode aparecer em nossos depoimentos após moderação.",
    };
  } catch {
    return {
      success: false,
      message: "Não consegui salvar agora. Respira fundo e tenta novamente daqui a pouco.",
    };
  }
}
