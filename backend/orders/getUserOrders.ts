// Returns all past orders for a user, most recent first.
// Used on the Profile page order history section.

import type { PrismaClient } from "@prisma/client";

export async function getUserOrders(prisma: PrismaClient, userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: { select: { name: true, nameAr: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
