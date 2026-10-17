"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { getProductById } from "@/lib/data";

const ORDERS_KEY = "orders_v1";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, cartCount } = useCart();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/30");
  const [cardCvc, setCardCvc] = useState("123");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !name) {
      setName(user.name);
    }
  }, [user, name]);

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
  }, [user, items, router]);

  if (!user || items.length === 0) return null;

  type Line = {
    product: NonNullable<ReturnType<typeof getProductById>>;
    quantity: number;
    total: number;
  };

  const lines: Line[] = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity, total: product.price * item.quantity };
    })
    .filter((l): l is Line => l !== null);

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const shipping = 5.0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800)); // simulate processing
    try {
      const order = {
        id: `ord_${Date.now()}`,
        userEmail: user.email,
        userName: name,
        shippingAddress: { name, address, city, zip },
        items: lines.map((l) => ({
          productId: l.product.id,
          name: l.product.name,
          price: l.product.price,
          quantity: l.quantity,
          total: l.total,
        })),
        subtotal,
        shipping,
        total,
        status: "Paid (Test)",
        date: new Date().toISOString(),
        itemsCount: cartCount,
      };
      const stored = localStorage.getItem(ORDERS_KEY);
      const all = stored ? (JSON.parse(stored) as Record<string, unknown>[]) : [];
      all.push(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
      clearCart();
      router.push(`/checkout/success?order=${order.id}`);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      setPlacing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Shipping information
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Payment (Stripe test mode simulation)
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Use test card <strong>4242 4242 4242 4242</strong> with any future
              expiry and CVC.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Card number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">
                  Expiry (MM/YY)
                </label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">
                  CVC
                </label>
                <input
                  type="text"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="h-fit rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            {lines.map((l) => (
              <div key={l.product.id} className="flex justify-between">
                <span className="text-zinc-600">
                  {l.product.name} × {l.quantity}
                </span>
                <span className="font-medium text-zinc-900">
                  ${l.total.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <dl className="mt-4 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600">Subtotal</dt>
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
            <div className="mt-4 flex justify-between border-t pt-4">
              <dt className="text-base font-semibold text-zinc-900">Total</dt>
              <dd className="text-base font-semibold text-zinc-900">
                ${total.toFixed(2)}
              </dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={placing}
            className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {placing ? "Placing order..." : `Place order - $${total.toFixed(2)}`}
          </button>
          <p className="mt-2 text-center text-xs text-zinc-600">
            This is a Stripe test payment (no real charge).
          </p>
        </div>
      </form>
    </div>
  );
}
