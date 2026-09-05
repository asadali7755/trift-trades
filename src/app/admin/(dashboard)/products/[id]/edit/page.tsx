import { notFound } from "next/navigation";
import { getCategories, getProductById } from "@/lib/data";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getProductById(id)]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl text-paper">EDIT SHOE</h1>
      <div className="mt-6">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
