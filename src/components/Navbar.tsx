"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-zinc-900">
            Toufik Ahmed
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/products"
            className="text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-1 text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-xs font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              Admin
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
