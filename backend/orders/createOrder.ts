// Creates a new order and its line items in a single transaction.
// Called from the checkout page when the user clicks "Place Order".
// priceAtPurchase is stored on each item so order history stays accurate
// even if the product price changes later.

import type { PrismaClient } from "@prisma/client";
import type { CreateOrderInput } from "./orderTypes";

export async function createOrder(
  prisma: PrismaClient,
  userId: string,
  input: CreateOrderInput
) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        status: "pending",
        totalPrice: input.totalPrice,
        deliveryAddress: input.deliveryAddress,
        paymentMethod: input.paymentMethod,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });
    return order;
  });
}
