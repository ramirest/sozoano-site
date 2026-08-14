import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxDevocionais, getMdxDevocionalBySlug } from "@/lib/mdx";
import { connectToDatabase } from "@/lib/mongodb";
import { Devocional } from "@/models/Devocional";

type Props = {
  params: Promise<{ slug: string }>;
};

type DevocionalView = {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
};

async function getDevocional(slug: string): Promise<DevocionalView | null> {
  const mdxEntry = await getMdxDevocionalBySlug(slug);
  if (mdxEntry) {
    return {
      title: mdxEntry.title,
      excerpt: mdxEntry.excerpt,
      date: mdxEntry.date,
      tags: mdxEntry.tags,
      content: mdxEntry.content,
    };
  }

  try {
    await connectToDatabase();
    const entry = await Devocional.findOne({ slug, published: true }).lean();
    if (!entry) return null;

    return {
      title: String(entry.title),
      excerpt: String(entry.excerpt),
      date: new Date(entry.date).toISOString(),
      tags: (entry.tags || []).map(String),
      content: String(entry.content),
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const devocionais = await getMdxDevocionais();
  return devocionais.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const devocional = await getDevocional(slug);

  if (!devocional) {
    return { title: "Devocional não encontrado" };
  }

  return {
    title: devocional.title,
    description: devocional.excerpt,
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-8 font-heading text-3xl text-foreground" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 font-heading text-2xl text-foreground" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-4 text-lg leading-relaxed text-foreground/85" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-4 rounded-xl border-l-4 border-primary/60 bg-primary/10 p-4 text-foreground/90"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="text-primary" {...props} />
  ),
};

export default async function DevocionalPage({ params }: Props) {
  const { slug } = await params;
  const devocional = await getDevocional(slug);

  if (!devocional) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6">
      <Link
        href="/devocionais"
        className="text-sm text-accent underline-offset-4 hover:underline"
      >
        ← Todos os devocionais
      </Link>

      <p className="mt-6 text-sm uppercase tracking-[0.25em] text-accent">Devocional</p>
      <h1 className="mt-2 font-heading text-4xl leading-tight md:text-5xl">{devocional.title}</h1>
      <p className="mt-3 text-sm text-foreground/70">
        {new Date(devocional.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      {devocional.tags.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {devocional.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-8">
        <MDXRemote source={devocional.content} components={mdxComponents} />
      </div>

      <div className="mt-12 rounded-2xl border border-primary/20 bg-secondary/30 p-6 text-center">
        <p className="font-heading text-2xl">Essa palavra tocou você?</p>
        <Link
          href="/minha-historia"
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
        >
          Compartilhe sua história
        </Link>
      </div>
    </article>
  );
}
