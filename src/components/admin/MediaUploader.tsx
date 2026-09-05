"use client";

import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { UploadCloud, X } from "lucide-react";

type UploadedItem = { url: string; publicId: string };

export function MediaUploader({
  resourceType,
  items,
  onChange,
  multiple = false,
}: {
  resourceType: "image" | "video";
  items: UploadedItem[];
  onChange: (items: UploadedItem[]) => void;
  multiple?: boolean;
}) {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    const info = result.info;
    if (!info || typeof info === "string") return;
    const item: UploadedItem = { url: info.secure_url, publicId: info.public_id };
    onChange(multiple ? [...items, item] : [item]);
  }

  function removeItem(publicId: string) {
    onChange(items.filter((i) => i.publicId !== publicId));
  }

  if (!preset) {
    return (
      <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
        Cloudinary isn&apos;t configured yet — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and
        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className={`grid gap-3 ${resourceType === "image" ? "grid-cols-4" : "grid-cols-1"}`}>
        {items.map((item) => (
          <div key={item.publicId} className="relative aspect-square overflow-hidden rounded-lg bg-surface-light">
            {resourceType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <video src={item.url} className="h-full w-full object-cover" muted />
            )}
            <button
              type="button"
              onClick={() => removeItem(item.publicId)}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {(multiple || items.length === 0) && (
        <CldUploadWidget
          uploadPreset={preset}
          options={{ resourceType, sources: ["local", "camera"], multiple: false }}
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm font-medium text-paper/70 hover:border-accent hover:text-accent"
            >
              <UploadCloud size={16} />
              Upload {resourceType === "image" ? "Photo" : "Video"} From Phone
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
