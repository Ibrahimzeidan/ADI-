// Admin auth check — used in src/app/admin/layout.tsx.
// Returns the admin user if the session is valid and role === "admin".
// Returns null otherwise (caller redirects to /admin/login).

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";

export async function getAdminUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const profile = await prisma.profile.findUnique({
    where: { id: data.user.id },
    select: { id: true, fullName: true, role: true },
  });

  if (!profile || profile.role !== "admin") return null;
  return { ...data.user, profile };
}
