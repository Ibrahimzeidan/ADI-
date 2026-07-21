import { handleAdminUpdateOffer, handleAdminDeleteOffer } from "@/controllers/admin.controller";
type P = { params: Promise<{ id: string }> };
export async function PATCH(req: Request, { params }: P) { return handleAdminUpdateOffer(req, (await params).id); }
export async function DELETE(req: Request, { params }: P) { return handleAdminDeleteOffer(req, (await params).id); }
