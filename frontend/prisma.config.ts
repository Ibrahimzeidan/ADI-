// Prisma 7 config — connection URL lives here, not in schema.prisma.
// Copy .env.example to .env and fill in DATABASE_URL before running migrations.

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
