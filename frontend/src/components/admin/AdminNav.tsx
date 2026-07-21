"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin",          label: "Dashboard",  icon: "◼" },
  { href: "/admin/orders",   label: "Orders",     icon: "📦" },
  { href: "/admin/products", label: "Products",   icon: "🛍️" },
  { href: "/admin/offers",   label: "Offers",     icon: "🏷️" },
  { href: "/admin/users",    label: "Users",      icon: "👥" },
  { href: "/admin/reviews",  label: "Reviews",    icon: "⭐" },
  { href: "/admin/settings", label: "Settings",   icon: "⚙️" },
];

export default function AdminNav({ adminName, onClose }: { adminName: string; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="w-56 bg-stone-900 min-h-screen flex flex-col">
      <div className="px-5 py-5 border-b border-stone-700">
        <p className="text-white font-bold text-sm">ADI Admin</p>
        <p className="text-stone-400 text-xs mt-0.5 truncate">{adminName}</p>
      </div>

      <nav className="flex-1 py-3">
        {links.map(({ href, label, icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors
                ${active ? "bg-brand-primary text-white font-semibold" : "text-stone-300 hover:bg-stone-800 hover:text-white"}`}>
              <span>{icon}</span>{label}
            </Link>
          );
        })}
      </nav>

      <form action="/api/auth/signout" method="POST" className="p-4">
        <button type="submit"
          className="w-full text-stone-400 text-xs hover:text-white transition-colors text-left px-1">
          Sign out →
        </button>
      </form>
    </div>
  );
}
