import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { SITE } from "@/lib/constants";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
