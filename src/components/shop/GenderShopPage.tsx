import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { Pagination } from "@/components/shop/Pagination";
import type { Gender } from "@/lib/types";

const COPY: Record<Exclude<Gender, "unisex">, { title: string; blurb: string }> = {
  men: {
    title: "Men's Shoes",
    blurb: "Imported football boots, running shoes, and sneakers sized for men — across Pakistan.",
  },
  women: {
    title: "Women's Shoes",
    blurb: "Imported sports shoes and sneakers sized for women — genuine quality, honest prices.",
  },
  kids: {
    title: "Kids' Shoes",
    blurb: "Imported sports shoes sized for kids — same quality checks, kid-friendly prices.",
  },
};

export async function GenderShopPage({
  gender,
  searchParams,
}: {
  gender: Exclude<Gender, "unisex">;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const copy = COPY[gender];

  const [categories, { products, page, totalPages }] = await Promise.all([
    getCategories(),
    getProducts({
      gender,
      categorySlug: params.category,
      size: params.size,
      page: params.page ? Number(params.page) : 1,
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display font-display-italic text-5xl text-paper">{copy.title}</h1>
      <p className="mt-2 text-paper/60">{copy.blurb}</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductFilters categories={categories} />
        </aside>

        <div>
          {products.length === 0 ? (
            <p className="rounded-2xl bg-surface p-10 text-center text-paper/50">
              No shoes here yet &mdash; check back soon, new stock is added regularly.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath={`/${gender}`}
            extraParams={{ category: params.category, size: params.size }}
          />
        </div>
      </div>
    </div>
  );
}
