import { getAllCategories } from "@/lib/categories";
import { ok } from "@/utils/response";

export async function handleGetCategories() {
  const categories = await getAllCategories();
  return ok(categories);
}
