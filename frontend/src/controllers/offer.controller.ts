import { ok, err } from "@/utils/response";
import { getActiveOffers, getOfferById } from "@/services/offer.service";

export async function handleGetOffers() {
  try {
    const offers = await getActiveOffers();
    return ok(offers);
  } catch {
    return err("Failed to fetch offers", 500);
  }
}

export async function handleGetOfferById(id: string) {
  try {
    const offer = await getOfferById(id);
    if (!offer) return err("Offer not found", 404);
    return ok(offer);
  } catch {
    return err("Failed to fetch offer", 500);
  }
}
