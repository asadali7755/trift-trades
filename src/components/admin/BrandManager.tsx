"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { saveBrand, deleteBrand } from "@/app/admin/actions";
import type { Brand } from "@/lib/types";

export function BrandManager({ brands }: { brands: Brand[] }) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    startTransition(async () => {
      await saveBrand({ name });
      setName("");
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this brand? Shoes tagged with it will become unbranded.")) return;
    startTransition(() => {
      deleteBrand(id);
    });
  }

  return (
    <div className="max-w-lg">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Reebok"
          className="flex-1 rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
        />
        <button
          disabled={isPending}
          className="rounded-lg bg-accent px-5 text-sm font-extrabold uppercase tracking-wide text-ink disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <ul className="mt-6 divide-y divide-white/10 rounded-2xl bg-surface">
        {brands.map((b) => (
          <li key={b.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-paper">{b.name}</span>
            <button
              onClick={() => handleDelete(b.id)}
              className="text-red-300 hover:underline"
              aria-label={`Delete ${b.name}`}
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
