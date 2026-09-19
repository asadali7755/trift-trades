import { getColors } from "@/lib/data";
import { ColorManager } from "@/components/admin/ColorManager";

export default async function AdminColorsPage() {
  const colors = await getColors();

  return (
    <div>
      <h1 className="font-display font-display-italic text-4xl text-paper">Colors</h1>
      <p className="mt-2 text-paper/60">
        These show up as a filter on the shop pages, and as the Color option when adding a shoe.
      </p>
      <div className="mt-6">
        <ColorManager colors={colors} />
      </div>
    </div>
  );
}
