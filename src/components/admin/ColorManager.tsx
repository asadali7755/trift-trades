"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { saveColor, deleteColor } from "@/app/admin/actions";
import type { Color } from "@/lib/types";

export function ColorManager({ colors }: { colors: Color[] }) {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#888888");
  const [isPending, startTransition] = useTransition();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    startTransition(async () => {
      await saveColor({ name, hex });
      setName("");
      setHex("#888888");
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this color? Shoes tagged with it will lose that tag.")) return;
    startTransition(() => {
      deleteColor(id);
    });
  }

  return (
    <div className="max-w-lg">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="h-[50px] w-14 shrink-0 cursor-pointer rounded-lg border border-white/15 bg-surface"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Maroon"
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
        {colors.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-3 text-paper">
              <span
                className="h-5 w-5 rounded-full border border-white/20"
                style={{ backgroundColor: c.hex }}
              />
              {c.name}
            </span>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-300 hover:underline"
              aria-label={`Delete ${c.name}`}
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
