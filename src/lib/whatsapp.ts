import { SITE } from "@/lib/constants";
import type { Product } from "@/lib/types";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

export function productOrderLink(product: Pick<Product, "name" | "price">) {
  const message = `Hi Thrift Trades! I'm interested in the "${product.name}" (PKR ${product.price}). Is it still available?`;
  return buildWhatsAppLink(message);
}

export function generalInquiryLink() {
  return buildWhatsAppLink("Hi Thrift Trades! I have a question about your shoes.");
}
