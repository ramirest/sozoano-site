"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo } from "react";
import { buttonVariants } from "@/components/ui/button";

export function BurningBushHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const flameX = useTransform(mouseX, [0, 1], [-40, 40]);
  const flameY = useTransform(mouseY, [0, 1], [-30, 30]);

  const branches = useMemo(
    () => Array.from({ length: 6 }).map((_, i) => ({ id: i, left: 15 + i * 14 })),
    [],
  );

  return (
    <section
      className="relative flex min-h-[88vh] items-center overflow-hidden px-4 py-20 md:px-8"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="relative z-20 space-y-6">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Sozoano – O Improvável
          </motion.p>
          <motion.h1
            className="font-heading text-4xl leading-tight text-foreground md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Você não é improvável.
            <span className="golden-text"> Você é Sozoano.</span>
          </motion.h1>
          <motion.p
            className="max-w-xl text-lg text-foreground/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Meu camarada, chega mais perto. Respira fundo e deixa essa história lembrar sua alma de algo simples:
            Deus ainda chama gente comum para viver capítulos extraordinários.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Link
              href="/lancamento"
              className={`${buttonVariants({ size: "lg" })} cinematic-glow`}
            >
              Descubra sua história
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 h-[420px] rounded-3xl border border-primary/30 bg-secondary/30 p-4 backdrop-blur-sm">
          <motion.div
            className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
            style={{ x: flameX, y: flameY }}
          />

          {branches.map((branch) => (
            <motion.div
              key={branch.id}
              className="absolute bottom-8 h-40 w-1 rounded-full bg-accent/40"
              style={{ left: `${branch.left}%` }}
              animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 + branch.id * 0.2 }}
            />
          ))}

          <motion.div
            className="absolute inset-x-14 bottom-20 h-24 rounded-full bg-primary/60 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.4 }}
          />
        </div>
      </div>
    </section>
  );
}
