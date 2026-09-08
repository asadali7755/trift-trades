"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setStatus("invalid");
      return;
    }

    const supabase = createClient();
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      setStatus(error ? "invalid" : "ready");
    });
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setIsSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
  }

  if (status === "checking") {
    return <p className="text-paper/60">Checking your reset link&hellip;</p>;
  }

  if (status === "invalid") {
    return (
      <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
        This reset link is invalid or has expired. Request a new one from the login page.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          New Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-paper/50">
          Confirm New Password
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-paper outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        disabled={isSaving}
        className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark disabled:opacity-50"
      >
        {isSaving ? "Saving…" : "Set New Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-4xl text-paper">RESET PASSWORD</h1>
      <p className="mt-2 text-sm text-paper/60">Choose a new password for your admin account.</p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-paper/60">Loading&hellip;</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
