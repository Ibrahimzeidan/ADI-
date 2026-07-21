interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No products found",
  message = "Try a different search term or browse our categories.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="font-serif text-xl font-semibold text-brand-dark mb-2">{title}</h3>
      <p className="text-stone-500 max-w-sm">{message}</p>
    </div>
  );
}
