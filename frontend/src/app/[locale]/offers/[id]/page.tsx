import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getOfferById } from "@/services/offer.service";
import OfferDetail from "@/components/offers/OfferDetail";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const offer = await getOfferById(id);
  return { title: offer ? `${offer.title} | ADI Lebanon` : "Offer | ADI Lebanon" };
}

export default async function OfferPage({ params }: Props) {
  const { id } = await params;
  const [offer] = await Promise.all([getOfferById(id)]);
  if (!offer) notFound();

  return (
    <div className="min-h-screen pt-20 bg-brand-dark">
      <OfferDetail offer={offer} />
    </div>
  );
}
