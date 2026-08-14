"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type MenuLink = {
  href: string;
  label: string;
};

type Props = {
  links: MenuLink[];
};

export function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-primary/40 bg-secondary/40 text-foreground"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-primary/20 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 transition hover:bg-secondary/50 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/lancamento"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
            >
              Descubra sua história
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
