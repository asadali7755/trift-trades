"use client";

import { useState, useTransition } from "react";
import { saveProduct } from "@/app/admin/actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import type { Category, Product } from "@/lib/types";

const SIZE_OPTIONS = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(product?.name ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? categories[0]?.id ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compare_at_price?.toString() ?? ""
  );
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [condition, setCondition] = useState(product?.condition ?? "Lightly Used - Imported");
  const [description, setDescription] = useState(product?.description ?? "");
  const [images, setImages] = useState(
    (product?.images ?? []).map((img) => ({ url: img.url, publicId: img.url }))
  );
  const [video, setVideo] = useState(
    product?.video_url ? [{ url: product.video_url, publicId: product.video_url }] : []
  );
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [isInStock, setIsInStock] = useState(product?.is_in_stock ?? true);
  const [error, setError] = useState<string | null>(null);

  function toggleSize(size: string) {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (images.length === 0) {
      setError("Add at least one photo before saving.");
      return;
    }

    startTransition(async () => {
      try {
        await saveProduct({
          id: product?.id,
          name,
          categoryId: categoryId || null,
          price: Number(price),
          compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
          sizes,
          condition,
          description,
          images: images.map((img) => ({ url: img.url, alt: name })),
          videoUrl: video[0]?.url ?? null,
          isFeatured,
          isInStock,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      {error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Shoe Name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='e.g. "Nike Mercurial Vapor 15"'
          className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Condition
          </label>
          <input
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Price (PKR)
          </label>
          <input
            required
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Original Price (optional)
          </label>
          <input
            type="number"
            min="0"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Available Sizes (EU)
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                sizes.includes(size) ? "bg-accent text-ink" : "bg-surface-light text-paper/70"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Photos
        </label>
        <div className="mt-2">
          <MediaUploader resourceType="image" items={images} onChange={setImages} multiple />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Video (optional)
        </label>
        <div className="mt-2">
          <MediaUploader resourceType="video" items={video} onChange={setVideo} />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-paper/80">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-paper/80">
          <input
            type="checkbox"
            checked={isInStock}
            onChange={(e) => setIsInStock(e.target.checked)}
          />
          In stock
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark disabled:opacity-50"
      >
        {isPending ? "Saving…" : product ? "Save Changes" : "Add Shoe"}
      </button>
    </form>
  );
}
