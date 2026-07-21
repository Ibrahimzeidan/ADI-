// Returns all favorited products for a logged-in user.
// Also returns a Set of productIds for fast "is this favorited?" checks.

import type { PrismaClient } from "@prisma/client";

export async function getUserFavorites(prisma: PrismaClient, userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      product: { include: { category: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return favorites;
}

export async function getUserFavoriteIds(
  prisma: PrismaClient,
  userId: string
): Promise<Set<string>> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { productId: true },
  });
  return new Set(favorites.map((f) => f.productId));
}
