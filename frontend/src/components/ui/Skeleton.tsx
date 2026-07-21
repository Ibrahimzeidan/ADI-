// Skeleton loading placeholder — shown while product data is being fetched.
// Animates with a grey pulse in the same shape as real product cards.

export default function Skeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-stone-200 rounded-xl mb-3" />
          <div className="h-3 bg-stone-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-stone-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}
