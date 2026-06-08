import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listings";
import { formatPrice, timeAgo, getCityName, getCategoryName } from "@/data/categories";
import { getListingById, getSimilarListings } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return listings.map((listing) => ({
    id: listing.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return { title: "Listing Not Found" };

  return {
    title: listing.title,
    description:
      listing.description.slice(0, 160).replace(/\*\*/g, "") +
      ` — ${formatPrice(listing.price)} in ${getCityName(listing.city)}`,
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  const similar = getSimilarListings(listing);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/listings?category=${listing.category}`}
              className="hover:text-cyan-400"
            >
              {getCategoryName(listing.category)}
            </Link>
            <span>/</span>
            <span className="truncate text-slate-400">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Images */}
            {listing.images.length > 0 ? (
              <div className="mb-6 grid gap-2 sm:grid-cols-2">
                {listing.images.map((img, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-xl bg-slate-900 ${
                      i === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      style={{ maxHeight: i === 0 ? 400 : 200 }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6 flex items-center justify-center rounded-xl bg-slate-900 py-20">
                <span className="text-6xl opacity-30">
                  {listing.category === "vehicles"
                    ? "🚗"
                    : listing.category === "property"
                      ? "🏠"
                      : listing.category === "electronics"
                        ? "📱"
                        : listing.category === "jobs"
                          ? "💼"
                          : "📦"}
                </span>
              </div>
            )}

            {/* Title & Price */}
            <div className="mb-4">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {listing.title}
                </h1>
                <span className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-2xl font-bold text-cyan-400">
                  {formatPrice(listing.price)}
                </span>
              </div>

              {/* Badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {getCategoryName(listing.category)}
                </span>
                {listing.category !== "jobs" &&
                  listing.category !== "services" && (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase text-slate-300">
                      {listing.condition}
                    </span>
                  )}
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  📍 {getCityName(listing.city)}
                  {listing.neighborhood ? ` · ${listing.neighborhood}` : ""}
                </span>
                {listing.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/20 px-3 py-1 text-xs text-emerald-400">
                    ✓ Verified
                  </span>
                )}
                {listing.featured && (
                  <span className="rounded-full bg-amber-600/20 px-3 py-1 text-xs text-amber-400">
                    ★ Featured
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-white">
                Description
              </h2>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
                {listing.description.split("\n").map((line, i) => {
                  // Handle markdown bold
                  const formatted = line.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-white">$1</strong>'
                  );
                  if (line.startsWith("- ")) {
                    return (
                      <li
                        key={i}
                        className="ml-4 text-slate-400"
                        dangerouslySetInnerHTML={{
                          __html: formatted.replace("- ", ""),
                        }}
                      />
                    );
                  }
                  if (line.trim() === "")
                    return <div key={i} className="h-2" />;
                  return (
                    <p
                      key={i}
                      dangerouslySetInnerHTML={{ __html: formatted }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            {listing.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold text-white">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller info */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Seller
              </h3>
              <div className="mb-1 font-medium text-white">
                {listing.sellerName}
              </div>
              {listing.sellerContact && (
                <div className="text-sm text-cyan-400">
                  {listing.sellerContact}
                </div>
              )}
              <div className="mt-1 text-xs text-slate-500">
                Posted {timeAgo(listing.postedDate)}
              </div>
            </div>

            {/* Listing details */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="text-white">
                    {getCategoryName(listing.category)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">City</dt>
                  <dd className="text-white">
                    {getCityName(listing.city)}
                  </dd>
                </div>
                {listing.neighborhood && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Area</dt>
                    <dd className="text-white">{listing.neighborhood}</dd>
                  </div>
                )}
                {listing.category !== "jobs" &&
                  listing.category !== "services" && (
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Condition</dt>
                      <dd className="capitalize text-white">
                        {listing.condition}
                      </dd>
                    </div>
                  )}
                <div className="flex justify-between">
                  <dt className="text-slate-500">Source</dt>
                  <dd className="capitalize text-white">{listing.source}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Listed</dt>
                  <dd className="text-white">
                    {new Date(listing.postedDate).toLocaleDateString("en-AE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Back link */}
            <Link
              href="/listings"
              className="block rounded-xl border border-slate-800 px-4 py-3 text-center text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
            >
              ← Back to listings
            </Link>
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <section className="mt-12 border-t border-slate-800 pt-8">
            <h2 className="mb-6 text-xl font-bold text-white">
              Similar Listings
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
