import { NextRequest } from "next/server";
import { handleGetProductReviews, handleGetUserReviews, handleCreateReview } from "@/controllers/review.controller";

// GET /api/reviews?productId=xxx  →  product reviews
// GET /api/reviews?mine=true      →  current user's reviews
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("mine")) return handleGetUserReviews();
  const productId = searchParams.get("productId");
  if (productId) return handleGetProductReviews(productId);
  return new Response("productId or mine required", { status: 400 });
}

export async function POST(req: NextRequest) {
  return handleCreateReview(req);
}
