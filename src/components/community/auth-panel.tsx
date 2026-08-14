"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthPanel() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (session?.user) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
        <p className="text-sm text-foreground/80">Conectado como</p>
        <p className="font-medium text-primary">{session.user.email}</p>
        {session.user.isAdmin ? (
          <Link
            href="/admin"
            className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            Acessar painel administrativo →
          </Link>
        ) : (
          <p className="mt-2 text-sm text-foreground/75">
            A área exclusiva de membros está quase pronta. Você já entrou na lista VIP.
          </p>
        )}
        <Button className="mt-4 block" variant="outline" onClick={() => signOut()}>
          Sair
        </Button>
      </div>
    );
  }

  const handleCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await signIn("credentials", { email, password, redirect: false });

    setPending(false);

    if (result?.error) {
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-primary/20 bg-secondary/30 p-5">
      <Button className="w-full" onClick={() => signIn("google")}>
        Entrar com Google
      </Button>

      <div className="flex items-center gap-3 text-xs text-foreground/50">
        <span className="h-px flex-1 bg-border" />
        ou
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleCredentials} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Seu e-mail"
          autoComplete="email"
          className="w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-sm"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Sua senha"
          autoComplete="current-password"
          className="w-full rounded-xl border border-primary/30 bg-background/60 px-4 py-3 text-sm"
        />
        <Button type="submit" variant="outline" className="w-full" disabled={pending}>
          {pending ? "Entrando..." : "Entrar com e-mail e senha"}
        </Button>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      </form>
    </div>
  );
}
