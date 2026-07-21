/**
 * Admin account seed script.
 *
 * ⚠️  SECURITY — DEFAULT DEMO CREDENTIALS ⚠️
 * These are placeholder credentials for the first run only.
 * The real manager MUST change both the email and password immediately
 * after logging in for the first time, before this goes anywhere near
 * a production environment or real customers.
 *
 * Default email:    admin@adilebanon.com
 * Default password: ChangeMe123!
 *
 * Run:  npx tsx prisma/seedAdmin.ts
 */

import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const ADMIN_EMAIL = "admin@adilebanon.com";
const ADMIN_PASSWORD = "ChangeMe123!";
const ADMIN_NAME = "ADI Admin";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔐 Seeding admin account…");

  // Create (or fetch existing) Supabase auth user — email_confirm: true skips verification email
  let userId: string;
  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === ADMIN_EMAIL);

  if (found) {
    console.log("   Admin auth user already exists — updating password…");
    await supabase.auth.admin.updateUserById(found.id, { password: ADMIN_PASSWORD });
    userId = found.id;
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { role: "admin", fullName: ADMIN_NAME },
    });
    if (error || !data.user) throw new Error(`Failed to create admin auth user: ${error?.message}`);
    userId = data.user.id;
    console.log("   Admin auth user created:", userId);
  }

  // Upsert the Profile row with role = "admin"
  await prisma.profile.upsert({
    where: { id: userId },
    update: { role: "admin", fullName: ADMIN_NAME },
    create: { id: userId, fullName: ADMIN_NAME, role: "admin" },
  });

  console.log("✅ Admin profile seeded with role = admin");
  console.log("🎉 Admin seed complete!");
  console.log("");
  console.log("   Login at: /admin/login");
  console.log("   Email:    ", ADMIN_EMAIL);
  console.log("   Password: ", ADMIN_PASSWORD);
  console.log("   ⚠️  Change these credentials immediately before going live!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
