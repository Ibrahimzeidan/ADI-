import { handleUpdateOrderStatus } from "@/controllers/admin.controller";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return handleUpdateOrderStatus(req, (await params).id);
}
