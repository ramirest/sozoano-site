import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const adminLinks = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/historias", label: "Histórias" },
  { href: "/admin/depoimentos", label: "Depoimentos" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/descontos", label: "Descontos" },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/comunidade");
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-accent">Painel administrativo</p>
      <h1 className="mt-1 font-heading text-4xl">Gestão Sozoano</h1>

      <nav className="mt-6 flex flex-wrap gap-2">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-primary/25 bg-secondary/30 px-3 py-1.5 text-sm transition hover:border-primary/60 hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">{children}</div>
    </section>
  );
}
