import { handleGetCategories } from "@/controllers/category.controller";

export async function GET() {
  return handleGetCategories();
}