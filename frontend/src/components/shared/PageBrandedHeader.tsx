// Branded section header for Favorites, Orders, and similar pages.
// Accepts pre-translated strings from the parent server component.

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageBrandedHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-8 rounded-full bg-brand-primary shrink-0" />
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">{title}</h1>
      </div>
      {subtitle && <p className="text-stone-500 text-sm ps-4">{subtitle}</p>}
    </div>
  );
}
