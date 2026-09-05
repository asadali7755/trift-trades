"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
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
      className="flex items-center gap-1 text-red-300 hover:underline disabled:opacity-50"
    >
      <Trash2 size={14} />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
