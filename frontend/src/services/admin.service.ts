import { prisma } from "@/lib/db";
import * as repo from "@/repositories/admin.repository";

export const getAllOrders    = () => repo.getAllOrders(prisma);
export const updateOrderStatus = (id: string, status: string) => repo.updateOrderStatus(prisma, id, status);
export const getAllUsers     = () => repo.getAllUsers(prisma);
export const getAllReviews   = () => repo.getAllReviewsAdmin(prisma);
export const deleteReview   = (id: string) => repo.deleteReview(prisma, id);
