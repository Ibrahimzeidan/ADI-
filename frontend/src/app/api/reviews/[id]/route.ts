import { NextRequest } from "next/server";
import { handleUpdateReview, handleDeleteReview } from "@/controllers/review.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleUpdateReview(req, id);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleDeleteReview(id);
}
