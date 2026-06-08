import Link from "next/link";
import type { CategoryInfo } from "@/types";

export default function CategoryGrid({
  categories,
}: {
  categories: CategoryInfo[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
      {categories
        .filter((c) => c.count > 0)
        .map((cat) => (
          <Link
            key={cat.id}
            href={`/listings?category=${cat.id}`}
            className="flex flex-col items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 p-3 text-center transition-all hover:border-cyan-700 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-500/5"
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-xs font-medium text-white">{cat.name}</span>
            <span className="text-[10px] text-slate-500">
              {cat.count} listings
            </span>
          </Link>
        ))}
    </div>
  );
}
