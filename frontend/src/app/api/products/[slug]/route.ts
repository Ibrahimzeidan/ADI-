// API route: GET /api/products/[slug]
// Returns a single product by its URL slug, with category data included.
// In Next.js 16, dynamic route `params` is a Promise — must be awaited.

import type { NextRequest } from "next/server";
import { getProductBySlug } from "@/lib/products";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return Response.json({ error: "Product not found" }, { status: 404 });
  return Response.json(product);
}
