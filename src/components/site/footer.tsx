import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-secondary/20">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <h3 className="font-heading text-2xl golden-text">Sozoano – O Improvável</h3>
          <p className="mt-2 max-w-lg text-sm text-foreground/75">
            Esta casa foi feita para lembrar você de uma verdade: Deus transforma o improvável em extraordinário.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm md:justify-items-end">
          <Link href="/sobre-o-livro" className="hover:text-primary">
            Sobre o Livro
          </Link>
          <Link href="/minha-historia" className="hover:text-primary">
            Minha História
          </Link>
          <Link href="/devocionais" className="hover:text-primary">
            Devocionais
          </Link>
          <Link href="/comunidade" className="hover:text-primary">
            Comunidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
