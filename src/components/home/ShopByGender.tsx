import Image from "next/image";
import Link from "next/link";
import { optimizedCloudinaryUrl } from "@/lib/cloudinary";
import type { GenderBanner } from "@/lib/types";

export function ShopByGender({ banners }: { banners: GenderBanner[] }) {
  const withImages = banners.filter((b) => b.image_url);
  if (withImages.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl text-paper sm:text-4xl">Shop by</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {withImages.map((banner) => (
          <Link
            key={banner.gender}
            href={`/shop?gender=${banner.gender}`}
            className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-3xl bg-black"
          >
            <Image
              src={optimizedCloudinaryUrl(banner.image_url!)}
              alt={banner.image_alt || `${banner.label} imported sports shoes`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="relative p-6">
              <h3 className="font-display text-3xl text-paper">{banner.label}</h3>
              <p className="mt-1 text-sm text-paper/70 underline-offset-4 group-hover:underline">
                Shop {banner.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
