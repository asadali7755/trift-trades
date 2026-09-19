import { getConditions } from "@/lib/data";
import { ConditionManager } from "@/components/admin/ConditionManager";

export default async function AdminConditionsPage() {
  const conditions = await getConditions();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Conditions</h1>
      <p className="mt-2 text-sm text-paper/60">
        Manage the fixed list of condition options shown on the product form and shop filters.
      </p>
      <div className="mt-6">
        <ConditionManager conditions={conditions} />
      </div>
    </div>
  );
}
