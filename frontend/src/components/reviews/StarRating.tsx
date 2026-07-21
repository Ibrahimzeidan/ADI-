"use client";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };

export default function StarRating({ value, onChange, size = "md" }: Props) {
  return (
    <span className={`inline-flex gap-0.5 ${sizes[size]}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}
          onClick={() => onChange?.(n)}
          className={`${onChange ? "cursor-pointer select-none" : ""} transition-colors
            ${n <= Math.round(value) ? "text-amber-400" : "text-stone-200"}`}>
          ★
        </span>
      ))}
    </span>
  );
}
