"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Lançamento oficial do livro: 15/09/2026 (horário de Brasília).
const LAUNCH_DATE = new Date("2026-09-15T00:00:00-03:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeTimeLeft(): TimeLeft | null {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

type Props = {
  showCta?: boolean;
};

export function LaunchCountdown({ showCta = false }: Props) {
  // null antes da montagem evita divergência de hidratação com o relógio do servidor.
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(computeTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (mounted && !timeLeft) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-secondary/40 p-6 text-center cinematic-glow">
        <p className="font-heading text-3xl golden-text">O Improvável já está entre nós!</p>
        {showCta ? (
          <Link
            href="/lancamento"
            className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
          >
            Garanta o seu exemplar
          </Link>
        ) : null}
      </div>
    );
  }

  const cells = [
    { label: "dias", value: timeLeft?.days },
    { label: "horas", value: timeLeft?.hours },
    { label: "min", value: timeLeft?.minutes },
    { label: "seg", value: timeLeft?.seconds },
  ];

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-accent">
        Lançamento em 15 de setembro
      </p>
      <div className="mt-3 flex gap-3">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="flex min-w-[68px] flex-col items-center rounded-xl border border-primary/30 bg-secondary/40 px-3 py-2"
          >
            <span className="font-heading text-3xl text-primary tabular-nums">
              {cell.value !== undefined ? String(cell.value).padStart(2, "0") : "--"}
            </span>
            <span className="text-xs uppercase tracking-wider text-foreground/60">
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
