import { getBrands, getCategories, getColors } from "@/lib/data";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const [categories, brands, colors] = await Promise.all([
    getCategories(),
    getBrands(),
    getColors(),
  ]);

  return (
    <div>
      <h1 className="font-display font-display-italic text-3xl text-paper sm:text-4xl">
        Add A Shoe
      </h1>
      <div className="mt-6">
        <ProductForm categories={categories} brands={brands} colors={colors} />
      </div>
    </div>
  );
}
