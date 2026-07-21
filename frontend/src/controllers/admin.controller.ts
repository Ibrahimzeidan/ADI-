// Admin API controller — verifies admin role before every action.
import { getAdminUser } from "@/middleware/admin.middleware";
import * as adminSvc from "@/services/admin.service";
import { prisma } from "@/lib/db";
import { ok, err } from "@/utils/response";

const guard = async () => {
  const admin = await getAdminUser();
  return admin ? null : err("Forbidden", 403);
};

// Orders
export async function handleGetAllOrders() {
  const denied = await guard(); if (denied) return denied;
  return ok(await adminSvc.getAllOrders());
}
export async function handleUpdateOrderStatus(req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  const { status } = await req.json();
  if (!status) return err("status required");
  return ok(await adminSvc.updateOrderStatus(id, status));
}

// Products
export async function handleAdminGetProducts() {
  const denied = await guard(); if (denied) return denied;
  return ok(await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }));
}
export async function handleAdminCreateProduct(req: Request) {
  const denied = await guard(); if (denied) return denied;
  const body = await req.json();
  return ok(await prisma.product.create({ data: body }));
}
export async function handleAdminUpdateProduct(req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  const body = await req.json();
  return ok(await prisma.product.update({ where: { id }, data: body }));
}
export async function handleAdminDeleteProduct(_req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  await prisma.product.delete({ where: { id } });
  return ok({ ok: true });
}

// Offers
export async function handleAdminGetOffers() {
  const denied = await guard(); if (denied) return denied;
  return ok(await prisma.offer.findMany({ orderBy: { createdAt: "desc" } }));
}
export async function handleAdminCreateOffer(req: Request) {
  const denied = await guard(); if (denied) return denied;
  const body = await req.json();
  return ok(await prisma.offer.create({ data: body }));
}
export async function handleAdminUpdateOffer(req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  const body = await req.json();
  return ok(await prisma.offer.update({ where: { id }, data: body }));
}
export async function handleAdminDeleteOffer(_req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  await prisma.offer.delete({ where: { id } });
  return ok({ ok: true });
}

// Categories
export async function handleAdminGetCategories() {
  const denied = await guard(); if (denied) return denied;
  return ok(await prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { name: "asc" } }));
}
export async function handleAdminCreateCategory(req: Request) {
  const denied = await guard(); if (denied) return denied;
  const { name, slug } = await req.json();
  return ok(await prisma.category.create({ data: { name, slug } }));
}
export async function handleAdminUpdateCategory(req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  const { name, slug } = await req.json();
  return ok(await prisma.category.update({ where: { id }, data: { name, slug } }));
}
export async function handleAdminDeleteCategory(_req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  await prisma.category.delete({ where: { id } });
  return ok({ ok: true });
}

// Users
export async function handleGetAllUsers() {
  const denied = await guard(); if (denied) return denied;
  return ok(await adminSvc.getAllUsers());
}

// Reviews
export async function handleGetAllReviews() {
  const denied = await guard(); if (denied) return denied;
  return ok(await adminSvc.getAllReviews());
}
export async function handleAdminDeleteReview(_req: Request, id: string) {
  const denied = await guard(); if (denied) return denied;
  await adminSvc.deleteReview(id);
  return ok({ ok: true });
}
