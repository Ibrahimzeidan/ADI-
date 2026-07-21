// Static mock data — used when DATABASE_URL is not set (UI testing without a database).
// Mirrors the shape Prisma would return, including the new nameAr/descriptionAr fields.

import type { Category } from "@prisma/client";
import type { ProductWithCategory } from "./types";

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Nuts & Seeds",       slug: "nuts-seeds",       imageUrl: "https://picsum.photos/seed/nuts-seeds/600/600" },
  { id: "cat-2", name: "Snacks",              slug: "snacks",           imageUrl: "https://picsum.photos/seed/snacks/600/600" },
  { id: "cat-3", name: "Drinks",              slug: "drinks",           imageUrl: "https://picsum.photos/seed/drinks/600/600" },
  { id: "cat-4", name: "Sweets & Chocolate",  slug: "sweets-chocolate", imageUrl: "https://picsum.photos/seed/sweets/600/600" },
  { id: "cat-5", name: "Kids Snacks",         slug: "kids-snacks",      imageUrl: "https://picsum.photos/seed/kids-snacks/600/600" },
  { id: "cat-6", name: "Healthy Options",     slug: "healthy-options",  imageUrl: "https://picsum.photos/seed/healthy/600/600" },
];

const cat = (id: string) => MOCK_CATEGORIES.find((c) => c.id === id)!;

const p = (
  id: string, name: string, nameAr: string, slug: string,
  description: string, descriptionAr: string,
  price: number, imageSlug: string, categoryId: string
): ProductWithCategory => ({
  id, name, nameAr, slug, description, descriptionAr,
  price, imageUrl: `https://picsum.photos/seed/${imageSlug}/400/400`,
  categoryId, createdAt: new Date("2025-01-01"), category: cat(categoryId),
});

export const MOCK_PRODUCTS: ProductWithCategory[] = [
  // Nuts & Seeds
  p("p-1",  "Roasted Cashews",   "كاجو محمّص",           "roasted-cashews",   "Premium whole cashews lightly roasted and salted.",         "كاجو كامل فاخر محمّص ومملّح بخفة.",                     4.50, "roasted-cashews",   "cat-1"),
  p("p-2",  "Mixed Nuts",        "مكسرات مشكّلة",         "mixed-nuts",        "A hearty blend of cashews, almonds, walnuts and hazelnuts.","مزيج فاخر من الكاجو واللوز والجوز والبندق.",             5.00, "mixed-nuts",        "cat-1"),
  p("p-3",  "Raw Almonds",       "لوز طبيعي",             "raw-almonds",       "Whole natural almonds, unsalted and unroasted.",            "لوز كامل طبيعي غير مملّح وغير محمّص.",                  3.75, "raw-almonds",       "cat-1"),
  p("p-4",  "Pistachio Kernels", "حبوب فستق",             "pistachio-kernels", "Shelled roasted pistachios with a light salt finish.",      "فستق محمّص مقشّر بلمسة ملح خفيفة.",                     6.00, "pistachios",        "cat-1"),
  p("p-5",  "Sunflower Seeds",   "بذور عباد الشمس",        "sunflower-seeds",   "Toasted sunflower seeds, a perfect on-the-go snack.",       "بذور عباد الشمس المحمّصة، وجبة خفيفة مثالية.",          2.00, "sunflower-seeds",   "cat-1"),
  p("p-6",  "Pumpkin Seeds",     "بذور القرع",             "pumpkin-seeds",     "Roasted pumpkin seeds rich in zinc and magnesium.",         "بذور قرع محمّصة غنية بالزنك والمغنيزيوم.",              2.50, "pumpkin-seeds",     "cat-1"),
  // Snacks
  p("p-7",  "Corn Chips",        "رقائق ذرة",             "corn-chips",        "Crispy corn chips with a hint of sea salt.",               "رقائق ذرة مقرمشة مع لمسة ملح البحر.",                  1.50, "corn-chips",        "cat-2"),
  p("p-8",  "Cheese Puffs",      "نفّاخات جبنة",           "cheese-puffs",      "Light and airy puffs with real cheddar flavour.",          "نفّاخات خفيفة بنكهة الجبنة الحقيقية.",                  1.25, "cheese-puffs",      "cat-2"),
  p("p-9",  "Popcorn Salted",    "فشّار مملّح",            "popcorn-salted",    "Classic lightly salted movie-style popcorn.",              "فشّار كلاسيكي بالملح الخفيف.",                          1.00, "popcorn-salted",    "cat-2"),
  p("p-10", "Tortilla Crisps",   "تورتيلا مقرمش",          "tortilla-crisps",   "Thin baked tortilla crisps, great with dips.",             "رقائق تورتيلا رفيعة مخبوزة، رائعة مع الغموس.",         2.00, "tortilla-crisps",   "cat-2"),
  p("p-11", "Pretzels",          "برتزل",                 "pretzels",          "Mini twisted pretzels with a golden crust.",               "برتزل مصغّر ملتوي بقشرة ذهبية.",                        1.75, "pretzels",          "cat-2"),
  // Drinks
  p("p-12", "Mineral Water",     "مياه معدنية",            "mineral-water-500ml","Still natural spring water from Lebanese mountains.",     "مياه ينابيع طبيعية من الجبال اللبنانية.",               0.75, "mineral-water",     "cat-3"),
  p("p-13", "Orange Juice",      "عصير برتقال",            "orange-juice-250ml","100% squeezed orange juice, no added sugar.",             "عصير برتقال طازج ١٠٠٪ بدون سكر مضاف.",                 1.50, "orange-juice",      "cat-3"),
  p("p-14", "Iced Coffee Can",   "قهوة مثلجة",             "iced-coffee-can",   "Cold brew iced coffee with oat milk.",                     "قهوة كولد برو مثلجة بحليب الشوفان.",                    2.50, "iced-coffee",       "cat-3"),
  p("p-15", "Energy Drink",      "مشروب طاقة",             "energy-drink",      "Classic energy drink with B-vitamins and caffeine.",       "مشروب طاقة كلاسيكي بفيتامينات ب والكافيين.",           2.00, "energy-drink",      "cat-3"),
  // Sweets
  p("p-16", "Dark Chocolate Bar","شوكولاتة داكنة",          "dark-chocolate-bar","70% cacao dark chocolate, smooth and rich.",              "شوكولاتة داكنة كاكاو ٧٠٪ ناعمة وغنية.",               2.50, "dark-chocolate",    "cat-4"),
  p("p-17", "Milk Chocolate Bar","شوكولاتة بالحليب",        "milk-chocolate-bar","Creamy milk chocolate, a timeless classic.",               "شوكولاتة بالحليب الكريمية، طعم لا يُنسى.",             2.00, "milk-chocolate",    "cat-4"),
  p("p-18", "Gummy Bears",       "دبب جيلاتين",            "gummy-bears",       "Fruit-flavoured gummy bears in assorted colours.",         "دبب جيلاتين بنكهات الفواكه المتنوعة.",                  1.50, "gummy-bears",       "cat-4"),
  p("p-19", "Caramel Chews",     "حلوى كراميل",            "caramel-chews",     "Soft buttery caramel squares wrapped in wax paper.",       "مربعات كراميل طرية ملفوفة بورق الشمع.",                 1.75, "caramel-chews",     "cat-4"),
  // Kids
  p("p-20", "Animal Crackers",   "بسكويت حيوانات",         "animal-crackers",   "Fun animal-shaped biscuits loved by kids of all ages.",    "بسكويت على شكل حيوانات، محبوب من الكبار والصغار.",      1.00, "animal-crackers",   "cat-5"),
  p("p-21", "Fruit Loops Cup",   "حبوب فواكه ملونة",        "fruit-loops-cup",   "Colourful cereal rings with fruity taste.",                "حبوب حبوب ملونة بنكهة الفواكه.",                        1.25, "fruit-loops",       "cat-5"),
  p("p-22", "Mini Rice Cakes",   "كعكات أرز صغيرة",         "mini-rice-cakes",   "Light rice cakes in a kid-friendly snack pack.",           "كعكات أرز خفيفة في عبوة مناسبة للأطفال.",              1.00, "rice-cakes",        "cat-5"),
  p("p-23", "Choco Sticks",      "عصي شوكولاتة",           "choco-sticks",      "Thin wafer sticks dipped in milk chocolate.",              "عصي ويفر رفيعة مغموسة بالشوكولاتة بالحليب.",           1.50, "choco-sticks",      "cat-5"),
  // Healthy
  p("p-24", "Granola Bar",       "بار جرانولا",            "granola-bar",       "Oats, honey, and almond granola bar, no artificial additives.","بار شوفان وعسل ولوز بدون مضافات اصطناعية.",        2.00, "granola-bar",       "cat-6"),
  p("p-25", "Dried Cranberries", "توت بري مجفف",           "dried-cranberries", "Tart-sweet cranberries, lightly sweetened with apple juice.","توت بري مجفف محلّى بعصير التفاح.",                 2.50, "dried-cranberries", "cat-6"),
  p("p-26", "Protein Bites",     "لقيمات بروتين",          "protein-bites",     "High-protein snack bites with chocolate and peanut butter.","لقيمات بروتين عالية بنكهة الشوكولاتة وزبدة الفول السوداني.", 3.00, "protein-bites", "cat-6"),
  p("p-27", "Chia Seed Pudding", "حلوى بذور شيا",          "chia-seed-pudding", "Ready-to-eat chia pudding with coconut milk and vanilla.",  "حلوى جاهزة بذور الشيا بحليب جوز الهند والفانيليا.",    3.50, "chia-pudding",      "cat-6"),
  p("p-28", "Trail Mix",         "خليط المشاة",            "trail-mix",         "Nuts, seeds, and dried fruit — energy for any adventure.", "مكسرات وبذور وفواكه مجففة — طاقة لأي مغامرة.",         3.25, "trail-mix",         "cat-6"),
];
