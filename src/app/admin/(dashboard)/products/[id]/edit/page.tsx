import { notFound } from "next/navigation";
import { getBrands, getCategories, getConditions, getProductById } from "@/lib/data";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, brands, conditions, product] = await Promise.all([
    getCategories(),
    getBrands(),
    getConditions(),
    getProductById(id),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display font-display-italic text-3xl text-paper sm:text-4xl">
        Edit Shoe
      </h1>
      <div className="mt-6">
        <ProductForm
          categories={categories}
          brands={brands}
          conditions={conditions}
          product={product}
        />
      </div>
    </div>
  );
}
