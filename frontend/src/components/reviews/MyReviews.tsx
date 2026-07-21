"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string; rating: number; comment: string; createdAt: string; productId: string | null;
  product: { name: string } | null;
}

export default function MyReviews() {
  const t = useTranslations("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/reviews?mine=true");
    if (res.ok) setReviews(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    load();
  };

  if (reviews.length === 0) return (
    <p className="text-stone-400 text-sm py-4">{t("noMyReviews")}</p>
  );

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="border border-stone-100 rounded-2xl p-4 bg-white">
          {editingId === r.id ? (
            <ReviewForm productId={r.productId ?? undefined} existingId={r.id}
              existingRating={r.rating} existingComment={r.comment}
              onSaved={() => { setEditingId(null); load(); }}
              onCancel={() => setEditingId(null)} />
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-stone-700">
                    {r.product?.name ?? <span className="italic">{t("storeLabel")}</span>}
                  </p>
                  <StarRating value={r.rating} size="sm" />
                </div>
                <span className="text-xs text-stone-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-sm text-stone-600">{r.comment}</p>
              <div className="mt-2 flex gap-3">
                <button onClick={() => setEditingId(r.id)} className="text-xs text-blue-600 hover:underline">{t("editReview")}</button>
                <button onClick={() => handleDelete(r.id)} className="text-xs text-red-500 hover:underline">{t("delete")}</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
