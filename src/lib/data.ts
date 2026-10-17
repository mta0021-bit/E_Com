import { Product } from "@/lib/types";

export const CATEGORIES = [
  "All",
  "Fresh Produce",
  "Dairy & Eggs",
  "Bakery",
  "Meat & Seafood",
  "Pantry",
  "Snacks & Beverages",
  "Frozen",
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Organic Bananas",
    description: "Sweet, ripe bananas grown without synthetic pesticides.",
    price: 0.59,
    imageUrl:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fresh Produce",
    stock: 200,
    unit: "lb",
  },
  {
    id: "p2",
    name: "Strawberries (1 Pint)",
    description: "Juicy, locally-sourced strawberries packed fresh.",
    price: 3.49,
    imageUrl:
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fresh Produce",
    stock: 80,
    unit: "pint",
  },
  {
    id: "p3",
    name: "Large Brown Eggs (Dozen)",
    description: "Farm-fresh cage-free large brown eggs.",
    price: 4.29,
    imageUrl:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dairy & Eggs",
    stock: 120,
    unit: "doz",
  },
  {
    id: "p4",
    name: "Whole Milk (Gallon)",
    description: "Creamy, vitamin-D fortified whole milk.",
    price: 3.79,
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dairy & Eggs",
    stock: 60,
    unit: "gal",
  },
  {
    id: "p5",
    name: "Sourdough Loaf",
    description: "Crusty, artisan-style sourdough baked fresh daily.",
    price: 4.99,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Bakery",
    stock: 40,
    unit: "loaf",
  },
  {
    id: "p6",
    name: "Boneless Skinless Chicken Breast",
    description: "Lean, all-natural chicken breast perfect for any meal.",
    price: 6.99,
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Meat & Seafood",
    stock: 70,
    unit: "lb",
  },
  {
    id: "p7",
    name: "Wild-Caught Salmon Fillets",
    description: "Rich, flaky Atlantic salmon fillets.",
    price: 9.99,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Meat & Seafood",
    stock: 50,
    unit: "lb",
  },
  {
    id: "p8",
    name: "Extra Virgin Olive Oil (32 oz)",
    description: "Cold-pressed, high-quality extra virgin olive oil.",
    price: 7.99,
    imageUrl:
      "https://images.unsplash.com/photo-1521009423252-8ff5be3f6e1e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Pantry",
    stock: 90,
    unit: "btl",
  },
  {
    id: "p9",
    name: "Fresh Ground Coffee (12 oz)",
    description: "Medium roast, freshly ground arabica beans.",
    price: 8.49,
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Snacks & Beverages",
    stock: 110,
    unit: "bag",
  },
  {
    id: "p10",
    name: "Frozen Mixed Berries (16 oz)",
    description: "Flash-frozen blend of ripe mixed berries.",
    price: 3.99,
    imageUrl:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Frozen",
    stock: 150,
    unit: "bag",
  },
  {
    id: "p11",
    name: "Crisp Gala Apples",
    description: "Sweet and crunchy, perfect for snacking.",
    price: 1.49,
    imageUrl:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fresh Produce",
    stock: 300,
    unit: "lb",
  },
  {
    id: "p12",
    name: "Sharp Cheddar Cheese (8 oz)",
    description: "Aged sharp cheddar, perfect for sandwiches or cooking.",
    price: 3.99,
    imageUrl:
      "https://images.unsplash.com/photo-1624806992928-9c7a04a8383d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dairy & Eggs",
    stock: 85,
    unit: "blk",
  },
];

export function getProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string) {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
