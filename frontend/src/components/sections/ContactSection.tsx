"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/constants";
import Button from "@/components/ui/Button";

const INPUT_CLASS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm transition-colors";

export default function ContactSection() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const contactItems = [
    { label: t("labelPhone"), value: COMPANY.phone,  icon: "📞" },
    { label: t("labelEmail"), value: COMPANY.email,  icon: "✉️" },
    { label: t("labelHours"), value: COMPANY.hours,  icon: "🕐" },
  ];

  return (
    <section id="contact" className="py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-secondary text-sm font-semibold uppercase tracking-widest mb-3">{t("badge")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">{t("heading")}</h2>
          <p className="text-stone-400 max-w-xl mx-auto">{t("subheading")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <h3 className="font-semibold text-brand-secondary mb-6">{t("directContact")}</h3>
            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-stone-200 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-white font-semibold text-lg">Message received!</p>
              <p className="text-stone-400 text-sm mt-2">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text"  placeholder={t("namePlaceholder")}    required className={INPUT_CLASS} />
                <input type="email" placeholder={t("emailPlaceholder")}   required className={INPUT_CLASS} />
              </div>
              <input type="text" placeholder={t("subjectPlaceholder")} className={INPUT_CLASS} />
              <textarea rows={4} placeholder={t("messagePlaceholder")} required className={`${INPUT_CLASS} resize-none`} />
              <Button label={t("send")} type="submit" variant="primary" className="w-full" />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
