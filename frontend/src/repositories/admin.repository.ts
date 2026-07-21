// Admin-only DB queries — all orders, all users, product/offer CRUD, review moderation.
import type { PrismaClient } from "@prisma/client";

export const getAllOrders = (prisma: PrismaClient) =>
  prisma.order.findMany({
    include: { user: { select: { fullName: true } }, items: { include: { product: { select: { name: true } }, offer: { select: { title: true } } } } },
    orderBy: { createdAt: "desc" },
  });

export const updateOrderStatus = (prisma: PrismaClient, id: string, status: string) =>
  prisma.order.update({ where: { id }, data: { status } });

export const getAllUsers = (prisma: PrismaClient) =>
  prisma.profile.findMany({
    where: { role: "customer" },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

export const getAllReviewsAdmin = (prisma: PrismaClient) =>
  prisma.review.findMany({
    include: {
      user: { select: { fullName: true } },
      product: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

export const deleteReview = (prisma: PrismaClient, id: string) =>
  prisma.review.delete({ where: { id } });
