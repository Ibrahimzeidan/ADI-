"use client";

// Single-page checkout: delivery address → payment method → order summary → place order.
// On success, shows confirmation and clears the cart.

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const { items, totalPrice, clearCart } = useCart() as any;
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"cash" | "card">("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Pre-fill address from profile
  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => { if (d.address) setAddress(d.address); })
      .catch(() => {});
  }, []);

  if (items.length === 0 && !orderId) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-stone-400 mb-4">{t("emptyCart")}</p>
        <p className="text-stone-400 mb-8">{t("emptyCartMessage")}</p>
        <Link href="/categories"
          className="bg-brand-primary text-white font-semibold rounded-xl px-6 py-3 hover:bg-brand-primary/85 transition-colors">
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-serif text-3xl font-bold text-brand-dark mb-2">{t("orderPlaced")}</h2>
        <p className="text-stone-500 mb-8">{t("orderConfirmedMessage")}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/categories"
            className="bg-brand-primary text-white font-semibold rounded-xl px-6 py-3 hover:bg-brand-primary/85 transition-colors">
            {t("continueShopping")}
          </Link>
          <Link href="/profile"
            className="border border-brand-primary text-brand-primary font-semibold rounded-xl px-6 py-3 hover:bg-brand-primary/10 transition-colors">
            {t("viewProfile")}
          </Link>
        </div>
      </div>
    );
  }

  const placeOrder = async () => {
    if (!address.trim()) { setError(t("addressRequired")); return; }
    setLoading(true); setError(null);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deliveryAddress: address,
        paymentMethod: payment,
        totalPrice,
        items: items.map((i: any) => ({
          productId: i.type === "product" ? i.itemId : undefined,
          offerId: i.type === "offer" ? i.itemId : undefined,
          quantity: i.quantity,
          priceAtPurchase: i.price,
          name: i.name,
          nameAr: i.nameAr,
        })),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) { setError(data.error); return; }
    if (typeof clearCart === "function") clearCart();
    setOrderId(data.id);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Address */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h2 className="font-semibold text-brand-dark mb-4 text-lg">{t("deliveryAddress")}</h2>
        <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)}
          placeholder={t("addressPlaceholder")}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/40" />
      </section>

      {/* Payment */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h2 className="font-semibold text-brand-dark mb-4 text-lg">{t("paymentMethod")}</h2>
        <div className="space-y-3">
          {(["cash", "card"] as const).map((m) => (
            <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${payment === m ? "border-brand-primary bg-brand-primary/5" : "border-stone-200"}`}>
              <input type="radio" name="payment" value={m} checked={payment === m} onChange={() => setPayment(m)} className="accent-brand-primary" />
              <span className="font-medium text-brand-dark">{t(m === "cash" ? "cashOnDelivery" : "cardPayment")}</span>
            </label>
          ))}
          {payment === "card" && (
            <p className="text-sm text-stone-500 italic ps-4">{t("cardComingSoon")}</p>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h2 className="font-semibold text-brand-dark mb-4 text-lg">{t("orderSummary")}</h2>
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.itemId} className="flex justify-between text-sm text-stone-600">
              <span>{locale === "ar" && item.nameAr ? item.nameAr : item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-stone-100 pt-3 flex justify-between font-bold text-brand-dark">
            <span>{t("total")}</span>
            <span className="text-brand-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <button onClick={placeOrder} disabled={loading}
        className="w-full bg-brand-primary text-white font-bold rounded-xl py-4 text-lg hover:bg-brand-primary/85 disabled:opacity-50 transition-all">
        {loading ? t("placing") : t("placeOrder")}
      </button>
    </div>
  );
}
