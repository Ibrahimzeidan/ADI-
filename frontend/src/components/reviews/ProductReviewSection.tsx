"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string; userId: string; rating: number; comment: string; createdAt: string;
  user: { fullName: string };
}

export default function ProductReviewSection({ productId }: { productId: string }) {
  const t = useTranslations("reviews");
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    if (res.ok) setReviews(await res.json());
  }, [productId]);

  useEffect(() => {
    load();
    supabase.auth.getUser().then(({ data }) => setCurrentUserId(data.user?.id ?? null));
  }, [load, supabase.auth]);

  const myReview = reviews.find((r) => r.userId === currentUserId);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

  const handleSaved = () => { setShowForm(false); setEditingId(null); load(); };

  const handleDelete = async (id: string) => {
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-stone-800">{t("title")}</h3>
          {reviews.length > 0 && (
            <span className="text-sm text-stone-500">
              <StarRating value={avg} size="sm" /> {avg.toFixed(1)} ({reviews.length})
            </span>
          )}
        </div>
        {currentUserId && !myReview && (
          <button onClick={() => setShowForm(!showForm)}
            className="text-sm font-semibold text-brand-primary hover:underline">
            {showForm ? t("cancel") : t("writeReview")}
          </button>
        )}
      </div>

      {showForm && !myReview && (
        <div className="bg-stone-50 rounded-2xl p-4 mb-4">
          <ReviewForm productId={productId} onSaved={handleSaved} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {reviews.length === 0 && !showForm && (
        <p className="text-stone-400 text-sm">{t("noReviewsMessage")}</p>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="border border-stone-100 rounded-2xl p-4 bg-white">
            {editingId === r.id ? (
              <ReviewForm productId={productId} existingId={r.id} existingRating={r.rating} existingComment={r.comment}
                onSaved={handleSaved} onCancel={() => setEditingId(null)} />
            ) : (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{r.user.fullName}</p>
                    <StarRating value={r.rating} size="sm" />
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-600">{r.comment}</p>
                {currentUserId === r.userId && (
                  <div className="mt-2 flex gap-3">
                    <button onClick={() => setEditingId(r.id)} className="text-xs text-blue-600 hover:underline">{t("editReview")}</button>
                    <button onClick={() => handleDelete(r.id)} className="text-xs text-red-500 hover:underline">{t("delete")}</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
