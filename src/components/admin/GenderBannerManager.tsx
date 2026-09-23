"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { saveGenderBanner } from "@/app/admin/actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { optimizedCloudinaryUrl } from "@/lib/cloudinary";
import type { GenderBanner } from "@/lib/types";

function BannerRow({ banner }: { banner: GenderBanner }) {
  const [items, setItems] = useState(
    banner.image_url ? [{ url: banner.image_url, publicId: banner.image_url }] : []
  );
  const [alt, setAlt] = useState(banner.image_alt ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const image = items[0];

  function handleSave() {
    if (!image) return;
    startTransition(async () => {
      await saveGenderBanner({ gender: banner.gender, imageUrl: image.url, imageAlt: alt });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface p-5 sm:flex-row sm:items-start">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-black sm:w-40">
        {image ? (
          <Image
            src={optimizedCloudinaryUrl(image.url)}
            alt={alt || banner.label}
            fill
            sizes="160px"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-paper/30">
            No image yet
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="font-display text-2xl text-paper">{banner.label}</h3>
        <MediaUploader resourceType="image" items={items} onChange={setItems} />
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-paper/50">
            Alt text (describe the photo, for SEO)
          </label>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder={`e.g. "Imported ${banner.label.toLowerCase()} sports shoes on a black background"`}
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface-light px-4 py-2.5 text-sm text-paper outline-none focus:border-accent"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || !image}
          className="w-fit rounded-full bg-accent px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-ink transition hover:bg-accent-dark disabled:opacity-50"
        >
          {isPending ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>
    </div>
  );
}

export function GenderBannerManager({ banners }: { banners: GenderBanner[] }) {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      {banners.map((banner) => (
        <BannerRow key={banner.gender} banner={banner} />
      ))}
    </div>
  );
}
