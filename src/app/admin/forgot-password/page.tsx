import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordReset } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const { error, sent } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-4xl text-paper">FORGOT PASSWORD</h1>
      <p className="mt-2 text-sm text-paper/60">
        Enter your admin email and we&apos;ll send a link to reset your password.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}
      {sent && (
        <p className="mt-4 rounded-lg bg-accent/10 px-4 py-3 text-sm text-accent">
          If that email has an account, a reset link has been sent. Check your inbox.
        </p>
      )}

      <form action={requestPasswordReset} className="mt-8 flex flex-col gap-4">
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
        <button
          type="submit"
          className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
        >
          Send Reset Link
        </button>
      </form>

      <Link href="/admin/login" className="mt-6 text-sm text-paper/50 hover:text-accent">
        &larr; Back to login
      </Link>
    </div>
  );
}
