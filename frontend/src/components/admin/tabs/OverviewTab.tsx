"use client";

import { useEffect, useState } from "react";

interface Stats { orders: number; products: number; users: number; reviews: number; pending: number; categories: number; }

export default function OverviewTab() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/orders").then(r => r.json()),
      fetch("/api/admin/products").then(r => r.json()),
      fetch("/api/admin/users").then(r => r.json()),
      fetch("/api/admin/reviews").then(r => r.json()),
      fetch("/api/admin/categories").then(r => r.json()),
    ]).then(([orders, products, users, reviews, cats]) => {
      const pending = orders.filter((o: any) => o.status === "pending").length;
      setStats({ orders: orders.length, products: products.length, users: users.length, reviews: reviews.length, pending, categories: cats.length });
    });
  }, []);

  if (!stats) return <p className="text-stone-400 text-sm py-8 text-center">Loading…</p>;

  const cards = [
    { label: "Total Orders",  value: stats.orders,     sub: `${stats.pending} pending`,    color: "text-amber-600" },
    { label: "Products",      value: stats.products,   sub: `${stats.categories} categories`, color: "text-blue-600" },
    { label: "Customers",     value: stats.users,      sub: "registered accounts",         color: "text-emerald-600" },
    { label: "Reviews",       value: stats.reviews,    sub: "all time",                    color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-2">
      {cards.map((c) => (
        <div key={c.label} className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
          <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
          <p className="font-semibold text-stone-700 mt-1 text-sm">{c.label}</p>
          <p className="text-stone-400 text-xs mt-0.5">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
