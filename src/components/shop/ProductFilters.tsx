"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

const SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const activeSize = searchParams.get("size");
  const activeCategory = searchParams.get("category");

  return (
    <div className="flex flex-col gap-6">
      {!pathname?.match(/^\/(football-boots|running-shoes|casual-sneakers|kids-shoes)/) && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Category
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => updateParam("category", null)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                !activeCategory ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => updateParam("category", c.slug)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeCategory === c.slug ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">Size (UK)</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => updateParam("size", null)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              !activeSize ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
            }`}
          >
            All
          </button>
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateParam("size", size)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeSize === size ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
