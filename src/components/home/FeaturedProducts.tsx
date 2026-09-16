import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display font-display-italic text-4xl text-paper">The Current Edit</h2>
        <Link
          href="/shop"
          className="border-b border-accent pb-1 text-xs font-medium uppercase tracking-widest text-accent"
        >
          View All Shoes &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
