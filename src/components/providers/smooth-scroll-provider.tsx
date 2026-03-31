"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
