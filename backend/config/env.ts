// Placeholder for environment variable configuration — phase 2.
// When the backend is built, this file will load and validate all env vars:
//   - DATABASE_URL   (PostgreSQL connection string for Prisma)
//   - JWT_SECRET     (for user authentication tokens)
//   - SMTP_*         (for sending contact form emails)
//   - STORAGE_*      (for product image uploads)
//
// Never put real secrets in this file. Use .env.local which is gitignored.

export const env = {
  // Example:
  // DATABASE_URL: process.env.DATABASE_URL ?? "",
  // JWT_SECRET: process.env.JWT_SECRET ?? "",
};
