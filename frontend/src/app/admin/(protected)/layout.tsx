// Auth-checking layout for all authenticated admin pages.
// /admin/login is in (auth)/ so it never hits this layout → no redirect loop.

import { redirect } from "next/navigation";
import { getAdminUser } from "@/middleware/admin.middleware";
import AdminShell from "@/components/admin/AdminShell";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return <AdminShell adminName={admin.profile.fullName}>{children}</AdminShell>;
}
