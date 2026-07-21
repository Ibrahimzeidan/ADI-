// Server component — no interactivity, converted from client to reduce JS bundle.
import { getTranslations } from "next-intl/server";
import { LOCATIONS } from "@/lib/constants";
import Card from "@/components/ui/Card";

function PinIcon() {
  return (
    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default async function LocationsSection() {
  const t = await getTranslations("locations");

  return (
    <section id="locations" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("badge")}</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-4">{t("heading")}</h2>
          <p className="text-stone-500 max-w-xl mx-auto">{t("subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {LOCATIONS.map((location, i) => (
            <Card key={location.id} className="relative">
              <div className="absolute top-4 inset-e-4 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mt-1">
                  <PinIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-lg mb-1">{location.name}</h3>
                  <p className="text-stone-500 text-sm mb-4">{location.address}</p>
                  <div className="space-y-1 text-xs text-stone-500">
                    <p>📞 {location.phone}</p>
                    <p>🕐 {location.hours}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
