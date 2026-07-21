import { prisma } from "./db";
import { MOCK_CATEGORIES } from "./mockData";

const useMock = !process.env.DATABASE_URL;

export async function getAllCategories() {
  if (useMock) return [...MOCK_CATEGORIES].sort((a, b) => a.name.localeCompare(b.name));
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  if (useMock) return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
  return prisma.category.findUnique({ where: { slug } });
}
