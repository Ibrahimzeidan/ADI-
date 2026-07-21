// ADI Lebanon product catalog seed data.
// IMPORTANT: Prices are demo placeholders — update with real prices before going live.

export const categories = [
  { name: "Nuts & Seeds", slug: "nuts-seeds", imageUrl: "https://picsum.photos/seed/nuts-seeds/600/600" },
  { name: "Snacks", slug: "snacks", imageUrl: "https://picsum.photos/seed/snacks/600/600" },
  { name: "Drinks", slug: "drinks", imageUrl: "https://picsum.photos/seed/drinks/600/600" },
  { name: "Sweets & Chocolate", slug: "sweets-chocolate", imageUrl: "https://picsum.photos/seed/sweets/600/600" },
  { name: "Kids Snacks", slug: "kids-snacks", imageUrl: "https://picsum.photos/seed/kids-snacks/600/600" },
  { name: "Healthy Options", slug: "healthy-options", imageUrl: "https://picsum.photos/seed/healthy/600/600" },
];

export const products = [
  // Nuts & Seeds
  { name: "Roasted Cashews", slug: "roasted-cashews", description: "Premium whole cashews lightly roasted and salted.", price: 4.5, imageUrl: "https://picsum.photos/seed/roasted-cashews/400/400", categorySlug: "nuts-seeds" },
  { name: "Mixed Nuts", slug: "mixed-nuts", description: "A hearty blend of cashews, almonds, walnuts and hazelnuts.", price: 5.0, imageUrl: "https://picsum.photos/seed/mixed-nuts/400/400", categorySlug: "nuts-seeds" },
  { name: "Raw Almonds", slug: "raw-almonds", description: "Whole natural almonds, unsalted and unroasted.", price: 3.75, imageUrl: "https://picsum.photos/seed/raw-almonds/400/400", categorySlug: "nuts-seeds" },
  { name: "Pistachio Kernels", slug: "pistachio-kernels", description: "Shelled roasted pistachios with a light salt finish.", price: 6.0, imageUrl: "https://picsum.photos/seed/pistachios/400/400", categorySlug: "nuts-seeds" },
  { name: "Sunflower Seeds", slug: "sunflower-seeds", description: "Toasted sunflower seeds, a perfect on-the-go snack.", price: 2.0, imageUrl: "https://picsum.photos/seed/sunflower-seeds/400/400", categorySlug: "nuts-seeds" },
  { name: "Pumpkin Seeds", slug: "pumpkin-seeds", description: "Roasted pumpkin seeds rich in zinc and magnesium.", price: 2.5, imageUrl: "https://picsum.photos/seed/pumpkin-seeds/400/400", categorySlug: "nuts-seeds" },

  // Snacks
  { name: "Corn Chips", slug: "corn-chips", description: "Crispy corn chips with a hint of sea salt.", price: 1.5, imageUrl: "https://picsum.photos/seed/corn-chips/400/400", categorySlug: "snacks" },
  { name: "Cheese Puffs", slug: "cheese-puffs", description: "Light and airy puffs with real cheddar flavour.", price: 1.25, imageUrl: "https://picsum.photos/seed/cheese-puffs/400/400", categorySlug: "snacks" },
  { name: "Popcorn Salted", slug: "popcorn-salted", description: "Classic lightly salted movie-style popcorn.", price: 1.0, imageUrl: "https://picsum.photos/seed/popcorn-salted/400/400", categorySlug: "snacks" },
  { name: "Tortilla Crisps", slug: "tortilla-crisps", description: "Thin baked tortilla crisps, great with dips.", price: 2.0, imageUrl: "https://picsum.photos/seed/tortilla-crisps/400/400", categorySlug: "snacks" },
  { name: "Pretzels", slug: "pretzels", description: "Mini twisted pretzels with a golden crust.", price: 1.75, imageUrl: "https://picsum.photos/seed/pretzels/400/400", categorySlug: "snacks" },

  // Drinks
  { name: "Mineral Water 500ml", slug: "mineral-water-500ml", description: "Still natural spring water from Lebanese mountains.", price: 0.75, imageUrl: "https://picsum.photos/seed/mineral-water/400/400", categorySlug: "drinks" },
  { name: "Orange Juice 250ml", slug: "orange-juice-250ml", description: "100% squeezed orange juice, no added sugar.", price: 1.5, imageUrl: "https://picsum.photos/seed/orange-juice/400/400", categorySlug: "drinks" },
  { name: "Iced Coffee Can", slug: "iced-coffee-can", description: "Cold brew iced coffee with oat milk.", price: 2.5, imageUrl: "https://picsum.photos/seed/iced-coffee/400/400", categorySlug: "drinks" },
  { name: "Energy Drink", slug: "energy-drink", description: "Classic energy drink with B-vitamins and caffeine.", price: 2.0, imageUrl: "https://picsum.photos/seed/energy-drink/400/400", categorySlug: "drinks" },

  // Sweets & Chocolate
  { name: "Dark Chocolate Bar", slug: "dark-chocolate-bar", description: "70% cacao dark chocolate, smooth and rich.", price: 2.5, imageUrl: "https://picsum.photos/seed/dark-chocolate/400/400", categorySlug: "sweets-chocolate" },
  { name: "Milk Chocolate Bar", slug: "milk-chocolate-bar", description: "Creamy milk chocolate, a timeless classic.", price: 2.0, imageUrl: "https://picsum.photos/seed/milk-chocolate/400/400", categorySlug: "sweets-chocolate" },
  { name: "Gummy Bears", slug: "gummy-bears", description: "Fruit-flavoured gummy bears in assorted colours.", price: 1.5, imageUrl: "https://picsum.photos/seed/gummy-bears/400/400", categorySlug: "sweets-chocolate" },
  { name: "Caramel Chews", slug: "caramel-chews", description: "Soft buttery caramel squares wrapped in wax paper.", price: 1.75, imageUrl: "https://picsum.photos/seed/caramel-chews/400/400", categorySlug: "sweets-chocolate" },

  // Kids Snacks
  { name: "Animal Crackers", slug: "animal-crackers", description: "Fun animal-shaped biscuits loved by kids of all ages.", price: 1.0, imageUrl: "https://picsum.photos/seed/animal-crackers/400/400", categorySlug: "kids-snacks" },
  { name: "Fruit Loops Cup", slug: "fruit-loops-cup", description: "Colourful cereal rings with fruity taste.", price: 1.25, imageUrl: "https://picsum.photos/seed/fruit-loops/400/400", categorySlug: "kids-snacks" },
  { name: "Mini Rice Cakes", slug: "mini-rice-cakes", description: "Light rice cakes in a kid-friendly snack pack.", price: 1.0, imageUrl: "https://picsum.photos/seed/rice-cakes/400/400", categorySlug: "kids-snacks" },
  { name: "Choco Sticks", slug: "choco-sticks", description: "Thin wafer sticks dipped in milk chocolate.", price: 1.5, imageUrl: "https://picsum.photos/seed/choco-sticks/400/400", categorySlug: "kids-snacks" },

  // Healthy Options
  { name: "Granola Bar", slug: "granola-bar", description: "Oats, honey, and almond granola bar with no artificial additives.", price: 2.0, imageUrl: "https://picsum.photos/seed/granola-bar/400/400", categorySlug: "healthy-options" },
  { name: "Dried Cranberries", slug: "dried-cranberries", description: "Tart-sweet cranberries, lightly sweetened with apple juice.", price: 2.5, imageUrl: "https://picsum.photos/seed/dried-cranberries/400/400", categorySlug: "healthy-options" },
  { name: "Protein Bites", slug: "protein-bites", description: "High-protein snack bites with chocolate and peanut butter flavour.", price: 3.0, imageUrl: "https://picsum.photos/seed/protein-bites/400/400", categorySlug: "healthy-options" },
  { name: "Chia Seed Pudding", slug: "chia-seed-pudding", description: "Ready-to-eat chia pudding with coconut milk and vanilla.", price: 3.5, imageUrl: "https://picsum.photos/seed/chia-pudding/400/400", categorySlug: "healthy-options" },
  { name: "Trail Mix", slug: "trail-mix", description: "Nuts, seeds, and dried fruit — energy for any adventure.", price: 3.25, imageUrl: "https://picsum.photos/seed/trail-mix/400/400", categorySlug: "healthy-options" },
];

export const offers = [
  {
    title: "Family Snack Bundle",
    titleAr: "حزمة سناكس عائلية",
    description: "Everything your family needs for a great movie night: chips, popcorn, gummies, and more.",
    descriptionAr: "كل ما تحتاجه عائلتك لليلة فيلم رائعة: شيبس وفشار وحلوى وأكثر.",
    imageUrl: "https://picsum.photos/seed/snack-bundle/600/400",
    originalPrice: 15.00,
    offerPrice: 11.00,
    isActive: true,
  },
  {
    title: "Premium Nuts Variety Pack",
    titleAr: "مجموعة مكسرات فاخرة",
    description: "A curated selection of our finest nuts: cashews, almonds, pistachios, and mixed nuts.",
    descriptionAr: "تشكيلة مختارة من أجود مكسراتنا: كاجو ولوز وفستق وخليط مكسرات.",
    imageUrl: "https://picsum.photos/seed/nuts-pack/600/400",
    originalPrice: 18.00,
    offerPrice: 13.50,
    isActive: true,
  },
  {
    title: "Juice & Sweets Combo",
    titleAr: "كومبو عصير وحلويات",
    description: "A refreshing combo: orange juice, milk chocolate bar, and gummy bears.",
    descriptionAr: "كومبو منعش: عصير برتقال وشوكولاتة حليب ودببة هلامية.",
    imageUrl: "https://picsum.photos/seed/juice-combo/600/400",
    originalPrice: 8.00,
    offerPrice: 5.50,
    isActive: true,
  },
  {
    title: "Back-to-School Snack Box",
    titleAr: "صندوق سناكس للمدرسة",
    description: "Perfect school snacks: animal crackers, rice cakes, granola bar, and a juice.",
    descriptionAr: "سناكس مدرسة مثالية: بسكويت حيوانات وكيك أرز وبار جرانولا وعصير.",
    imageUrl: "https://picsum.photos/seed/school-box/600/400",
    originalPrice: 12.00,
    offerPrice: 8.00,
    isActive: true,
  },
  {
    title: "Healthy Morning Box",
    titleAr: "صندوق الصباح الصحي",
    description: "Start your day right: trail mix, chia pudding, dried cranberries, and mineral water.",
    descriptionAr: "ابدأ يومك بشكل صحيح: خليط مكسرات وبذور شيا وتوت مجفف ومياه معدنية.",
    imageUrl: "https://picsum.photos/seed/morning-box/600/400",
    originalPrice: 14.00,
    offerPrice: 9.50,
    isActive: true,
  },
  {
    title: "Weekend Treats Bundle",
    titleAr: "حزمة عطلة نهاية الأسبوع",
    description: "Celebrate the weekend: dark chocolate, caramel chews, pretzels, and an energy drink.",
    descriptionAr: "احتفل بالعطلة: شوكولاتة داكنة وكراميل وبريتزل ومشروب طاقة.",
    imageUrl: "https://picsum.photos/seed/weekend-bundle/600/400",
    originalPrice: 10.00,
    offerPrice: 7.00,
    isActive: true,
  },
];
