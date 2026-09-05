import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`h-9 w-9 rounded-full text-center text-sm font-medium leading-9 transition ${
            p === page ? "bg-accent text-ink" : "bg-surface-light text-paper/70 hover:bg-white/10"
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
}
