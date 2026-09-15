import type { Metadata } from "next";
import { GenderShopPage } from "@/components/shop/GenderShopPage";

export const metadata: Metadata = {
  title: "Women's Shoes in Pakistan | Imported Sports Shoes & Sneakers",
  description:
    "Shop imported sports shoes and sneakers for women at Thrift Trades — genuine quality, honest prices, nationwide delivery across Pakistan.",
};

export default function WomenPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return <GenderShopPage gender="women" searchParams={searchParams} />;
}
