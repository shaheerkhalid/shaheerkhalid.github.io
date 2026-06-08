import Link from "next/link";
import type { Listing } from "@/types";
import { formatPrice, timeAgo, getCityName } from "@/data/categories";

const categoryIcons: Record<string, string> = {
  vehicles: "🚗",
  property: "🏠",
  electronics: "📱",
  furniture: "🛋️",
  jobs: "💼",
  services: "🔧",
  fashion: "👗",
  pets: "🐾",
  other: "📦",
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const thumb =
    listing.images.length > 0
      ? listing.images[0].url
      : `https://placehold.co/400x300/1e293b/475569?text=${encodeURIComponent(categoryIcons[listing.category] || "📦")}`;

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <img
          src={thumb}
          alt={listing.images[0]?.alt || listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Featured badge */}
        {listing.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold text-black">
            Featured
          </span>
        )}
        {/* Category badge */}
        <span className="absolute right-2 top-2 rounded-full bg-slate-950/80 px-2 py-0.5 text-xs text-slate-300 backdrop-blur">
          {categoryIcons[listing.category]}{" "}
          {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
        </span>
        {/* Price tag */}
        <div className="absolute bottom-2 left-2">
          <span className="rounded-lg bg-slate-950/90 px-2.5 py-1 text-sm font-bold text-cyan-400 backdrop-blur">
            {formatPrice(listing.price)}
          </span>
        </div>
        {/* Condition */}
        {listing.category !== "jobs" && listing.category !== "services" && (
          <span className="absolute bottom-2 right-2 rounded-md bg-slate-950/80 px-1.5 py-0.5 text-[10px] uppercase text-slate-400 backdrop-blur">
            {listing.condition}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white group-hover:text-cyan-400">
          {listing.title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>📍 {getCityName(listing.city)}</span>
          {listing.neighborhood && (
            <>
              <span>·</span>
              <span className="truncate">{listing.neighborhood}</span>
            </>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
          <span>{timeAgo(listing.postedDate)}</span>
          {listing.verified && (
            <span className="flex items-center gap-0.5 text-emerald-500">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
