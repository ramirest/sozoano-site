"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthPanel() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
        <p className="text-sm text-foreground/80">Conectado como</p>
        <p className="font-medium text-primary">{session.user.email}</p>
        <p className="mt-2 text-sm text-foreground/75">
          A área exclusiva de membros está quase pronta. Você já entrou na lista VIP.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => signOut()}>
          Sair
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-primary/20 bg-secondary/30 p-5">
      <Button className="w-full" onClick={() => signIn("google")}>
        Entrar com Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("credentials", { email: "admin@sozoano.com", password: "123456" })}
      >
        Login de teste (Credentials)
      </Button>
      <p className="text-xs text-foreground/65">Ajuste as credenciais no `.env` para produção.</p>
    </div>
  );
}
