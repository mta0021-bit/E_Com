"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, getItemQuantity } = useCart();
  const qty = getItemQuantity(product.id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/products/${product.id}`} className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-base font-semibold text-zinc-900">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
            {product.description}
          </p>
          <p className="mt-2 text-xs text-zinc-500">{product.category}</p>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-lg font-semibold text-zinc-900">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500">/{product.unit}</p>
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {qty > 0 ? `Add more (${qty})` : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
