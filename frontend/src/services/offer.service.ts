import { prisma } from "@/lib/db";
import * as repo from "@/repositories/offer.repository";

export function getActiveOffers() {
  return repo.getActiveOffers(prisma);
}

export function getOfferById(id: string) {
  return repo.getOfferById(prisma, id);
}
