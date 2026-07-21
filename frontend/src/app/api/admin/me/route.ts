// Quick role-check endpoint used by the admin login page client-side.
import { getAdminUser } from "@/middleware/admin.middleware";
import { ok, err } from "@/utils/response";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return err("Forbidden", 403);
  return ok({ id: admin.id, email: admin.email, name: admin.profile.fullName });
}
