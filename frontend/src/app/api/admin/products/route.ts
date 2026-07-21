import { handleAdminGetProducts, handleAdminCreateProduct } from "@/controllers/admin.controller";
export const GET  = () => handleAdminGetProducts();
export const POST = (req: Request) => handleAdminCreateProduct(req);
