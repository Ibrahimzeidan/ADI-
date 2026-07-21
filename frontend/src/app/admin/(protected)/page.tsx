"use client";

import { useState } from "react";
import OverviewTab   from "@/components/admin/tabs/OverviewTab";
import OrdersTab     from "@/components/admin/tabs/OrdersTab";
import ProductsTab   from "@/components/admin/tabs/ProductsTab";
import CategoriesTab from "@/components/admin/tabs/CategoriesTab";
import OffersTab     from "@/components/admin/tabs/OffersTab";
import UsersTab      from "@/components/admin/tabs/UsersTab";
import ReviewsTab    from "@/components/admin/tabs/ReviewsTab";

const TABS = [
  { id: "overview",    label: "Overview",    icon: "◼" },
  { id: "orders",      label: "Orders",      icon: "📦" },
  { id: "products",    label: "Products",    icon: "🛍️" },
  { id: "categories",  label: "Categories",  icon: "🗂️" },
  { id: "offers",      label: "Offers",      icon: "🏷️" },
  { id: "users",       label: "Users",       icon: "👥" },
  { id: "reviews",     label: "Reviews",     icon: "⭐" },
];

const CONTENT: Record<string, React.ReactNode> = {
  overview:   <OverviewTab />,
  orders:     <OrdersTab />,
  products:   <ProductsTab />,
  categories: <CategoriesTab />,
  offers:     <OffersTab />,
  users:      <UsersTab />,
  reviews:    <ReviewsTab />,
};

export default function AdminDashboard() {
  const [active, setActive] = useState("overview");

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Dashboard</h1>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-2xl mb-6">
        {TABS.map(({ id, label, icon }) => (
          <button key={id} onClick={() => setActive(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${active === id ? "bg-white shadow-sm text-stone-900" : "text-stone-500 hover:text-stone-700"}`}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden p-4 sm:p-6">
        {CONTENT[active]}
      </div>
    </div>
  );
}
