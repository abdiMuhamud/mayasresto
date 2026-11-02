export type CategoryId = "bowls" | "grill" | "seafood" | "drinks";

export type DietaryTag =
  | "vegan"
  | "vegetarian"
  | "chef"
  | "premium"
  | "local"
  | "gluten-free"
  | "spicy"
  | "signature";

export interface Category {
  id: CategoryId;
  emoji: string;
  label: string;
  shortLabel: string;
  blurb: string;
}

export interface Dish {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  /** Price in Gambian dalasi (GMD). */
  price: number;
  image: string;
  tags: DietaryTag[];
}

export const tagMeta: Record<DietaryTag, { label: string; emoji: string; className: string }> = {
  vegan: { label: "Vegan", emoji: "🌱", className: "bg-emerald-50 text-emerald-800 ring-emerald-200/70" },
  vegetarian: { label: "Vegetarian", emoji: "🥚", className: "bg-lime-50 text-lime-800 ring-lime-200/70" },
  chef: { label: "Chef Special", emoji: "🔥", className: "bg-clay-soft text-clay-dark ring-clay/25" },
  premium: { label: "Premium Cut", emoji: "🥩", className: "bg-rose-50 text-rose-800 ring-rose-200/70" },
  local: { label: "Local Catch", emoji: "🌊", className: "bg-sky-50 text-sky-800 ring-sky-200/70" },
  "gluten-free": { label: "Gluten-Free", emoji: "🌾", className: "bg-amber-50 text-amber-800 ring-amber-200/70" },
  spicy: { label: "Spicy", emoji: "🌶️", className: "bg-red-50 text-red-800 ring-red-200/70" },
  signature: { label: "Signature", emoji: "✨", className: "bg-[#f5ecd8] text-[#7a5d1f] ring-brass/30" },
};

export const categories: Category[] = [
  {
    id: "bowls",
    emoji: "🥗",
    label: "Fresh Salads & Quinoa Bowls",
    shortLabel: "Salads & Bowls",
    blurb: "Maya's signature vegan and healthy plates, built on garden produce from local growers.",
  },
  {
    id: "grill",
    emoji: "🥩",
    label: "Argentinian Steakhouse Grill & Skewers",
    shortLabel: "Grill & Skewers",
    blurb: "Prime cuts over open flame, finished with house chimichurri and smoked sea salt.",
  },
  {
    id: "seafood",
    emoji: "🦐",
    label: "Atlantic Seafood & Local Catch",
    shortLabel: "Seafood",
    blurb: "Landed each morning at Tanji and Bakau, grilled simply so the ocean speaks first.",
  },
  {
    id: "drinks",
    emoji: "🍹",
    label: "Artisanal Cocktails & Fresh Juices",
    shortLabel: "Cocktails & Juices",
    blurb: "West African botanicals—wonjo, baobab, ginger—shaken into something new.",
  },
];

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=75`;

export const dishes: Dish[] = [
  // ── Salads & Bowls ──────────────────────────────────────────────
  {
    id: "rainbow-quinoa",
    category: "bowls",
    name: "Rainbow Quinoa Bowl",
    description:
      "Tri-colour quinoa, roasted sweet potato, chickpeas, avocado and pickled red onion with a baobab-lime tahini.",
    price: 650,
    image: img("1512621776951-a57141f2eefd"),
    tags: ["vegan", "signature", "gluten-free"],
  },
  {
    id: "tropic-avocado-mango",
    category: "bowls",
    name: "Tropic Avocado & Mango Salad",
    description:
      "Ripe Gambian mango, avocado, cucumber ribbons and toasted cashews, dressed in passion fruit vinaigrette.",
    price: 580,
    image: img("1484980972926-edee96e0960d"),
    tags: ["vegan", "gluten-free"],
  },
  {
    id: "garden-greens",
    category: "bowls",
    name: "Kololi Garden Greens",
    description:
      "Crisp leaves, heirloom tomatoes, radish, toasted seeds and fresh herbs with a cold-pressed citrus dressing.",
    price: 520,
    image: img("1540189549336-e6e99c3679fe"),
    tags: ["vegan", "gluten-free"],
  },
  {
    id: "buddha-bowl",
    category: "bowls",
    name: "Maya's Buddha Bowl",
    description:
      "Soft-boiled egg, smashed avocado, charred broccoli, edamame and brown rice with a sesame-ginger glaze.",
    price: 690,
    image: img("1490645935967-10de6ba17061"),
    tags: ["vegetarian", "chef"],
  },
  {
    id: "salmon-poke",
    category: "bowls",
    name: "Coastal Salmon Quinoa Bowl",
    description: "Seared salmon over quinoa with crunchy slaw, avocado, sesame and a light soy-citrus dressing.",
    price: 890,
    image: img("1546069901-ba9599a7e63c"),
    tags: ["gluten-free"],
  },

  // ── Grill & Skewers ─────────────────────────────────────────────
  {
    id: "bife-de-chorizo",
    category: "grill",
    name: "Bife de Chorizo · 350g",
    description:
      "Argentinian-style sirloin, flame-grilled to order and rested in herb butter. Served with chimichurri and rustic fries.",
    price: 1950,
    image: img("1558030006-450675393462"),
    tags: ["premium", "chef"],
  },
  {
    id: "ribeye",
    category: "grill",
    name: "Dry-Aged Ribeye · 400g",
    description:
      "Richly marbled, charred over hardwood embers and sliced at the table. Smoked sea salt and roasted garlic.",
    price: 2450,
    image: img("1529692236671-f1f6cf9683ba"),
    tags: ["premium", "gluten-free"],
  },
  {
    id: "steak-frites",
    category: "grill",
    name: "Entraña Steak Frites",
    description: "Tender skirt steak with salsa criolla, hand-cut fries and a peppery rocket salad.",
    price: 1550,
    image: img("1600891964092-4316c288032e"),
    tags: ["chef"],
  },
  {
    id: "beef-brochettes",
    category: "grill",
    name: "Chimichurri Beef & Lamb Skewers",
    description:
      "Marinated beef and lamb brochettes with charred peppers and onions, finished with a spicy yassa-style glaze.",
    price: 1250,
    image: img("1529193591184-b1d58069ecdd"),
    tags: ["spicy"],
  },
  {
    id: "asado-platter",
    category: "grill",
    name: "Asado Sharing Platter (for two)",
    description:
      "Sirloin, short rib, chorizo and chicken thigh from the parrilla, with three sauces, grilled corn and garden salad.",
    price: 3200,
    image: img("1544025162-d76694265947"),
    tags: ["premium", "signature"],
  },

  // ── Seafood ─────────────────────────────────────────────────────
  {
    id: "catch-of-the-day",
    category: "seafood",
    name: "Tanji Catch of the Day",
    description:
      "Whole lady fish, barracuda or snapper—ask your server—grilled with lemon, garlic and Atlantic sea herbs.",
    price: 1350,
    image: img("1615141982883-c7ad0e69fd62"),
    tags: ["local", "chef", "gluten-free"],
  },
  {
    id: "gambas-ajillo",
    category: "seafood",
    name: "Garlic Butter Gambas",
    description: "Jumbo Atlantic prawns sizzled in garlic, chilli and white wine butter, with grilled sourdough.",
    price: 1450,
    image: img("1565680018434-b513d5e5fd47"),
    tags: ["local", "spicy"],
  },
  {
    id: "lemon-grilled-fish",
    category: "seafood",
    name: "Lemon-Herb Grilled Fillet",
    description:
      "Butterflied local white fish with charred lemon, capers and crushed new potatoes with dill crème fraîche.",
    price: 1150,
    image: img("1532550907401-a500c9a57435"),
    tags: ["local", "gluten-free"],
  },
  {
    id: "ceviche",
    category: "seafood",
    name: "Senegambia Ceviche",
    description: "Lime-cured catch with mango, red onion, coriander and a whisper of scotch bonnet. Plantain crisps.",
    price: 950,
    image: img("1535399831218-d5bd36d1a6b3"),
    tags: ["local", "spicy", "gluten-free"],
  },
  {
    id: "seared-salmon",
    category: "seafood",
    name: "Seared Atlantic Salmon",
    description: "Crisp-skinned salmon on a bed of seasonal greens with lemon beurre blanc and herb oil.",
    price: 1650,
    image: img("1519708227418-c8fd9a32b7a2"),
    tags: ["premium"],
  },

  // ── Cocktails & Juices ──────────────────────────────────────────
  {
    id: "wonjo-spritz",
    category: "drinks",
    name: "Wonjo Hibiscus Spritz",
    description: "Gambian hibiscus cordial, dry gin, prosecco and dried orange. Bright, floral and gently tart.",
    price: 450,
    image: img("1536935338788-846bb9981813"),
    tags: ["signature"],
  },
  {
    id: "kololi-old-fashioned",
    category: "drinks",
    name: "Kololi Sunset Old Fashioned",
    description: "Bourbon stirred with local mangrove honey, orange bitters and a smoked cinnamon twist.",
    price: 550,
    image: img("1514362545857-3bc16c4c7d1b"),
    tags: ["chef"],
  },
  {
    id: "baobab-mojito",
    category: "drinks",
    name: "Baobab Mojito",
    description: "White rum, fresh mint, lime and creamy baobab (bouye) fruit, topped with soda.",
    price: 420,
    image: img("1551538827-9c037cb4f32a"),
    tags: ["signature"],
  },
  {
    id: "jinjaa-cooler",
    category: "drinks",
    name: "Jinjaa Ginger Cooler",
    description: "Fiery fresh-pressed ginger, lemon and mint over crushed ice. Alcohol-free, house favourite.",
    price: 220,
    image: img("1621263764928-df1444c5e859"),
    tags: ["vegan"],
  },
  {
    id: "cold-pressed-trio",
    category: "drinks",
    name: "Cold-Pressed Juice",
    description: "Choose green detox, beet & berry, or carrot-turmeric. Pressed to order from market produce.",
    price: 280,
    image: img("1622597467836-f3285f2131b8"),
    tags: ["vegan", "gluten-free"],
  },
  {
    id: "fresh-orange",
    category: "drinks",
    name: "Fresh Squeezed Orange",
    description: "Sweet local oranges, squeezed when you order. Nothing added.",
    price: 200,
    image: img("1600271886742-f049cd451bba"),
    tags: ["vegan", "gluten-free"],
  },
];

export const dishById = new Map(dishes.map((d) => [d.id, d]));
