import { connectToDatabase } from "@/lib/mongodb";
import { fallbackCharacters, fallbackProducts, fallbackTestimonials } from "@/lib/seed-data";
import { Character } from "@/models/Character";
import { Devocional } from "@/models/Devocional";
import { Product } from "@/models/Product";
import { Testimonial } from "@/models/Testimonial";
import { UserStory } from "@/models/UserStory";

export async function getTestimonials() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 }).limit(10).lean();
    // Fallback mantém a home funcional mesmo sem Mongo configurado.
    return testimonials.length ? testimonials : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find({ active: true }).sort({ createdAt: -1 }).lean();
    return products.length ? products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getCharacters() {
  try {
    await connectToDatabase();
    const characters = await Character.find({}).sort({ chapter: 1 }).lean();
    if (!characters.length) return fallbackCharacters;

    const mergedBySlug = new Map<string, (typeof fallbackCharacters)[number]>();

    for (const character of characters) {
      mergedBySlug.set(String(character.slug), character as (typeof fallbackCharacters)[number]);
    }

    for (const fallbackCharacter of fallbackCharacters) {
      if (!mergedBySlug.has(fallbackCharacter.slug)) {
        mergedBySlug.set(fallbackCharacter.slug, fallbackCharacter);
      }
    }

    return Array.from(mergedBySlug.values()).sort((a, b) => Number(a.chapter) - Number(b.chapter));
  } catch {
    return fallbackCharacters;
  }
}

export async function getCharacterBySlug(slug: string) {
  try {
    await connectToDatabase();
    const character = await Character.findOne({ slug }).lean();
    return character || fallbackCharacters.find((entry) => entry.slug === slug) || null;
  } catch {
    return fallbackCharacters.find((entry) => entry.slug === slug) || null;
  }
}

export async function getPublicStories(limit = 12) {
  try {
    await connectToDatabase();
    return await UserStory.find({ approved: true, consentPublic: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  } catch {
    return [];
  }
}

export async function getDevocionaisFromDb() {
  try {
    await connectToDatabase();
    return await Devocional.find({ published: true }).sort({ date: -1 }).lean();
  } catch {
    return [];
  }
}
