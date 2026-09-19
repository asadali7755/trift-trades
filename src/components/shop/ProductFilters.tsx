"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Brand, Category, Condition } from "@/lib/types";
import { SHOE_SIZES } from "@/lib/shopOptions";

const SIZES = SHOE_SIZES;
const GENDERS = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
];

export function ProductFilters({
  categories,
  brands = [],
  conditions = [],
}: {
  categories: Category[];
  brands?: Brand[];
  conditions?: Condition[];
}) {
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
  const activeGender = searchParams.get("gender");
  const activeBrand = searchParams.get("brand");
  const activeCondition = searchParams.get("condition");

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function applyPriceRange() {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const onDedicatedGenderPage = pathname?.match(/^\/(men|women|kids)(\/|$)/);

  return (
    <div className="flex flex-col gap-6">
      {!onDedicatedGenderPage && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">Shop by</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => updateParam("gender", null)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                !activeGender ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              All
            </button>
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => updateParam("gender", g.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeGender === g.value ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!pathname?.match(/^\/(football-boots|running-shoes|casual-sneakers|kids-shoes|slippers)/) && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Category
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => updateParam("category", null)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                !activeCategory ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => updateParam("category", c.slug)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
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
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              !activeSize ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
            }`}
          >
            All
          </button>
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateParam("size", size)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeSize === size ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">Brand</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => updateParam("brand", null)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                !activeBrand ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              All
            </button>
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => updateParam("brand", b.slug)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeBrand === b.slug ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {conditions.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Condition
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => updateParam("condition", null)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                !activeCondition ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              All
            </button>
            {conditions.map((cond) => (
              <button
                key={cond.id}
                onClick={() => updateParam("condition", cond.name)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeCondition === cond.name ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
                }`}
              >
                {cond.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Price (PKR)
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={applyPriceRange}
            onKeyDown={(e) => e.key === "Enter" && applyPriceRange()}
            className="w-full min-w-0 rounded-lg border border-white/15 bg-surface-light px-3 py-2 text-sm text-paper outline-none focus:border-accent"
          />
          <span className="text-paper/40">&ndash;</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={applyPriceRange}
            onKeyDown={(e) => e.key === "Enter" && applyPriceRange()}
            className="w-full min-w-0 rounded-lg border border-white/15 bg-surface-light px-3 py-2 text-sm text-paper outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
}
