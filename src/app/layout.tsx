import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts/Providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toufik Ahmed - Grocery Store",
  description: "Simple grocery ecommerce demo built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-white/80 backdrop-blur mt-12">
            <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-zinc-600">
              © {new Date().getFullYear()} Toufik Ahmed. Demo storefront.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
