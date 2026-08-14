"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
};

export function FireParticles() {
  // Partículas geradas apenas no cliente para evitar divergência de hidratação
  // (Math.random() no módulo produzia valores diferentes entre servidor e navegador).
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        size: 4 + Math.random() * 10,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute bottom-0 rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -900],
            opacity: [0, 0.8, 0],
            x: [0, particle.id % 2 === 0 ? 35 : -35],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
