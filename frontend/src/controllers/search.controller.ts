import type { NextRequest } from "next/server";
import { searchProductsByName, searchProductsByLetter } from "@/lib/search";
import { ok } from "@/utils/response";

export async function handleSearch(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  const letter = req.nextUrl.searchParams.get("letter");
  if (letter) return ok(await searchProductsByLetter(letter));
  if (q) return ok(await searchProductsByName(q));
  return ok([]);
}
