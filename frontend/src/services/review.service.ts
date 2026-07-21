import * as repo from "@/repositories/review.repository";

export const getProductReviews = (productId: string) => repo.getProductReviews(productId);
export const getProductRating = (productId: string) => repo.getProductRating(productId);
export const getStoreRating = () => repo.getStoreRating();
export const getUserReviews = (userId: string) => repo.getUserReviews(userId);
export const createReview = (data: { userId: string; productId?: string; rating: number; comment: string }) =>
  repo.createReview(data);
export const updateReview = (id: string, userId: string, data: { rating: number; comment: string }) =>
  repo.updateReview(id, userId, data);
export const deleteReview = (id: string, userId: string) => repo.deleteReview(id, userId);
