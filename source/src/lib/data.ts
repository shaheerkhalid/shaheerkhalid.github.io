import type { Listing } from "@/types";
import { listings as allListings } from "@/data/listings";

export function getListingById(id: string): Listing | undefined {
  return allListings.find((l) => l.id === id);
}

export function getSimilarListings(listing: Listing, limit = 4): Listing[] {
  return allListings
    .filter(
      (l) =>
        l.id !== listing.id &&
        (l.category === listing.category || l.city === listing.city)
    )
    .slice(0, limit);
}
