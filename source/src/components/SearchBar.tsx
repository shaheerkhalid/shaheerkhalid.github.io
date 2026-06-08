"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBar({
  initialQuery = "",
  large = false,
}: {
  initialQuery?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/listings?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/listings");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cars, apartments, phones, jobs..."
          className={`w-full rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${
            large
              ? "py-4 pl-12 pr-16 text-lg"
              : "py-2.5 pl-10 pr-14 text-sm"
          }`}
        />
        {/* Search icon */}
        <svg
          className={`absolute left-4 text-slate-500 ${
            large ? "top-4 h-5 w-5" : "top-3 h-4 w-4"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {/* Submit button */}
        <button
          type="submit"
          className={`absolute right-2 rounded-lg bg-cyan-600 font-semibold text-white transition-colors hover:bg-cyan-500 ${
            large
              ? "top-2 px-5 py-2 text-sm"
              : "top-1.5 px-3 py-1 text-xs"
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
