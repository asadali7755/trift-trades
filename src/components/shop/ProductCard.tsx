import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-light">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-paper/30">No image</div>
        )}
        {product.is_featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-ink">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category?.name && (
          <span className="text-xs uppercase tracking-wide text-paper/40">
            {product.category.name}
          </span>
        )}
        <h3 className="font-display text-xl leading-tight text-paper">{product.name}</h3>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-accent">PKR {product.price.toLocaleString()}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-sm text-paper/40 line-through">
              PKR {product.compare_at_price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
