import { prisma } from "@/lib/db";

export async function getProductReviews(productId: string) {
  return prisma.review.findMany({
    where: { productId },
    include: { user: { select: { fullName: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductRating(productId: string) {
  const result = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return { avg: result._avg.rating ?? 0, count: result._count.rating };
}

export async function getStoreRating() {
  const result = await prisma.review.aggregate({
    where: { productId: null },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return { avg: result._avg.rating ?? 0, count: result._count.rating };
}

export async function getUserReviews(userId: string) {
  return prisma.review.findMany({
    where: { userId },
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(data: { userId: string; productId?: string; rating: number; comment: string }) {
  return prisma.review.create({ data });
}

export async function updateReview(id: string, userId: string, data: { rating: number; comment: string }) {
  return prisma.review.updateMany({ where: { id, userId }, data });
}

export async function deleteReview(id: string, userId: string) {
  return prisma.review.deleteMany({ where: { id, userId } });
}
