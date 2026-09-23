import Link from "next/link";
import Image from "next/image";
import { getAllProductsForAdmin } from "@/lib/data";
import { optimizedCloudinaryUrl } from "@/lib/cloudinary";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminDashboardPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display font-display-italic text-3xl text-paper sm:text-4xl">
          Shoes ({products.length})
        </h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-ink hover:bg-accent-dark"
        >
          + Add Shoe
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-surface p-10 text-center text-paper/50">
          No shoes yet. Click &quot;Add Shoe&quot; to list your first pair.
        </p>
      ) : (
        <>
          {/* Mobile: stacked cards, so Edit/Delete are always visible without side-scrolling */}
          <div className="mt-6 flex flex-col gap-3 sm:hidden">
            {products.map((product) => (
              <div key={product.id} className="rounded-2xl bg-surface p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-light">
                    {product.images[0] && (
                      <Image
                        src={optimizedCloudinaryUrl(product.images[0].url)}
                        alt={product.images[0].alt || product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-paper">{product.name}</p>
                    <p className="text-sm text-paper/60">
                      {product.category?.name ?? "—"} &middot; PKR{" "}
                      {product.price.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs ${
                      product.is_in_stock
                        ? "bg-accent/20 text-accent"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {product.is_in_stock ? "In Stock" : "Sold Out"}
                  </span>
                </div>
                <div className="mt-3 flex gap-3 border-t border-white/10 pt-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="flex-1 rounded-lg bg-surface-light py-2.5 text-center text-sm font-bold text-accent"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} fullWidth />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="mt-6 hidden overflow-hidden rounded-2xl bg-surface sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-paper/50">
                <tr>
                  <th className="px-4 py-3">Shoe</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-light">
                          {product.images[0] && (
                            <Image
                              src={optimizedCloudinaryUrl(product.images[0].url)}
                              alt={product.images[0].alt || product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="font-bold text-paper">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-paper/70">{product.category?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-paper/70">
                      PKR {product.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          product.is_in_stock
                            ? "bg-accent/20 text-accent"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {product.is_in_stock ? "In Stock" : "Sold Out"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-accent hover:underline"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
