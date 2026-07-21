"use client";

import { useLocale, useTranslations } from "next-intl";

interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  product: { name: string; nameAr: string | null } | null;
  offer: { title: string; titleAr: string | null } | null;
}

interface Order {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-brand-secondary/20 text-brand-secondary",
  delivered: "bg-brand-accent/15 text-brand-accent",
  cancelled: "bg-stone-100 text-stone-500",
};

export default function ProfileOrders({ orders }: { orders: Order[] }) {
  const t = useTranslations("profile");
  const locale = useLocale();

  if (orders.length === 0) {
    return (
      <div className="bg-white/88 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60 text-center py-14">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-semibold text-stone-500">{t("noOrders")}</p>
        <p className="text-sm text-stone-400 mt-1">{t("noOrdersMessage")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/88 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100">
        <h3 className="font-semibold text-brand-dark">{t("orderHistory")}</h3>
      </div>

      <div className="divide-y divide-stone-50">
        {orders.map((order) => {
          const badgeClass = STATUS_STYLES[order.status] ?? "bg-stone-100 text-stone-500";
          const date = new Date(order.createdAt).toLocaleDateString(
            locale === "ar" ? "ar-LB" : "en-GB",
            { day: "numeric", month: "short", year: "numeric" }
          );

          return (
            <div key={order.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-stone-400">{date}</span>
                </div>
                <span className="font-bold text-brand-primary text-sm shrink-0">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>

              <ul className="text-sm text-stone-600 space-y-0.5">
                {order.items.map((item) => {
                  const name = locale === "ar"
                    ? (item.product?.nameAr || item.offer?.titleAr || item.product?.name || item.offer?.title || "—")
                    : (item.product?.name || item.offer?.title || "—");
                  return (
                    <li key={item.id} className="flex justify-between">
                      <span>{name} &times; {item.quantity}</span>
                      <span className="text-stone-400 text-xs">
                        ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
