// Removes a product from a user's favorites.
// Called when a logged-in user clicks the filled heart icon to un-favorite.

import type { PrismaClient } from "@prisma/client";

export async function removeFavorite(
  prisma: PrismaClient,
  userId: string,
  productId: string
) {
  return prisma.favorite.deleteMany({
    where: { userId, productId },
  });
}
