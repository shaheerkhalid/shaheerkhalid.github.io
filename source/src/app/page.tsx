import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import CategoryGrid from "@/components/CategoryGrid";
import { featuredListings, listings } from "@/data/listings";
import { categories } from "@/data/categories";

export default function HomePage() {
  const recent = [...listings]
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    )
    .slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find anything in the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              UAE
            </span>
          </h1>
          <p className="mb-8 text-base text-slate-400 sm:text-lg">
            Browse thousands of listings across Dubai, Abu Dhabi, Sharjah and
            all emirates. Cars, apartments, jobs, electronics — it&apos;s all
            here.
          </p>
          <SearchBar large />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span>Popular:</span>
            <Link
              href="/listings?category=vehicles&city=dubai"
              className="rounded-full border border-slate-700 px-3 py-1 transition-colors hover:border-cyan-700 hover:text-cyan-400"
            >
              Cars in Dubai
            </Link>
            <Link
              href="/listings?category=property&city=dubai"
              className="rounded-full border border-slate-700 px-3 py-1 transition-colors hover:border-cyan-700 hover:text-cyan-400"
            >
              Apartments Dubai
            </Link>
            <Link
              href="/listings?category=jobs"
              className="rounded-full border border-slate-700 px-3 py-1 transition-colors hover:border-cyan-700 hover:text-cyan-400"
            >
              Jobs
            </Link>
            <Link
              href="/listings?category=electronics"
              className="rounded-full border border-slate-700 px-3 py-1 transition-colors hover:border-cyan-700 hover:text-cyan-400"
            >
              Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Browse Categories</h2>
          <Link
            href="/listings"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            View all →
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              <span className="mr-2 text-amber-400">★</span>
              Featured Listings
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Listings */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Listings</h2>
          <Link
            href="/listings"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recent.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-y border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">
                {listings.length}+
              </div>
              <div className="text-xs text-slate-500">Active Listings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">7</div>
              <div className="text-xs text-slate-500">Emirates Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-violet-400">9</div>
              <div className="text-xs text-slate-500">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="mb-3 text-2xl font-bold">
          Ready to find what you need?
        </h2>
        <p className="mb-6 text-slate-400">
          Start browsing thousands of listings across the UAE.
        </p>
        <Link
          href="/listings"
          className="inline-block rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          Browse All Listings
        </Link>
      </section>
    </div>
  );
}
