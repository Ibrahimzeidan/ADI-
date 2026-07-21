// Server component — no interactivity, converted from client to reduce JS bundle.
import { getTranslations } from "next-intl/server";

export default async function AboutSection() {
  const t = await getTranslations("about");

  const milestones = [
    { year: "1949", label: t("milestone1949Label"), text: t("milestone1949Text") },
    { year: "2009", label: t("milestone2009Label"), text: t("milestone2009Text") },
    { year: "Today", label: t("milestoneNowLabel"), text: t("milestoneNowText") },
    { year: "2025", label: t("milestone2025Label"), text: t("milestone2025Text") },
  ];

  return (
    <section id="about" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("badge")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark">{t("heading")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {milestones.map((item) => (
            <div key={item.year} className="flex gap-5">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs text-center leading-tight px-1">{item.year}</span>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="font-semibold text-brand-dark mb-1">{item.label}</h3>
                <p className="text-stone-500 leading-relaxed text-sm sm:text-base">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="w-12 h-1 bg-brand-primary mx-auto mb-6 rounded-full" />
          <blockquote className="font-serif text-2xl sm:text-3xl text-brand-dark italic leading-relaxed">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
