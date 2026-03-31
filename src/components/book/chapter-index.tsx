"use client";

import { useState } from "react";

type Chapter = {
  number: number;
  title: string;
  excerpt: string;
};

type Props = {
  chapters: Chapter[];
};

export function ChapterIndex({ chapters }: Props) {
  const [openChapter, setOpenChapter] = useState<number>(1);

  return (
    <div className="grid gap-4">
      {chapters.map((chapter) => {
        const isOpen = openChapter === chapter.number;

        return (
          <article key={chapter.number} className="rounded-2xl border border-primary/20 bg-secondary/30 p-5">
            <button
              className="flex w-full items-center justify-between text-left"
              onClick={() => setOpenChapter(chapter.number)}
            >
              <span className="font-heading text-2xl">
                Capítulo {chapter.number}: {chapter.title}
              </span>
              <span className="text-sm text-accent">{isOpen ? "Fechar" : "Ler trecho"}</span>
            </button>
            {isOpen ? <p className="mt-4 text-foreground/80">{chapter.excerpt}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
