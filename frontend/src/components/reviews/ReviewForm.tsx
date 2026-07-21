"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import StarRating from "./StarRating";

interface Props {
  productId?: string;
  existingId?: string;
  existingRating?: number;
  existingComment?: string;
  onSaved?: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ productId, existingId, existingRating = 0, existingComment = "", onSaved, onCancel }: Props) {
  const t = useTranslations("reviews");
  const [rating, setRating] = useState(existingRating);
  const [comment, setComment] = useState(existingComment);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { setError("Please select a star rating"); return; }
    setSaving(true); setError(null);
    const url = existingId ? `/api/reviews/${existingId}` : "/api/reviews";
    const method = existingId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: productId ?? null, rating, comment }),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to save review"); return; }
    onSaved?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <p className="text-sm font-medium text-stone-700 mb-1">{t("yourRating")}</p>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>
      <div>
        <textarea
          value={comment} onChange={(e) => setComment(e.target.value)} rows={3}
          placeholder={t("commentPlaceholder")} required
          className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="bg-brand-primary text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-primary/85 disabled:opacity-50">
          {saving ? "…" : (existingId ? t("update") : t("submit"))}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="border border-stone-200 text-stone-600 rounded-xl px-4 py-2 text-sm hover:bg-stone-50">
            {t("cancel")}
          </button>
        )}
      </div>
    </form>
  );
}
