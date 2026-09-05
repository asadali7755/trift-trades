export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  category?: Category | null;
  price: number;
  compare_at_price: number | null;
  sizes: string[];
  condition: string;
  description: string | null;
  images: ProductImage[];
  video_url: string | null;
  video_thumbnail_url: string | null;
  is_featured: boolean;
  is_in_stock: boolean;
  created_at: string;
  updated_at: string;
};
