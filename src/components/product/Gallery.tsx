"use client";

import Image from "next/image";
import { useState } from "react";
import { optimizedCloudinaryUrl } from "@/lib/cloudinary";
import type { ProductImage } from "@/lib/types";

export function Gallery({ images, videoUrl }: { images: ProductImage[]; videoUrl?: string | null }) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
        {hasImages ? (
          <Image
            src={optimizedCloudinaryUrl(images[active].url)}
            alt={images[active].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-paper/30">No image yet</div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.url + i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                i === active ? "border-accent" : "border-transparent"
              }`}
            >
              <Image
                src={optimizedCloudinaryUrl(img.url)}
                alt={img.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {videoUrl && (
        <video
          controls
          className="mt-2 aspect-video w-full rounded-2xl bg-black"
          src={optimizedCloudinaryUrl(videoUrl)}
        />
      )}
    </div>
  );
}
