"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProductImage } from "@/lib/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type ProductFormInput = {
  id?: string;
  name: string;
  categoryId: string | null;
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
  const slug = slugify(input.name);

  const payload = {
    name: input.name,
    slug,
    category_id: input.categoryId,
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
  redirect("/admin");
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
  const slug = slugify(input.name);

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
