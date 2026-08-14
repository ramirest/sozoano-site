import bcrypt from "bcryptjs";
import { connectToDatabase } from "../src/lib/mongodb";
import { fallbackCharacters, fallbackProducts, fallbackTestimonials } from "../src/lib/seed-data";
import { Character } from "../src/models/Character";
import { Product } from "../src/models/Product";
import { Testimonial } from "../src/models/Testimonial";

// Seed NÃO destrutivo: faz upsert por chave natural (slug/nome) e nunca apaga
// conteúdo existente — seguro para rodar contra o banco de produção.
async function seed() {
  await connectToDatabase();

  await Promise.all([
    Character.bulkWrite(
      fallbackCharacters.map((character) => ({
        updateOne: {
          filter: { slug: character.slug },
          update: { $set: character },
          upsert: true,
        },
      })),
    ),
    Product.bulkWrite(
      fallbackProducts.map((entry) => {
        const product = { ...entry };
        delete product._id;

        return {
          updateOne: {
            filter: { slug: product.slug },
            update: {
              $set: product,
              $setOnInsert: { active: true },
            },
            upsert: true,
          },
        };
      }),
    ),
    Testimonial.bulkWrite(
      fallbackTestimonials.map((testimonial) => ({
        updateOne: {
          filter: { name: testimonial.name, message: testimonial.message },
          update: { $set: { ...testimonial, approved: true, featured: true } },
          upsert: true,
        },
      })),
    ),
  ]);

  const hash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "123456", 10);

  console.log("✅ Seed concluído com sucesso (upsert, sem apagar dados).");
  console.log("Se precisar de um novo hash de senha admin:");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}

seed()
  .catch((error) => {
    console.error("❌ Erro ao rodar seed:", error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
