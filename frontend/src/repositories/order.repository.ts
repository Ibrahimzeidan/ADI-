import type { PrismaClient } from "@prisma/client";
import type { CreateOrderInput } from "@/models/order.model";

export async function createOrder(prisma: PrismaClient, userId: string, input: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    return tx.order.create({
      data: {
        userId,
        status: "pending",
        totalPrice: input.totalPrice,
        deliveryAddress: input.deliveryAddress,
        paymentMethod: input.paymentMethod,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId ?? null,
            offerId: item.offerId ?? null,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          })),
        },
      },
      include: { items: { include: { product: true, offer: true } } },
    });
  });
}

export async function getUserOrders(prisma: PrismaClient, userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: { select: { name: true, nameAr: true } },
          offer: { select: { title: true, titleAr: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
