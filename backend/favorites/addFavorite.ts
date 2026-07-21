// Adds a product to a user's favorites.
// Called when an authenticated user clicks the heart icon on a product.
// Uses @@unique([userId, productId]) so double-clicking is safe (upsert).

import type { PrismaClient } from "@prisma/client";

export async function addFavorite(
  prisma: PrismaClient,
  userId: string,
  productId: string
) {
  return prisma.favorite.upsert({
    where: { userId_productId: { userId, productId } },
    create: { userId, productId },
    update: {}, // already exists — no change needed
  });
}
