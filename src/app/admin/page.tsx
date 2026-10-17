"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/data";

const ORDERS_KEY = "orders_v1";
const PRODUCTS_KEY = "products_v1";

  type OrderItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  };

  type Order = {
    id: string;
    userEmail: string;
    userName?: string;
    shippingAddress?: { name: string; address: string; city: string; zip: string };
    shipping: number;
    items: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
    date: string;
    itemsCount: number;
  };

export default function AdminPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/");
      return;
    }
    if (typeof window === "undefined") return;
    const baseProducts = getProducts();
    const storedProducts = localStorage.getItem(PRODUCTS_KEY);
    setProducts(storedProducts ? JSON.parse(storedProducts) : baseProducts);
    const storedOrders = localStorage.getItem(ORDERS_KEY);
    setOrders(storedOrders ? JSON.parse(storedOrders).reverse() : []);
  }, [user, isAdmin, router]);

  const updateProductStock = (id: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, stock) } : p))
    );
  };

  const saveProducts = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    alert("Products saved to local storage");
  };

  const markOrderShipped = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Shipped" } : o))
    );
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(ORDERS_KEY);
    const all = stored ? (JSON.parse(stored) as Order[]) : [];
    const updated = all.map((o) =>
      o.id === orderId ? { ...o, status: "Shipped" } : o
    );
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  if (!isAdmin) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Admin dashboard</h1>
      <div className="mt-6 space-y-8">
        <section className="rounded-xl border bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              Manage products
            </h2>
            <button
              onClick={saveProducts}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Save changes
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600">
                    Product
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600">
                    Category
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600">
                    Price
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900">
                          {p.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {p.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-zinc-600">{p.category}</td>
                    <td className="px-3 py-2 text-zinc-600">
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min={0}
                        value={p.stock}
                        onChange={(e) =>
                          updateProductStock(p.id, parseInt(e.target.value) || 0)
                        }
                        className="w-24 rounded-lg border bg-white px-2 py-1 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Orders</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-600">No orders yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="rounded-lg border bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        Order #{o.id.slice(-6)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(o.date).toLocaleString()} · {o.userEmail}
                      </p>
                      <p className="mt-2 text-xs text-zinc-600">
                        {o.shippingAddress?.address}, {o.shippingAddress?.city}{" "}
                        {o.shippingAddress?.zip}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-zinc-900">
                        ${o.total?.toFixed(2)}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {o.itemsCount} items · {o.status}
                      </p>
                      {o.status !== "Shipped" && (
                        <button
                          onClick={() => markOrderShipped(o.id)}
                          className="mt-2 rounded-lg border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                        >
                          Mark as shipped
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-xs text-zinc-600">
                    {o.items?.map((it: OrderItem, idx: number) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {it.name} × {it.quantity}
                        </span>
                        <span>${it.total?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
