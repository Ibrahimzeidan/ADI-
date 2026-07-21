import { prisma } from "@/lib/db";
import OfferForm from "@/components/admin/OfferForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) notFound();
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/offers" className="text-sm text-stone-500 hover:text-stone-700">← Back to Offers</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">Edit Offer</h1>
      </div>
      <OfferForm initial={offer} offerId={offer.id} />
    </div>
  );
}
