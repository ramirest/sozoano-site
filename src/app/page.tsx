import { CharacterGrid } from "@/components/home/character-grid";
import { BurningBushHero } from "@/components/home/burning-bush-hero";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { AuthorSection } from "@/components/site/author-section";
import { getTestimonials } from "@/lib/repositories";

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <BurningBushHero />
      <CharacterGrid />
      <TestimonialsCarousel
        items={testimonials.map((entry) => ({
          name: String(entry.name),
          city: entry.city ? String(entry.city) : undefined,
          message: String(entry.message),
        }))}
      />
      <AuthorSection />
    </>
  );
}
