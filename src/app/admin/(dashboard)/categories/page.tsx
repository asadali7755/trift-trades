import { getCategories } from "@/lib/data";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-display text-4xl text-paper">CATEGORIES</h1>
      <div className="mt-6">
        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
