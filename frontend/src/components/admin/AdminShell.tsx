"use client";

// Client shell for the admin protected layout.
// On desktop: persistent sidebar. On mobile: sidebar overlays when the menu icon is tapped.
import { useState } from "react";
import AdminNav from "./AdminNav";

export default function AdminShell({ adminName, children }: { adminName: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Backdrop for mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar — always visible on md+, slide-in on mobile */}
      <aside className={`fixed inset-y-0 start-0 z-40 w-56 transition-transform duration-200
        md:static md:translate-x-0 md:z-auto
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <AdminNav adminName={adminName} onClose={() => setOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-stone-900 sticky top-0 z-20">
          <button onClick={() => setOpen(true)} className="text-stone-300 hover:text-white" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-white font-bold text-sm">ADI Admin</span>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
