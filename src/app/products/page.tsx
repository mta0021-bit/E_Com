"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, getProducts } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

export default function ProductsPage() {
  const allProducts = getProducts();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchTerm]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "border bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>
      <div className="mt-6">
        <ProductGrid
          products={filtered}
          emptyMessage="No products match your filters."
        />
      </div>
    </div>
  );
}
