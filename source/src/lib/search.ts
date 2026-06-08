"use client";

import Fuse from "fuse.js";
import type { Listing, ListingCategory, UAECity, ListingCondition } from "@/types";
import { listings as allListings } from "@/data/listings";

let fuseInstance: Fuse<Listing> | null = null;

function getFuse() {
  if (!fuseInstance) {
    fuseInstance = new Fuse(allListings, {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1 },
        { name: "tags", weight: 1.5 },
        { name: "city", weight: 1 },
        { name: "neighborhood", weight: 0.8 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export interface SearchFilters {
  query: string;
  category: ListingCategory | "all";
  city: UAECity | "all";
  minPrice: number | null;
  maxPrice: number | null;
  condition: ListingCondition | "all";
  sortBy: "newest" | "price-asc" | "price-desc" | "relevance";
}

const defaultFilters: SearchFilters = {
  query: "",
  category: "all",
  city: "all",
  minPrice: null,
  maxPrice: null,
  condition: "all",
  sortBy: "newest",
};

export function searchListings(filters: Partial<SearchFilters> = {}) {
  const f = { ...defaultFilters, ...filters };

  let results: Listing[] = [...allListings];

  // Full-text search
  if (f.query.trim()) {
    results = getFuse()
      .search(f.query.trim())
      .map((r) => r.item);
  }

  // Category filter
  if (f.category !== "all") {
    results = results.filter((l) => l.category === f.category);
  }

  // City filter
  if (f.city !== "all") {
    results = results.filter((l) => l.city === f.city);
  }

  // Price filters
  if (f.minPrice !== null) {
    results = results.filter((l) => l.price >= f.minPrice!);
  }
  if (f.maxPrice !== null) {
    results = results.filter((l) => l.price <= f.maxPrice!);
  }

  // Condition filter
  if (f.condition !== "all") {
    results = results.filter((l) => l.condition === f.condition);
  }

  // Sort
  switch (f.sortBy) {
    case "newest":
      results.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
      break;
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "relevance":
      break;
  }

  return results;
}
