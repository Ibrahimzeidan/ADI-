import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { categories, products, offers } from "./seedData";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database…");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, imageUrl: cat.imageUrl },
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} categories seeded`);

  const categoryMap = await prisma.category.findMany({ select: { id: true, slug: true } });
  const slugToId = Object.fromEntries(categoryMap.map((c) => [c.slug, c.id]));

  for (const p of products) {
    const { categorySlug, ...rest } = p;
    const categoryId = slugToId[categorySlug];
    if (!categoryId) throw new Error(`No category found for slug: ${categorySlug}`);
    await prisma.product.upsert({
      where: { slug: rest.slug },
      update: { ...rest, categoryId },
      create: { ...rest, categoryId },
    });
  }
  console.log(`✅ ${products.length} products seeded`);

  for (const offer of offers) {
    const existing = await prisma.offer.findFirst({ where: { title: offer.title } });
    if (existing) {
      await prisma.offer.update({ where: { id: existing.id }, data: offer });
    } else {
      await prisma.offer.create({ data: offer });
    }
  }
  console.log(`✅ ${offers.length} offers seeded`);
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
