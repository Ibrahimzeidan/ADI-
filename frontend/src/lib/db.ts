// Prisma client singleton — ONE shared connection for the whole app.
//
// Problem: Next.js restarts modules on every hot-reload in development.
// Without this pattern, each reload would open a new database connection
// until you hit the limit and the DB refuses new connections.
//
// Solution: store the client in `globalThis` (survives module restarts)
// so it gets reused across reloads instead of recreated every time.
//
// Prisma 7 requires a driver adapter. We use @prisma/adapter-pg with the `pg` package.

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
