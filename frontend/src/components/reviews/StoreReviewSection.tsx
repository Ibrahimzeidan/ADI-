"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ReviewForm from "./ReviewForm";

export default function StoreReviewSection() {
  const t = useTranslations("reviews");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  if (done) return (
    <p className="text-emerald-600 text-sm font-medium py-2">{t("thankYou")}</p>
  );

  return (
    <div>
      {!open && (
        <button onClick={() => setOpen(true)}
          className="text-sm font-semibold text-brand-primary hover:underline">
          + {t("writeReview")}
        </button>
      )}
      {open && (
        <div className="mt-3">
          <ReviewForm onSaved={() => setDone(true)} onCancel={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
