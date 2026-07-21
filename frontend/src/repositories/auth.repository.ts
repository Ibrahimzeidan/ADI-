import type { PrismaClient } from "@prisma/client";

// Supabase may create a profile row automatically via a DB trigger before our
// code runs — so .create() would throw a unique-constraint error.
// upsert() handles both cases: creates if missing, updates fullName if already there.
export async function createProfile(prisma: PrismaClient, userId: string, fullName: string) {
  return prisma.profile.upsert({
    where: { id: userId },
    create: { id: userId, fullName },
    update: { fullName },
  });
}
