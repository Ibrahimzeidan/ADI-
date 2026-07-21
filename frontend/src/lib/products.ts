import { prisma } from "./db";
import { MOCK_PRODUCTS } from "./mockData";

const useMock = !process.env.DATABASE_URL;

export async function getProductsByCategory(categorySlug: string) {
  if (useMock) {
    return MOCK_PRODUCTS
      .filter((p) => p.category.slug === categorySlug)
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  return prisma.product.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { name: "asc" },
  });
}

export async function getProductBySlug(slug: string) {
  if (useMock) return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  return prisma.product.findUnique({ where: { slug }, include: { category: true } });
}
