import Link from "next/link";
import { getProducts } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const products = getProducts().slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Fresh groceries delivered to your door
            </h1>
            <p className="text-lg text-zinc-600">
              Shop produce, dairy, meat, pantry staples and more. Simple
              checkout, no fuss.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Shop all products
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
              >
                View cart
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm md:w-96">
            <h2 className="text-lg font-semibold text-zinc-900">
              Demo credentials
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-lg bg-zinc-50 p-3">
                <p className="font-medium text-zinc-900">Admin</p>
                <p className="text-zinc-600">admin@grocery.local</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-3">
                <p className="font-medium text-zinc-900">Customer (register)</p>
                <p className="text-zinc-600">
                  Create any email + password to test
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900">
            Featured products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
