import { handleAdminDeleteReview } from "@/controllers/admin.controller";
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return handleAdminDeleteReview(req, (await params).id);
}
