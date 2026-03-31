import bcrypt from "bcryptjs";
import { connectToDatabase } from "../src/lib/mongodb";
import { fallbackCharacters, fallbackProducts, fallbackTestimonials } from "../src/lib/seed-data";
import { Character } from "../src/models/Character";
import { Product } from "../src/models/Product";
import { Testimonial } from "../src/models/Testimonial";

async function seed() {
  await connectToDatabase();

  await Promise.all([
    Testimonial.deleteMany({}),
    Product.deleteMany({}),
    Character.deleteMany({}),
  ]);

  await Promise.all([
    Testimonial.insertMany(fallbackTestimonials.map((entry) => ({ ...entry, approved: true, featured: true }))),
    Product.insertMany(fallbackProducts.map((entry) => ({ ...entry, active: true }))),
    Character.insertMany(fallbackCharacters),
  ]);

  const hash = await bcrypt.hash("123456", 10);

  console.log("✅ Seed concluído com sucesso.");
  console.log("ADMIN_EMAIL=admin@sozoano.com");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}

seed()
  .catch((error) => {
    console.error("❌ Erro ao rodar seed:", error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
