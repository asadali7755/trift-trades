import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// A cookie-free client for contexts that can't touch request state — build-time
// static generation (generateStaticParams) and route metadata like sitemap.xml.
// Safe here because it only ever reads public, RLS-readable rows.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
