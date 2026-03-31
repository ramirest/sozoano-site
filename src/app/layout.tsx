import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sozoano.vercel.app"),
  title: {
    default: "Sozoano – O Improvável",
    template: "%s | Sozoano – O Improvável",
  },
  description:
    "A casa oficial do ecossistema do livro Sozoano – O Improvável, uma jornada imersiva de fé, transformação e propósito.",
  keywords: [
    "Sozoano",
    "O Improvável",
    "Rogério Márcio Souza de Castro",
    "fé",
    "devocional",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans texture-overlay">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
