"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { FireParticles } from "@/components/visual/fire-particles";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SmoothScrollProvider>
          <FireParticles />
          {children}
        </SmoothScrollProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
