"use client";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetFilterProps {
  active: string;
  onSelect: (letter: string) => void;
}

export default function AlphabetFilter({ active, onSelect }: AlphabetFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {LETTERS.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelect(active === letter ? "" : letter)}
          className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors
            ${
              active === letter
                ? "bg-brand-primary text-white shadow"
                : "bg-white border border-stone-200 text-stone-600 hover:border-brand-primary hover:text-brand-primary"
            }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
