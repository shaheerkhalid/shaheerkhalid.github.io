"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-cyan-400">🇦🇪</span>
          <span className="hidden sm:inline bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            UAE Classifieds
          </span>
          <span className="sm:hidden bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            UAE Ads
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/listings"
            className="text-slate-300 transition-colors hover:text-white"
          >
            Browse All
          </Link>
          <Link
            href="/listings?category=vehicles"
            className="text-slate-300 transition-colors hover:text-white"
          >
            Vehicles
          </Link>
          <Link
            href="/listings?category=property"
            className="text-slate-300 transition-colors hover:text-white"
          >
            Property
          </Link>
          <Link
            href="/listings?category=electronics"
            className="text-slate-300 transition-colors hover:text-white"
          >
            Electronics
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-slate-800 bg-slate-900 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link
              href="/listings"
              className="text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              Browse All Listings
            </Link>
            <Link
              href="/listings?category=vehicles"
              className="text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              🚗 Vehicles
            </Link>
            <Link
              href="/listings?category=property"
              className="text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              🏠 Property
            </Link>
            <Link
              href="/listings?category=electronics"
              className="text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              📱 Electronics
            </Link>
            <Link
              href="/listings?category=jobs"
              className="text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              💼 Jobs
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
