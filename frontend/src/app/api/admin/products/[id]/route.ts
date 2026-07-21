import { handleAdminUpdateProduct, handleAdminDeleteProduct } from "@/controllers/admin.controller";
type P = { params: Promise<{ id: string }> };
export async function PATCH(req: Request, { params }: P) { return handleAdminUpdateProduct(req, (await params).id); }
export async function DELETE(req: Request, { params }: P) { return handleAdminDeleteProduct(req, (await params).id); }
