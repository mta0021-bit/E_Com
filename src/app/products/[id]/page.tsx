"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const id = params?.id as string;
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border bg-white">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-emerald-700">{product.category}</p>
            <h1 className="mt-1 text-3xl font-semibold text-zinc-900">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-zinc-600">
              {product.description}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-zinc-500">per {product.unit}</p>
              </div>
              <p className="text-sm text-zinc-600">
                {product.stock} in stock
              </p>
            </div>
            <button
              onClick={() => addToCart(product.id)}
              className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
            <button
              onClick={() => router.push("/cart")}
              className="mt-3 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
            >
              Go to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
