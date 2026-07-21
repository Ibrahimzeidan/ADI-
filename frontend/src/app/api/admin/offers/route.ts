import { handleAdminGetOffers, handleAdminCreateOffer } from "@/controllers/admin.controller";
export const GET  = () => handleAdminGetOffers();
export const POST = (req: Request) => handleAdminCreateOffer(req);
