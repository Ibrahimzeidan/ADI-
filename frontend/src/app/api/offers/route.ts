import { handleGetOffers } from "@/controllers/offer.controller";

export async function GET() {
  return handleGetOffers();
}
