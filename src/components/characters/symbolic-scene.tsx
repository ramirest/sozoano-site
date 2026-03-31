"use client";

import { motion } from "framer-motion";

type Props = {
  symbol: string;
};

export function SymbolicScene({ symbol }: Props) {
  return (
    <div className="relative h-52 overflow-hidden rounded-3xl border border-primary/25 bg-secondary/40">
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-2xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.2 }}
      >
        <p className="font-heading text-3xl golden-text">{symbol}</p>
      </motion.div>
    </div>
  );
}
