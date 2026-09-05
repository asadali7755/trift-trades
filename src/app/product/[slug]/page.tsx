import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/lib/data";
import { Gallery } from "@/components/product/Gallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductSchema } from "@/components/schema/ProductSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { productOrderLink } from "@/lib/whatsapp";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | PKR ${product.price.toLocaleString()}`,
    description:
      product.description ??
      `${product.name} — imported, lightly-used ${product.category?.name ?? "sports shoe"} available at Thrift Trades. Order on WhatsApp.`,
    openGraph: {
      images: product.images.map((img) => img.url),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category_id, product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          ...(product.category
            ? [{ name: product.category.name, path: `/${product.category.slug}` }]
            : []),
          { name: product.name, path: `/product/${product.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Gallery images={product.images} videoUrl={product.video_url} />

        <div className="flex flex-col">
          {product.category && (
            <Link
              href={`/${product.category.slug}`}
              className="text-xs font-semibold uppercase tracking-widest text-accent"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="mt-2 font-display text-4xl text-paper sm:text-5xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-display text-3xl text-accent">
              PKR {product.price.toLocaleString()}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-lg text-paper/40 line-through">
                PKR {product.compare_at_price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-2 inline-block w-fit rounded-full bg-surface-light px-3 py-1 text-xs text-paper/60">
            Condition: {product.condition}
          </p>

          {product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
                Available Sizes (EU)
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-paper/80"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <p className="mt-6 text-paper/70">{product.description}</p>
          )}

          <a
            href={productOrderLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
          >
            <MessageCircle size={18} />
            Order on WhatsApp
          </a>

          {!product.is_in_stock && (
            <p className="mt-3 text-sm text-red-400">Currently sold out</p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-3xl text-paper">YOU MIGHT ALSO LIKE</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
