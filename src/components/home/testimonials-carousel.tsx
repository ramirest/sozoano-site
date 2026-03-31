"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  name: string;
  city?: string;
  message: string;
};

type Props = {
  items: Testimonial[];
};

export function TestimonialsCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4800);

    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[index];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-20 md:px-6">
      <h2 className="mb-10 text-center font-heading text-4xl">Depoimentos da Jornada</h2>
      <motion.article
        key={`${current.name}-${index}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-primary/30 bg-secondary/40 p-8 text-center cinematic-glow"
      >
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground/90">“{current.message}”</p>
        <p className="mt-5 text-sm text-accent">
          {current.name}
          {current.city ? ` • ${current.city}` : ""}
        </p>
      </motion.article>
    </section>
  );
}
