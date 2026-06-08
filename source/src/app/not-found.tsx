import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="text-center">
        <div className="mb-4 text-7xl">🔍</div>
        <h1 className="mb-2 text-3xl font-bold text-white">404</h1>
        <h2 className="mb-4 text-xl text-slate-400">Page not found</h2>
        <p className="mb-8 text-sm text-slate-500">
          The listing or page you&apos;re looking for doesn&apos;t exist
          or has been removed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Go Home
          </Link>
          <Link
            href="/listings"
            className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
