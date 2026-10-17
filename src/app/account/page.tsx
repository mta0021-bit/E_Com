"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const ORDERS_KEY = "orders_v1";

  type Order = {
  id: string;
  date: string;
  total: number;
  itemsCount: number;
  status: string;
  userEmail?: string;
};

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      const allOrders = stored ? (JSON.parse(stored) as Order[]) : [];
      setOrders(
        allOrders
          .filter((o) => o.userEmail === user.email)
          .sort((a, b) => (a.date < b.date ? 1 : -1))
      );
    } catch (err) {
      setOrders([]);
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">My account</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Profile</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-600">Name</dt>
              <dd className="font-medium text-zinc-900">{user.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600">Email</dt>
              <dd className="font-medium text-zinc-900">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-600">Role</dt>
              <dd className="font-medium capitalize text-zinc-900">
                {user.role}
              </dd>
            </div>
          </dl>
          <button
            onClick={logout}
            className="mt-6 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Logout
          </button>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Order history</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-600">No orders yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="rounded-lg border bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        Order #{o.id.slice(-6)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(o.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-zinc-900">
                        ${o.total.toFixed(2)}
                      </p>
                      <p className="text-xs text-zinc-600">
                        {o.itemsCount} item{o.itemsCount === 1 ? "" : "s"} ·{" "}
                        {o.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
