import { prisma } from "./db";
import { MOCK_PRODUCTS } from "./mockData";

const useMock = !process.env.DATABASE_URL;

export async function searchProductsByName(query: string) {
  if (useMock) {
    const lower = query.toLowerCase();
    return MOCK_PRODUCTS
      .filter((p) => p.name.toLowerCase().includes(lower))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 50);
  }
  return prisma.product.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
    include: { category: true },
    orderBy: { name: "asc" },
    take: 50,
  });
}

export async function searchProductsByLetter(letter: string) {
  if (useMock) {
    const l = letter.toLowerCase();
    return MOCK_PRODUCTS
      .filter((p) => p.name.toLowerCase().startsWith(l))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  return prisma.product.findMany({
    where: { name: { startsWith: letter, mode: "insensitive" } },
    include: { category: true },
    orderBy: { name: "asc" },
  });
}
