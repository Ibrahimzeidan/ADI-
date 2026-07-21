"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileMenu from "./ProfileMenu";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const t = useTranslations("nav");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-s-0 inset-e-0 z-40 bg-brand-dark transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/adi-logo.png" alt="ADI Lebanon logo"
              className="h-8 md:h-10 w-auto object-contain" />
            <span className="font-serif text-xl font-bold text-brand-secondary group-hover:text-brand-secondary/80 transition-colors">
              ADI Lebanon
            </span>
          </Link>

          <NavLinks className="hidden md:flex" />

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Cart */}
            <button onClick={() => setIsOpen(true)} aria-label="Open cart"
              className="relative p-2 text-stone-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -inset-e-0.5 w-4 h-4 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <ProfileMenu />

            {/* Hamburger */}
            <button className="md:hidden p-2 text-stone-300 hover:text-brand-secondary transition-colors"
              onClick={() => setMenuOpen((p) => !p)} aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
