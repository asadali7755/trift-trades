// One-off seed script: uploads real shop photos/videos to Cloudinary and
// inserts the matching product rows directly into Supabase (via the
// service_role key, bypassing RLS — this is a trusted server-side script,
// not something exposed to the app).
//
// Run with: node --env-file=.env.local scripts/seed-real-products.mjs

import { readFile } from "node:fs/promises";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !CLOUD_NAME || !UPLOAD_PRESET) {
  console.error("Missing required env vars — run with `node --env-file=.env.local ...`");
  process.exit(1);
}

const SHOP_DIR = "E:/Downloads/hassan ali shouse";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadToCloudinary(filePath, resourceType) {
  const buffer = await readFile(filePath);
  const blob = new Blob([buffer]);
  const form = new FormData();
  form.append("file", blob, filePath.split("/").pop());
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    { method: "POST", body: form }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(`Cloudinary upload failed for ${filePath}: ${JSON.stringify(json)}`);
  return json;
}

async function insertProduct(payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Supabase insert failed: ${JSON.stringify(json)}`);
  return json;
}

async function getCategoryId(slug) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/categories?slug=eq.${slug}&select=id`, {
    headers: { apikey: SERVICE_ROLE_KEY, Authorization: `Bearer ${SERVICE_ROLE_KEY}` },
  });
  const json = await res.json();
  if (!res.ok || !json[0]) throw new Error(`Category not found: ${slug}`);
  return json[0].id;
}

const PRODUCTS = [
  {
    name: "Canvas Hi-Top Sneaker - Grey",
    image: "uk10.2000.jpeg",
    video: null,
    price: 2000,
    sizes: ["10"],
    category: "casual-sneakers",
  },
  {
    name: "Puma Sneaker - Navy & White",
    image: "uk10.2000,d.jpeg",
    video: null,
    price: 2000,
    sizes: ["10"],
    category: "casual-sneakers",
  },
  {
    name: "Nike Running Sneaker - Cream & Coral",
    image: "uk6.2000.jpeg",
    video: "uk6.2000same.mp4",
    price: 2000,
    sizes: ["6"],
    category: "running-shoes",
  },
  {
    name: "Nike Flyknit Sneaker - Grey",
    image: "uk6.1000.jpeg",
    video: null,
    price: 1000,
    sizes: ["6"],
    category: "running-shoes",
  },
  {
    name: "Nike Sock-Fit Runner - Grey & Black",
    image: "uk6,2000 d.jpeg",
    video: null,
    price: 2000,
    sizes: ["6.5"],
    category: "running-shoes",
  },
  {
    name: "Nike Runner - All Black",
    image: "uk4.5I.jpeg",
    video: "uk'6.5.mp4",
    price: 3000,
    sizes: ["6"],
    category: "running-shoes",
  },
  {
    name: "Running Shoe - Cream & Pink Laces",
    image: "uk7.5.1500.jpeg",
    video: null,
    price: 1500,
    sizes: ["7.5"],
    category: "running-shoes",
  },
  {
    name: "Pro Player Sneaker - All Black",
    image: "uk9,1500.jpeg",
    video: null,
    price: 1500,
    sizes: ["9"],
    category: "casual-sneakers",
  },
];

for (const p of PRODUCTS) {
  console.log(`\n=== ${p.name} ===`);
  const categoryId = await getCategoryId(p.category);

  console.log("Uploading image...");
  const imageResult = await uploadToCloudinary(`${SHOP_DIR}/${p.image}`, "image");

  let videoUrl = null;
  if (p.video) {
    console.log("Uploading video...");
    const videoResult = await uploadToCloudinary(`${SHOP_DIR}/${p.video}`, "video");
    videoUrl = videoResult.secure_url;
  }

  const slug = `${slugify(p.name)}-uk${p.sizes[0].replace(".", "-")}`;

  const inserted = await insertProduct({
    name: p.name,
    slug,
    category_id: categoryId,
    price: p.price,
    sizes: p.sizes,
    condition: "Lightly Used - Imported",
    images: [{ url: imageResult.secure_url, alt: p.name }],
    video_url: videoUrl,
    is_featured: false,
    is_in_stock: true,
  });

  console.log("Inserted:", inserted[0]?.slug);
}

console.log("\nDone.");
