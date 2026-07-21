"use client";

interface Props { avg: number; count: number; }

export default function StoreRatingBadge({ avg, count }: Props) {
  if (count === 0) return null;
  return (
    <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90">
      <span className="text-amber-400 text-base">★</span>
      <span className="font-semibold">{avg.toFixed(1)}</span>
      <span className="text-white/60">/ 5</span>
      <span className="text-white/50 text-xs">({count} reviews)</span>
    </div>
  );
}
