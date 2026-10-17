"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart, cartCount } =
    useCart();
  const { user } = useAuth();

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { item, product, total: product.price * item.quantity };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null) as {
    item: { productId: string; quantity: number };
    product: NonNullable<ReturnType<typeof getProductById>>;
    total: number;
  }[];

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed bg-white px-6 py-16 text-center">
          <p className="text-lg font-medium text-zinc-900">Your cart is empty</p>
          <p className="mt-2 text-sm text-zinc-600">
            Add some fresh groceries to get started.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Shop products
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {lines.map(({ item, product, total }) => (
              <div
                key={item.productId}
                className="flex gap-4 rounded-xl border bg-white p-4"
              >
                <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg border">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      ${product.price.toFixed(2)} / {product.unit}
                    </p>
                    <p className="mt-1 text-sm font-medium text-zinc-900">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md text-lg leading-none hover:bg-zinc-50"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md text-lg leading-none hover:bg-zinc-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <button
                onClick={clearCart}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Clear cart
              </button>
              <Link
                href="/products"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Continue shopping
              </Link>
            </div>
          </div>
          <div className="h-fit rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-600">Subtotal ({cartCount} items)</dt>
                <dd className="font-medium text-zinc-900">
                  ${subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-600">Shipping</dt>
                <dd className="font-medium text-zinc-900">
                  ${shipping.toFixed(2)}
                </dd>
              </div>
              <div className="mt-4 border-t pt-4 flex justify-between">
                <dt className="text-base font-semibold text-zinc-900">Total</dt>
                <dd className="text-base font-semibold text-zinc-900">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {user ? "Proceed to checkout" : "Login to checkout"}
            </button>
            {!user && (
              <p className="mt-2 text-center text-xs text-zinc-600">
              You&apos;ll be redirected to login first.
            </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
