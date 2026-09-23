import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { CinematicFooter } from "@/components/layout/CinematicFooter";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { SITE } from "@/lib/constants";
import { getBrands } from "@/lib/data";

const fraunces = Fraunces({
  variable: "--font-serif",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Imported Football & Sports Shoes in Pakistan`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "sports shoes Pakistan",
    "football shoes Pakistan",
    "imported football boots Pakistan",
    "used branded football shoes Pakistan",
    "thrift sports shoes",
    "football boots Islamabad Rawalpindi",
  ],
  openGraph: {
    title: `${SITE.name} | Imported Football & Sports Shoes in Pakistan`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_PK",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const brands = await getBrands();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <Header brands={brands} />
        <main className="flex-1">{children}</main>
        <CinematicFooter />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
