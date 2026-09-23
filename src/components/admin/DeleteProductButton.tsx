"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";

export function DeleteProductButton({
  id,
  name,
  fullWidth,
}: {
  id: string;
  name: string;
  fullWidth?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    startTransition(() => {
      deleteProduct(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={
        fullWidth
          ? "flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-500/10 py-2.5 text-sm font-bold text-red-300 disabled:opacity-50"
          : "flex items-center gap-1 text-red-300 hover:underline disabled:opacity-50"
      }
    >
      <Trash2 size={14} />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
