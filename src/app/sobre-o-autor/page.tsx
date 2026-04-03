import type { Metadata } from "next";
import { AuthorSection } from "@/components/site/author-section";

export const metadata: Metadata = {
  title: "Sobre o Autor",
  description: "Conheça a trajetória de Dr. Rogério Márcio Souza de Castro.",
};

export default function SobreOAutorPage() {
  return <AuthorSection />;
}
