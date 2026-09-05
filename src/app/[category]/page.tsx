import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { Pagination } from "@/components/shop/Pagination";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

const CATEGORY_COPY: Record<string, string> = {
  "football-boots":
    "Genuine imported football boots for firm ground, turf, and indoor play — lightly used, thoroughly checked, priced far below retail. Perfect for players across Pakistan who want performance-grade boots without the performance-grade price tag.",
  "running-shoes":
    "Imported running and training shoes built for daily mileage. Every pair is inspected for sole grip and cushioning before it reaches our shelves.",
  "casual-sneakers":
    "Everyday imported sneakers for on and off the pitch. Comfortable, genuine, and affordable.",
  "kids-shoes":
    "Imported sports shoes sized for kids — same quality checks, kid-friendly prices.",
  slippers:
    "Imported slippers and sandals for everyday comfort — genuine brands, lightly used, checked before sale.",
};

type Params = { category: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} in Pakistan | Imported Shoes`,
    description:
      CATEGORY_COPY[slug] ??
      `Shop imported ${category.name} at Thrift Trades — genuine quality, honest prices, nationwide delivery across Pakistan.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [categories, { products, page, totalPages }] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: slug }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: category.name, path: `/${slug}` },
        ]}
      />
      <h1 className="font-display text-5xl text-paper">{category.name.toUpperCase()}</h1>
      <p className="mt-3 max-w-2xl text-paper/60">
        {CATEGORY_COPY[slug] ?? category.description}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductFilters categories={categories} />
        </aside>

        <div>
          {products.length === 0 ? (
            <p className="rounded-2xl bg-surface p-10 text-center text-paper/50">
              No {category.name.toLowerCase()} in stock right now &mdash; message us on WhatsApp
              and we&apos;ll let you know when new stock arrives.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} basePath={`/${slug}`} />
        </div>
      </div>
    </div>
  );
}
