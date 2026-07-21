import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as svc from "@/services/review.service";

async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function handleGetProductReviews(productId: string) {
  const reviews = await svc.getProductReviews(productId);
  return NextResponse.json(reviews);
}

export async function handleGetUserReviews() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reviews = await svc.getUserReviews(user.id);
  return NextResponse.json(reviews);
}

export async function handleCreateReview(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { productId, rating, comment } = await req.json();
  if (!rating || !comment) return NextResponse.json({ error: "rating and comment are required" }, { status: 400 });
  const review = await svc.createReview({ userId: user.id, productId: productId ?? undefined, rating, comment });
  return NextResponse.json(review, { status: 201 });
}

export async function handleUpdateReview(req: NextRequest, id: string) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { rating, comment } = await req.json();
  await svc.updateReview(id, user.id, { rating, comment });
  return NextResponse.json({ ok: true });
}

export async function handleDeleteReview(id: string) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await svc.deleteReview(id, user.id);
  return NextResponse.json({ ok: true });
}
