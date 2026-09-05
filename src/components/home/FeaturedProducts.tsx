import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-4xl text-paper">FEATURED SHOES</h2>
        <Link href="/shop" className="text-sm font-semibold text-accent hover:underline">
          View all &rarr;
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
