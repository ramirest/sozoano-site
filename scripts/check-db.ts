import { connectToDatabase } from "../src/lib/mongodb";
import { Character } from "../src/models/Character";
import { Product } from "../src/models/Product";
import { Testimonial } from "../src/models/Testimonial";
import { UserStory } from "../src/models/UserStory";

async function main() {
  await connectToDatabase();
  const products = await Product.find({}).lean();
  console.log("Produtos:", products.length);
  const legacy = products.filter((p) => !p.slug || String(p.image).includes("unsplash"));
  console.log("Legados (sem slug ou unsplash):", legacy.map((p) => p.title));
  if (process.env.CLEAN === "1" && legacy.length) {
    await Product.deleteMany({ _id: { $in: legacy.map((p) => p._id) } });
    console.log("Legados removidos.");
  }
  console.log("Personagens:", await Character.countDocuments({}));
  console.log("Depoimentos:", await Testimonial.countDocuments({}));
  console.log("Histórias:", await UserStory.countDocuments({}));
}

main().finally(() => process.exit(0));
