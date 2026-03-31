import type { MetadataRoute } from "next";
import { getCharacters } from "@/lib/repositories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const characters = await getCharacters();

  const staticRoutes = ["", "/sobre-o-livro", "/minha-historia", "/devocionais", "/loja", "/lancamento", "/comunidade"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...characters.map((character) => ({
      url: `${baseUrl}/personagens/${String(character.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
