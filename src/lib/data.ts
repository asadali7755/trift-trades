import { createPublicClient } from "@/lib/supabase/public";
import type { Brand, Category, Condition, GenderBanner, Product } from "@/lib/types";

const PAGE_SIZE = 24;

// Supabase credentials are provided by the shop owner after they create a
// project (see .env.example). Until then, data calls degrade to empty
// results instead of crashing the page, so the site is still browsable
// during setup/design review.
function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Every read here is a public, RLS-open SELECT (see "Public read" policies in
// supabase/migrations/0001_init.sql) — none of it needs a signed-in session,
// so it goes through the cookie-free client. That also keeps these functions
// safe to call from build-time contexts like generateStaticParams and
// sitemap.ts, where request-bound cookies aren't available.

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getBrands(): Promise<Brand[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getConditions(): Promise<Condition[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("conditions")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export type ProductFilters = {
  categorySlug?: string;
  gender?: string;
  size?: string;
  brandSlug?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
};

export async function getProducts(filters: ProductFilters = {}) {
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  if (!isSupabaseConfigured()) {
    return { products: [] as Product[], total: 0, page, pageSize: PAGE_SIZE, totalPages: 1 };
  }
  const supabase = createPublicClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)", { count: "exact" })
    .eq("is_in_stock", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.categorySlug) {
    const category = await getCategoryBySlug(filters.categorySlug);
    if (category) query = query.eq("category_id", category.id);
  }
  if (filters.gender) {
    query = query.eq("gender", filters.gender);
  }
  if (filters.size) {
    query = query.contains("sizes", [filters.size]);
  }
  if (filters.brandSlug) {
    const brand = await getBrandBySlug(filters.brandSlug);
    if (brand) query = query.eq("brand_id", brand.id);
  }
  if (filters.condition) {
    query = query.eq("condition", filters.condition);
  }
  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    products: (data ?? []) as Product[],
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("is_in_stock", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as Product | null;
}

export async function getRelatedProducts(
  categoryId: string | null,
  excludeId: string,
  limit = 4
): Promise<Product[]> {
  if (!categoryId || !isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("category_id", categoryId)
    .eq("is_in_stock", true)
    .neq("id", excludeId)
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getAllProductsForAdmin(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as Product | null;
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("products").select("slug").eq("is_in_stock", true);
  if (error) throw error;
  return data ?? [];
}

// Ordered men/women/kids so the homepage "Shop by" section and the admin
// banner manager always render in the same sequence, regardless of row
// insertion order in the database.
const GENDER_ORDER = ["men", "women", "kids"] as const;

export async function getGenderBanners(): Promise<GenderBanner[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("gender_banners").select("*");
  if (error) throw error;
  const rows = (data ?? []) as GenderBanner[];
  return GENDER_ORDER.map(
    (gender) => rows.find((r) => r.gender === gender) ?? { gender, label: gender, image_url: null, image_alt: null }
  );
}
