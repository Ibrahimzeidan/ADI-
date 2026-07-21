import { NextRequest } from "next/server";
import { handleAdminGetCategories, handleAdminCreateCategory } from "@/controllers/admin.controller";
export const GET  = () => handleAdminGetCategories();
export const POST = (req: NextRequest) => handleAdminCreateCategory(req);
