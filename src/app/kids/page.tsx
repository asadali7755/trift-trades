import type { Metadata } from "next";
import { GenderShopPage } from "@/components/shop/GenderShopPage";

export const metadata: Metadata = {
  title: "Kids' Shoes in Pakistan | Imported Sports Shoes",
  description:
    "Shop imported sports shoes for kids at Thrift Trades — same quality checks, kid-friendly prices, nationwide delivery across Pakistan.",
};

export default function KidsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  return <GenderShopPage gender="kids" searchParams={searchParams} />;
}
