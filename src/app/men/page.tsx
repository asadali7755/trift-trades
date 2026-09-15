import type { Metadata } from "next";
import { GenderShopPage } from "@/components/shop/GenderShopPage";

export const metadata: Metadata = {
  title: "Men's Shoes in Pakistan | Imported Football & Sports Shoes",
  description:
    "Shop imported football boots, running shoes, and sneakers for men at Thrift Trades — genuine quality, honest prices, nationwide delivery across Pakistan.",
};

export default function MenPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return <GenderShopPage gender="men" searchParams={searchParams} />;
}
