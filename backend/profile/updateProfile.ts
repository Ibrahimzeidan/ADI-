// Updates a user's profile fields (fullName, address).
// Called from the profile page when the user saves changes.

import type { PrismaClient } from "@prisma/client";

export async function updateProfile(
  prisma: PrismaClient,
  userId: string,
  data: { fullName?: string; address?: string; photoUrl?: string }
) {
  return prisma.profile.update({
    where: { id: userId },
    data,
  });
}
