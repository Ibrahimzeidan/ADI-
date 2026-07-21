import { prisma } from "@/lib/db";
import type { CreateOrderInput } from "@/models/order.model";
import * as repo from "@/repositories/order.repository";

export const createOrder = (userId: string, input: CreateOrderInput) =>
  repo.createOrder(prisma, userId, input);

export const getUserOrders = (userId: string) =>
  repo.getUserOrders(prisma, userId);
