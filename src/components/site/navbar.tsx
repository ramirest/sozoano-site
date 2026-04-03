import Link from "next/link";
import { Flame } from "lucide-react";
import { ThemeToggle } from "@/components/site/theme-toggle";

const links = [
  { href: "/sobre-o-livro", label: "Sobre o Livro" },
  { href: "/sobre-o-autor", label: "Sobre o autor" },
  { href: "/devocionais", label: "Devocionais" },
  { href: "/loja", label: "Loja" },
  { href: "/lancamento", label: "Lançamento" },
  { href: "/comunidade", label: "Comunidade" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="size-5 text-primary" />
          <span className="font-heading text-lg font-semibold text-foreground">Sozoano</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/lancamento"
            className="hidden h-8 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/85 md:inline-flex"
          >
            Descubra sua história
          </Link>
        </div>
      </div>
    </header>
  );
}
