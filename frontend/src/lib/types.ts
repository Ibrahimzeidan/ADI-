// Shared TypeScript types derived from Prisma models.
// Using Prisma's utility types keeps these types in sync with the database schema —
// if you change the schema, TypeScript errors here will point you to what needs updating.

import type { Prisma } from "@prisma/client";

// A product with its category data included — used on product cards, detail pages, and search results.
export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

// Offer as returned from the DB — used in offer cards and detail pages.
export type OfferItem = Prisma.OfferGetPayload<Record<string, never>>;
