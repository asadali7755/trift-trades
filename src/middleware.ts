import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Supabase isn't configured yet (owner hasn't created a project/.env.local
    // yet) — skip auth checks instead of crashing so the rest of the site
    // stays browsable during setup.
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";
  const isPublicAdminRoute =
    isLoginRoute || pathname === "/admin/forgot-password" || pathname === "/admin/reset-password";

  // Only gate GET page navigations here. Server Action calls (saveProduct,
  // deleteProduct, etc.) are POSTs to these same /admin/* paths — redirecting
  // those to /admin/login turns a valid, authenticated mutation into a
  // silent no-op (the browser follows the redirect, the action never runs,
  // and the user is bounced to the login page for no visible reason). Those
  // actions build their own Supabase client from the same request cookies
  // and are already covered by the products/categories RLS policies, so
  // they don't need this extra gate.
  if (request.method === "GET") {
    if (isAdminRoute && !isPublicAdminRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    if (isLoginRoute && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
