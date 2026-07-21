import { NextRequest } from "next/server";
import { handleAdminUpdateCategory, handleAdminDeleteCategory } from "@/controllers/admin.controller";
export const PATCH  = (req: NextRequest, { params }: { params: Promise<{ id: string }> }) =>
  params.then(({ id }) => handleAdminUpdateCategory(req, id));
export const DELETE = (req: NextRequest, { params }: { params: Promise<{ id: string }> }) =>
  params.then(({ id }) => handleAdminDeleteCategory(req, id));
