import OfferForm from "@/components/admin/OfferForm";
import Link from "next/link";

export default function NewOfferPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/offers" className="text-sm text-stone-500 hover:text-stone-700">← Back to Offers</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">Add New Offer</h1>
      </div>
      <OfferForm />
    </div>
  );
}
