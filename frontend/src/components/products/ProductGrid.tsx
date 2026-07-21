import type { ProductWithCategory } from "@/lib/types";
import ProductCard from "./ProductCard";
import EmptyState from "@/components/ui/EmptyState";

interface Props {
  products: ProductWithCategory[];
  emptyTitle?: string;
  emptyMessage?: string;
}

export default function ProductGrid({ products, emptyTitle, emptyMessage }: Props) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
