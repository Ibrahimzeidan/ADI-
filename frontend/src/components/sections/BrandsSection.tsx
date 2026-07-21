// Server component — no interactivity, converted from client to reduce JS bundle.
import { getTranslations } from "next-intl/server";
import { BRANDS } from "@/lib/constants";
import Card from "@/components/ui/Card";

type BrandColor = "amber" | "green" | "rose";

const COLOR_MAP: Record<BrandColor, { bg: string; title: string; badge: string }> = {
  amber: { bg: "bg-brand-primary/8",    title: "text-brand-primary",   badge: "bg-brand-primary/15 text-brand-primary" },
  green: { bg: "bg-brand-accent/8",     title: "text-brand-accent",    badge: "bg-brand-accent/15 text-brand-accent" },
  rose:  { bg: "bg-brand-secondary/10", title: "text-brand-secondary", badge: "bg-brand-secondary/20 text-[#B8730A]" },
};

// Maps the brand id to the translation key prefix in messages/en.json and ar.json
const BRAND_KEY: Record<string, "adi" | "nutnow" | "adisso"> = {
  adi: "adi", nutnow: "nutnow", adisso: "adisso",
};

export default async function BrandsSection() {
  const t = await getTranslations("brands");

  return (
    <section id="brands" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("badge")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-4">{t("heading")}</h2>
          <p className="text-stone-500 max-w-xl mx-auto">{t("subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((brand) => {
            const colors = COLOR_MAP[brand.color] ?? COLOR_MAP.amber;
            const key = BRAND_KEY[brand.id];
            return (
              <Card key={brand.id} className={`${colors.bg} border border-stone-100`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${colors.badge}`}>
                  {t(`${key}Subtitle`)}
                </span>
                <h3 className={`font-serif text-3xl font-bold mb-3 ${colors.title}`}>{brand.name}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{t(`${key}Description`)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
