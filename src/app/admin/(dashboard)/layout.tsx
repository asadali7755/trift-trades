import Link from "next/link";
import type { Metadata } from "next";
import { LogOut, LayoutGrid, Tags, PlusCircle } from "lucide-react";
import { logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
      <aside className="flex shrink-0 flex-row gap-2 overflow-x-auto lg:w-56 lg:flex-col">
        <Link
          href="/admin"
          className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-paper/80 hover:bg-white/5"
        >
          <LayoutGrid size={16} /> Shoes
        </Link>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-paper/80 hover:bg-white/5"
        >
          <PlusCircle size={16} /> Add Shoe
        </Link>
        <Link
          href="/admin/categories"
          className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-paper/80 hover:bg-white/5"
        >
          <Tags size={16} /> Categories
        </Link>
        <form action={logout} className="mt-0 lg:mt-auto">
          <button className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-red-300 hover:bg-white/5">
            <LogOut size={16} /> Log Out
          </button>
        </form>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
