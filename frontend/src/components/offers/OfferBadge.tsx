interface Props {
  originalPrice: number;
  offerPrice: number;
}

export default function OfferBadge({ originalPrice, offerPrice }: Props) {
  const savings = (originalPrice - offerPrice).toFixed(2);
  return (
    <span className="inline-flex items-center gap-1 bg-brand-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
      Save ${savings}
    </span>
  );
}
