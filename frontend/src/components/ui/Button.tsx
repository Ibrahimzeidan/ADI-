// Reusable button component — import this everywhere you need a styled button.
// Three variants: primary (brand orange filled), outline (orange border), ghost (white border for dark backgrounds).

import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}

const BASE =
  "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer";

const STYLES: Record<Variant, string> = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary/85 shadow-md hover:shadow-lg",
  outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
  ghost:   "border-2 border-white text-white hover:bg-white hover:text-brand-dark",
};

export default function Button({
  label,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = `${BASE} ${STYLES[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{label}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
