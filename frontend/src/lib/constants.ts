// All editable company text, contact info, and links live here.
// Change a detail once here and it updates everywhere on the site automatically.

export const COMPANY = {
  name: "ADI Lebanon",
  tagline: "Three Generations of Quality Since 1949",
  mission:
    "Making daily shopping easier and more enjoyable with fresh, affordable, quality products — your go-to for convenience, value, and a great experience.",
  phone: "+961 76 012 231",
  email: "info@adilebanon.com",
  hours: "7:00 AM – 12:00 AM, Daily",
  instagram: "https://instagram.com/adilebanon",
  facebook: "https://facebook.com/adilebanon",
};

export const STORY = {
  founding:
    "In 1949, our grandfather opened a small shop in Saida, roasting nuts and crafting sweets with care — serving the community one handful at a time.",
  growth:
    "In 2009, a new generation took the helm, expanding the family vision into three distinct brands while keeping the same commitment to quality.",
  today:
    "Today, ADI Lebanon is a group of brands rooted in Saida — grown from one shop to serving families and businesses across Lebanon.",
  expansion:
    "In 2025, ADI opened a new production and distribution facility, positioning the group to meet national and international demand.",
};

export const BRANDS = [
  {
    id: "adi",
    name: "ADI",
    subtitle: "All Day Invitation",
    description:
      "Convenience stores offering snacks, drinks, groceries, and everyday essentials. Open early to late — everything you need, right when you need it.",
    color: "amber" as const,
  },
  {
    id: "nutnow",
    name: "Nutnow",
    subtitle: "Premium Nuts & Dried Fruits",
    description:
      "Imports and distributes top-quality nuts to shops, markets, and major supermarkets across Lebanon. From source to shelf, freshness guaranteed.",
    color: "green" as const,
  },
  {
    id: "adisso",
    name: "Adisso",
    subtitle: "Fresh Café & Desserts",
    description:
      "A modern café serving fresh juices, desserts, and baked goods crafted daily. A place to pause, refresh, and enjoy something made with care.",
    color: "rose" as const,
  },
];

export const LOCATIONS = [
  {
    id: "sharqy",
    name: "ADI Sharqy",
    address: "Sharqy Highway, Saida, Lebanon",
    phone: "+961 76 012 231",
    hours: "7:00 AM – 12:00 AM",
  },
  {
    id: "arabi",
    name: "ADI Arabi",
    address: "Arabi Roundabout, Saida, Lebanon",
    phone: "+961 76 012 231",
    hours: "7:00 AM – 12:00 AM",
  },
];

// key maps to the nav.{key} translation entry in messages/en.json + messages/ar.json
// href uses /# so links work from any page (e.g. /categories), not just the homepage
export const NAV_LINKS = [
  { key: "home",      href: "/" },
  { key: "about",     href: "/#about" },
  { key: "brands",    href: "/#brands" },
  { key: "locations", href: "/#locations" },
  { key: "contact",   href: "/#contact" },
  { key: "shop",      href: "/categories" },
] as const;
