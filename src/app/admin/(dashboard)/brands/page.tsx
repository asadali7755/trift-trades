import { getBrands } from "@/lib/data";
import { BrandManager } from "@/components/admin/BrandManager";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <h1 className="font-display font-display-italic text-4xl text-paper">Brands</h1>
      <p className="mt-2 text-paper/60">
        These show up as a filter on the shop pages, and as the Brand option when adding a shoe.
      </p>
      <div className="mt-6">
        <BrandManager brands={brands} />
      </div>
    </div>
  );
}
