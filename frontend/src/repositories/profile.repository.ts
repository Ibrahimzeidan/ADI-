import type { PrismaClient } from "@prisma/client";

export async function findProfile(prisma: PrismaClient, userId: string) {
  return prisma.profile.findUnique({ where: { id: userId } });
}

export async function updateProfileData(
  prisma: PrismaClient,
  userId: string,
  data: { fullName?: string; phone?: string; address?: string; photoUrl?: string }
) {
  return prisma.profile.update({ where: { id: userId }, data });
}
