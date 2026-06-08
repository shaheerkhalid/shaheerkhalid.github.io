"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { searchListings } from "@/lib/search";
import { categories, cities } from "@/data/categories";
import type {
  ListingCategory,
  UAECity,
  ListingCondition,
} from "@/types";

function ListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    query: searchParams.get("q") || "",
    category: (searchParams.get("category") || "all") as
      | ListingCategory
      | "all",
    city: (searchParams.get("city") || "all") as UAECity | "all",
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : null,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : null,
    condition: (searchParams.get("condition") || "all") as
      | ListingCondition
      | "all",
    sortBy: (searchParams.get("sortBy") || "newest") as
      | "newest"
      | "price-asc"
      | "price-desc"
      | "relevance",
  });

  const results = useMemo(() => searchListings(filters), [filters]);

  const updateFilter = (key: string, value: string | number | null) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      // Update URL
      const params = new URLSearchParams();
      if (updated.query) params.set("q", updated.query);
      if (updated.category !== "all") params.set("category", updated.category);
      if (updated.city !== "all") params.set("city", updated.city);
      if (updated.minPrice !== null)
        params.set("minPrice", String(updated.minPrice));
      if (updated.maxPrice !== null)
        params.set("maxPrice", String(updated.maxPrice));
      if (updated.condition !== "all")
        params.set("condition", updated.condition);
      if (updated.sortBy !== "newest") params.set("sortBy", updated.sortBy);
      router.replace(`/listings?${params.toString()}`, { scroll: false });
      return updated;
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Search bar */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <SearchBar initialQuery={filters.query} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Filters sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Category */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter("category", "all")}
                    className={`block w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                      filters.category === "all"
                        ? "bg-cyan-600/20 text-cyan-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories
                    .filter((c) => c.count > 0)
                    .map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter("category", cat.id)}
                        className={`flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm transition-colors ${
                          filters.category === cat.id
                            ? "bg-cyan-600/20 text-cyan-400"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>
                          {cat.icon} {cat.name}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              {/* City */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  City
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter("city", "all")}
                    className={`block w-full rounded px-2 py-1 text-left text-sm ${
                      filters.city === "all"
                        ? "bg-cyan-600/20 text-cyan-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Cities
                  </button>
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => updateFilter("city", city.id)}
                      className={`block w-full rounded px-2 py-1 text-left text-sm ${
                        filters.city === city.id
                          ? "bg-cyan-600/20 text-cyan-400"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Condition
                </h3>
                <div className="space-y-1">
                  {(["all", "new", "used", "refurbished"] as const).map(
                    (cond) => (
                      <button
                        key={cond}
                        onClick={() => updateFilter("condition", cond)}
                        className={`block w-full rounded px-2 py-1 text-left text-sm capitalize ${
                          filters.condition === cond
                            ? "bg-cyan-600/20 text-cyan-400"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {cond}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setFilters({
                    query: "",
                    category: "all",
                    city: "all",
                    minPrice: null,
                    maxPrice: null,
                    condition: "all",
                    sortBy: "newest",
                  });
                  router.replace("/listings");
                }}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Reset all filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">
                  {results.length}
                </span>{" "}
                listing{results.length !== 1 ? "s" : ""} found
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 focus:border-cyan-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>

            {/* Mobile filters (chips) */}
            <div className="mb-4 flex flex-wrap gap-1.5 lg:hidden">
              {filters.category !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-600/20 px-2.5 py-1 text-[11px] text-cyan-400">
                  {
                    categories.find((c) => c.id === filters.category)
                      ?.name
                  }
                  <button
                    onClick={() => updateFilter("category", "all")}
                    className="ml-0.5 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.city !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/20 px-2.5 py-1 text-[11px] text-emerald-400">
                  {cities.find((c) => c.id === filters.city)?.name}
                  <button
                    onClick={() => updateFilter("city", "all")}
                    className="ml-0.5 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.condition !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-600/20 px-2.5 py-1 text-[11px] capitalize text-violet-400">
                  {filters.condition}
                  <button
                    onClick={() => updateFilter("condition", "all")}
                    className="ml-0.5 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            {/* Grid */}
            {results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="mb-2 text-5xl">🔍</p>
                <p className="text-lg font-semibold text-white">
                  No listings found
                </p>
                <p className="text-sm text-slate-400">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        </div>
      }
    >
      <ListingsContent />
    </Suspense>
  );
}
