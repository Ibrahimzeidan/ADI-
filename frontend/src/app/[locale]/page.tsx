import { getActiveOffers } from "@/services/offer.service";
import { getStoreRating } from "@/services/review.service";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BrandsSection from "@/components/sections/BrandsSection";
import OffersSection from "@/components/sections/OffersSection";
import LocationsSection from "@/components/sections/LocationsSection";
import ContactSection from "@/components/sections/ContactSection";
import StoreRatingBadge from "@/components/reviews/StoreRatingBadge";

export default async function HomePage() {
  const [offers, storeRating] = await Promise.all([
    getActiveOffers().catch(() => []),
    getStoreRating().catch(() => undefined),
  ]);

  return (
    <>
      <HeroSection storeRating={storeRating} />
      <AboutSection />
      <BrandsSection />
      <OffersSection offers={offers} />
      <LocationsSection />
      <ContactSection />
    </>
  );
}
