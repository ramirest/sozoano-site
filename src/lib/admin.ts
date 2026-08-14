import { auth } from "@/auth";

// Verificação server-side usada por todas as actions administrativas
// (defesa em profundidade além do redirect do layout /admin).
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    throw new Error("Acesso restrito ao administrador.");
  }

  return session;
}
