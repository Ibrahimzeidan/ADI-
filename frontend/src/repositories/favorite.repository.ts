import type { PrismaClient } from "@prisma/client";

export async function addFavorite(prisma: PrismaClient, userId: string, productId: string) {
  return prisma.favorite.upsert({
    where: { userId_productId: { userId, productId } },
    create: { userId, productId },
    update: {},
  });
}

export async function removeFavorite(prisma: PrismaClient, userId: string, productId: string) {
  return prisma.favorite.deleteMany({ where: { userId, productId } });
}

export async function getUserFavoriteIds(prisma: PrismaClient, userId: string): Promise<Set<string>> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { productId: true },
  });
  return new Set(favorites.map((f) => f.productId));
}

export async function getUserFavorites(prisma: PrismaClient, userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });
}
