"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { ProductImage } from "@/lib/types";

// Reads the domain from the actual incoming request instead of the
// NEXT_PUBLIC_SITE_URL env var, so password-reset links always point at
// whatever host is really serving the app — immune to that env var being
// stale, unset, or pointed at localhost on a given deployment.
async function getSiteOrigin() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Two shoes (or categories) with the same/similarly-worded name would
// otherwise both slugify to the same value and collide on the table's
// unique slug constraint — e.g. two "Nike" listings both landing on
// "nike". Appends -2, -3, ... until it finds a slug that's free
// (excluding the row being updated, so re-saving something without
// changing its name doesn't collide with itself).
async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: "products" | "categories",
  baseSlug: string,
  excludeId?: string
) {
  let slug = baseSlug;
  let attempt = 1;
  while (true) {
    let query = supabase.from(table).select("id").eq("slug", slug).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    if (!data) return slug;
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }
}

export async function login(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email"));

  const origin = await getSiteOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/admin/reset-password`,
  });

  if (error) {
    redirect(`/admin/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/forgot-password?sent=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type ProductFormInput = {
  id?: string;
  name: string;
  categoryId: string | null;
  gender: string;
  price: number;
  compareAtPrice: number | null;
  sizes: string[];
  condition: string;
  description: string;
  images: ProductImage[];
  videoUrl: string | null;
  isFeatured: boolean;
  isInStock: boolean;
};

export async function saveProduct(input: ProductFormInput) {
  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, "products", slugify(input.name), input.id);

  const payload = {
    name: input.name,
    slug,
    category_id: input.categoryId,
    gender: input.gender,
    price: input.price,
    compare_at_price: input.compareAtPrice,
    sizes: input.sizes,
    condition: input.condition,
    description: input.description || null,
    images: input.images,
    video_url: input.videoUrl,
    is_featured: input.isFeatured,
    is_in_stock: input.isInStock,
  };

  if (input.id) {
    const { error } = await supabase.from("products").update(payload).eq("id", input.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) throw error;
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function saveCategory(input: { id?: string; name: string; description: string }) {
  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, "categories", slugify(input.name), input.id);

  if (input.id) {
    const { error } = await supabase
      .from("categories")
      .update({ name: input.name, slug, description: input.description || null })
      .eq("id", input.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("categories")
      .insert({ name: input.name, slug, description: input.description || null });
    if (error) throw error;
  }

  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categories");
}

export async function saveGenderBanner(input: {
  gender: "men" | "women" | "kids";
  imageUrl: string;
  imageAlt: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("gender_banners").upsert({
    gender: input.gender,
    label: input.gender.charAt(0).toUpperCase() + input.gender.slice(1),
    image_url: input.imageUrl,
    image_alt: input.imageAlt,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;

  revalidatePath("/admin/banners");
  revalidatePath("/");
}
