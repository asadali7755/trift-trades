import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { SITE } from "@/lib/constants";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
      className={`${bebasNeue.variable} ${dmSans.variable} h-full antialiased`}
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
