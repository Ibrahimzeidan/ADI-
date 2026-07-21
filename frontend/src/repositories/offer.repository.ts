import type { PrismaClient } from "@prisma/client";

export async function getActiveOffers(prisma: PrismaClient) {
  return prisma.offer.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOfferById(prisma: PrismaClient, id: string) {
  return prisma.offer.findUnique({ where: { id } });
}
