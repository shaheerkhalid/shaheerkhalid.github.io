import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">
        About UAE Classifieds
      </h1>

      <div className="space-y-5 text-sm leading-relaxed text-slate-300">
        <p>
          UAE Classifieds is a free, community-driven platform for buying and
          selling across the United Arab Emirates. Whether you&apos;re looking
          for a used car in Dubai, an apartment in Abu Dhabi, a job in Sharjah,
          or furniture in Ajman — we&apos;ve got you covered.
        </p>

        <h2 className="text-lg font-semibold text-white">What We Offer</h2>
        <ul className="list-inside list-disc space-y-1 text-slate-400">
          <li>Browse thousands of listings across 9 categories</li>
          <li>Coverage across all 7 emirates</li>
          <li>Full-text search with powerful filters</li>
          <li>Verified listings for safer transactions</li>
          <li>Completely free — no hidden fees</li>
          <li>Mobile-friendly, fast, and always available</li>
        </ul>

        <h2 className="text-lg font-semibold text-white">Categories</h2>
        <div className="grid grid-cols-3 gap-2 text-slate-400">
          <div>🚗 Vehicles</div>
          <div>🏠 Property</div>
          <div>📱 Electronics</div>
          <div>🛋️ Furniture</div>
          <div>💼 Jobs</div>
          <div>🔧 Services</div>
          <div>👗 Fashion</div>
          <div>🐾 Pets</div>
          <div>📦 Other</div>
        </div>

        <h2 className="text-lg font-semibold text-white">Cities</h2>
        <p className="text-slate-400">
          We cover Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah,
          Umm Al Quwain, and Al Ain.
        </p>

        <h2 className="text-lg font-semibold text-white">
          Built for the Community
        </h2>
        <p>
          This platform was built as a free alternative — open, fast, and
          accessible to everyone in the UAE. No premium listings, no paywalls,
          no tracking.
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
          <p className="mb-4 text-slate-400">
            Ready to start browsing?
          </p>
          <Link
            href="/listings"
            className="inline-block rounded-xl bg-cyan-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-500"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
