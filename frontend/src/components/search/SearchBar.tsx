"use client";

import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

// Debounces the onSearch callback by 300 ms so we don't fire on every keystroke.
export default function SearchBar({ initialValue = "", onSearch, placeholder = "Search products…" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(value.trim()), 300);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [value, onSearch]);

  return (
    <input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-stone-200 bg-white px-5 py-3 text-brand-dark
        placeholder:text-stone-400 shadow-sm text-base
        focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
    />
  );
}
