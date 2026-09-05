import Link from "next/link";
import Image from "next/image";
import { getAllProductsForAdmin } from "@/lib/data";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminDashboardPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-paper">SHOES ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink hover:bg-accent-dark"
        >
          + Add Shoe
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-surface p-10 text-center text-paper/50">
          No shoes yet. Click &quot;Add Shoe&quot; to list your first pair.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl bg-surface">
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
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-surface-light">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].alt || product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-paper">{product.name}</span>
                  </td>
                  <td className="px-4 py-3 text-paper/70">{product.category?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-paper/70">PKR {product.price.toLocaleString()}</td>
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
      )}
    </div>
  );
}
