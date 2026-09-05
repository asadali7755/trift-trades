import type { Metadata } from "next";
import { login } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-4xl text-paper">ADMIN LOGIN</h1>
      <p className="mt-2 text-sm text-paper/60">Manage shoes, prices, photos and videos.</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      <form action={login} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
