import { prisma } from "@/lib/db";
import * as repo from "@/repositories/favorite.repository";

export const addFavorite = (userId: string, productId: string) =>
  repo.addFavorite(prisma, userId, productId);

export const removeFavorite = (userId: string, productId: string) =>
  repo.removeFavorite(prisma, userId, productId);

export const getFavoriteIds = (userId: string) =>
  repo.getUserFavoriteIds(prisma, userId);

export const getFavorites = (userId: string) =>
  repo.getUserFavorites(prisma, userId);
