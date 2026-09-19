import Image from "next/image";
import Link from "next/link";
import { optimizedCloudinaryUrl } from "@/lib/cloudinary";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-surface transition hover:-translate-y-1 hover:border-accent/40"
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        {image ? (
          <Image
            src={optimizedCloudinaryUrl(image.url)}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-paper/30">No image</div>
        )}
        {product.is_featured && (
          <span className="absolute left-3 top-3 rounded-sm border border-accent/50 bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category?.name && (
          <span className="text-[10px] uppercase tracking-widest text-paper/40">
            {product.category.name}
          </span>
        )}
        <h3 className="font-display font-display-italic text-xl leading-tight text-paper">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-sm text-accent">PKR {product.price.toLocaleString()}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-sm text-paper/40 line-through">
              PKR {product.compare_at_price.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-paper/50">
          {product.condition && (
            <span className="font-semibold uppercase tracking-wider">{product.condition}</span>
          )}
          {product.sizes?.length > 0 && (
            <span>
              {product.condition && <span className="mx-1 text-paper/30">&middot;</span>}
              UK {product.sizes.join(", ")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
