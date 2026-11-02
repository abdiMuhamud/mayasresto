/**
 * Menu highlights, based on dishes Maya's Resto has shown on its Instagram
 * (@mayasresto) and My Gambia listing. Categories follow the restaurant's own
 * Instagram highlights. No prices are published, so none are shown: the team
 * confirms prices and totals when they reply on WhatsApp. Add a `price` (GMD)
 * to any dish and it will appear on the site automatically.
 */

export type CategoryId = "breakfast" | "tapas" | "salads" | "wraps" | "mains" | "desserts" | "drinks";

export type DietaryTag = "vegetarian" | "vegan" | "seafood" | "favourite" | "spicy";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export interface Dish {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  /** Optional price in GMD. */
  price?: number;
  /** Real photo from the restaurant, if there is one. */
  image?: string;
  tags: DietaryTag[];
}

export const tagMeta: Record<DietaryTag, { label: string; className: string }> = {
  vegetarian: { label: "Vegetarian", className: "bg-sage-soft text-sage-deep ring-sage/60" },
  vegan: { label: "Vegan", className: "bg-sage-soft text-sage-deep ring-sage/60" },
  seafood: { label: "Seafood", className: "bg-sky-50 text-sky-800 ring-sky-200/70" },
  favourite: { label: "Maya's favourite", className: "bg-apricot-soft text-clay-dark ring-apricot/40" },
  spicy: { label: "Spicy", className: "bg-red-50 text-red-800 ring-red-200/70" },
};

export const categories: Category[] = [
  { id: "breakfast", label: "Breakfast", blurb: "From 9:30, indoors or out on the terrace." },
  { id: "tapas", label: "Tapas & Mezze", blurb: "Small plates and flatbreads, made for sharing." },
  { id: "salads", label: "Salads", blurb: "Fresh, crunchy and vegetarian-friendly." },
  { id: "wraps", label: "Wraps", blurb: "Warm flatbread, generously filled." },
  { id: "mains", label: "Mains", blurb: "Grills, seafood, burgers and pizza." },
  { id: "desserts", label: "Desserts", blurb: "Something sweet to finish." },
  { id: "drinks", label: "Drinks", blurb: "Fresh juices, smoothies, mocktails and coffee." },
];

const photo = (name: string) => `/images/${name}.webp`;

export const dishes: Dish[] = [
  // Breakfast
  {
    id: "banana-pancakes",
    category: "breakfast",
    name: "Banana Pancakes",
    description: "A fluffy stack with sliced banana and syrup.",
    image: photo("pancakes"),
    tags: ["vegetarian", "favourite"],
  },
  {
    id: "full-breakfast",
    category: "breakfast",
    name: "Maya's Full Breakfast",
    description: "Eggs your way with grilled sausages, beans, sautéed mushrooms and toast.",
    tags: [],
  },
  {
    id: "avocado-salmon-toast",
    category: "breakfast",
    name: "Avocado & Smoked Salmon Toast",
    description: "Smashed avocado on toast, topped with smoked salmon and fried eggs.",
    tags: ["seafood"],
  },
  {
    id: "shakshuka",
    category: "breakfast",
    name: "Shakshuka",
    description: "Eggs baked in a spiced tomato and pepper sauce, served with bread.",
    tags: ["vegetarian", "spicy"],
  },
  {
    id: "granola-bowl",
    category: "breakfast",
    name: "Granola & Fruit Bowl",
    description: "Crunchy granola with yoghurt and fresh fruit.",
    tags: ["vegetarian"],
  },

  // Tapas & mezze
  {
    id: "zaatar-manakish",
    category: "tapas",
    name: "Za'atar Manakish",
    description: "Flatbread baked with za'atar and olive oil.",
    image: photo("manakish-terrace"),
    tags: ["vegan", "favourite"],
  },
  {
    id: "cheese-manakish",
    category: "tapas",
    name: "Cheese Manakish",
    description: "Flatbread baked with melted cheese.",
    tags: ["vegetarian"],
  },
  {
    id: "falafel",
    category: "tapas",
    name: "Falafel",
    description: "Crisp chickpea falafel with tahini, pickles and flatbread.",
    tags: ["vegan"],
  },
  {
    id: "hummus",
    category: "tapas",
    name: "Hummus",
    description: "Creamy chickpea hummus with olive oil and warm flatbread.",
    tags: ["vegan"],
  },
  {
    id: "labneh",
    category: "tapas",
    name: "Labneh",
    description: "Strained yoghurt with olive oil, served with fresh vegetables.",
    tags: ["vegetarian"],
  },
  {
    id: "lahmacun",
    category: "tapas",
    name: "Lahmacun",
    description: "Thin flatbread topped with spiced minced meat, herbs and lemon.",
    tags: [],
  },
  {
    id: "sujuk",
    category: "tapas",
    name: "Sujuk",
    description: "Spiced sausage pan-fried with peppers and onions.",
    tags: ["spicy"],
  },

  // Salads
  {
    id: "fattoush",
    category: "salads",
    name: "Fattoush",
    description: "Crisp vegetables and herbs with toasted flatbread and a tangy dressing.",
    tags: ["vegan"],
  },
  {
    id: "quinoa-salad",
    category: "salads",
    name: "Quinoa Salad",
    description: "Quinoa with fresh vegetables and herbs.",
    tags: ["vegan"],
  },

  // Wraps
  {
    id: "kofta-wrap",
    category: "wraps",
    name: "Kofta Wrap",
    description: "Grilled spiced kofta in flatbread with salad and sauce.",
    tags: [],
  },
  {
    id: "falafel-wrap",
    category: "wraps",
    name: "Falafel Wrap",
    description: "Falafel, salad, pickles and tahini rolled in flatbread.",
    tags: ["vegan"],
  },
  {
    id: "chicken-wrap",
    category: "wraps",
    name: "Chicken Wrap",
    description: "Grilled chicken with salad and sauce in warm flatbread.",
    tags: [],
  },

  // Mains
  {
    id: "beef-burger",
    category: "mains",
    name: "Maya's Beef Burger",
    description: "Juicy patty, melted cheese and golden crispy fries.",
    image: photo("burger-fries"),
    tags: ["favourite"],
  },
  {
    id: "grilled-fish",
    category: "mains",
    name: "Grilled Fish Fillet",
    description: "With creamy mashed potato, seasonal vegetables and a green herb sauce.",
    image: photo("fish-prawns-mains"),
    tags: ["seafood"],
  },
  {
    id: "grilled-salmon",
    category: "mains",
    name: "Grilled Salmon",
    description: "Glazed salmon with fries and a fresh side salad.",
    image: photo("grilled-salmon"),
    tags: ["seafood"],
  },
  {
    id: "grilled-prawns",
    category: "mains",
    name: "Grilled Prawns",
    description: "Marinated prawns with fries, salad and a dipping sauce.",
    tags: ["seafood"],
  },
  {
    id: "kofta-plate",
    category: "mains",
    name: "Kofta Kebab Plate",
    description: "Grilled kofta skewers with fries, salad and flatbread.",
    tags: [],
  },
  {
    id: "pizza",
    category: "mains",
    name: "Pizza",
    description: "Hot and fresh from the oven.",
    image: photo("pizza"),
    tags: [],
  },

  // Desserts
  {
    id: "sfouf",
    category: "desserts",
    name: "Sfouf",
    description: "Lebanese semolina and turmeric cake topped with almonds.",
    image: photo("tiramisu-sfouf"),
    tags: ["vegetarian"],
  },
  {
    id: "tiramisu",
    category: "desserts",
    name: "Tiramisu",
    description: "Layers of coffee-soaked sponge and cream, dusted with cocoa.",
    tags: ["vegetarian"],
  },

  // Drinks
  {
    id: "fresh-juice",
    category: "drinks",
    name: "Fresh Juice",
    description: "Pressed to order, such as mango and orange.",
    tags: ["vegan"],
  },
  {
    id: "green-smoothie",
    category: "drinks",
    name: "Green Smoothie",
    description: "Blended fresh greens and fruit.",
    tags: ["vegan"],
  },
  {
    id: "lemon-mint-mocktail",
    category: "drinks",
    name: "Lemon & Mint Mocktail",
    description: "Alcohol-free and refreshing, with lemon and fresh mint.",
    tags: ["vegan"],
  },
  {
    id: "coffee-tea",
    category: "drinks",
    name: "Coffee & Tea",
    description: "Hot drinks to go with breakfast or a slice of cake.",
    tags: [],
  },
];

export const dishById = new Map(dishes.map((d) => [d.id, d]));

/** Dishes with real photos, in the order the kitchen gallery shows them. */
export const featured = [
  "zaatar-manakish",
  "grilled-fish",
  "banana-pancakes",
  "beef-burger",
  "grilled-salmon",
  "pizza",
  "sfouf",
]
  .map((id) => dishById.get(id))
  .filter((d): d is Dish & { image: string } => !!d?.image);
