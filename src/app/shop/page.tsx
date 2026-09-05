import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { Pagination } from "@/components/shop/Pagination";

export const metadata: Metadata = {
  title: "All Shoes | Imported Football & Sports Shoes",
  description:
    "Browse the full Thrift Trades collection of imported football boots, running shoes, and casual sneakers in Pakistan.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const [categories, { products, page, totalPages }] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: params.category,
      size: params.size,
      page: params.page ? Number(params.page) : 1,
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl text-paper">ALL SHOES</h1>
      <p className="mt-2 text-paper/60">
        Imported, inspected, and ready to ship anywhere in Pakistan.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductFilters categories={categories} />
        </aside>

        <div>
          {products.length === 0 ? (
            <p className="rounded-2xl bg-surface p-10 text-center text-paper/50">
              No shoes match these filters yet &mdash; check back soon, new stock is added
              regularly.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} basePath="/shop" />
        </div>
      </div>
    </div>
  );
}
