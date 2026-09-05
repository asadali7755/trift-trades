"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { generalInquiryLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Imported &middot; Genuine &middot; Affordable
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-paper sm:text-6xl lg:text-7xl">
            OWN THE PITCH
            <br />
            IN <span className="text-accent">IMPORTED</span> BOOTS
          </h1>
          <p className="mt-6 max-w-lg text-base text-paper/70 sm:text-lg">
            Thrift Trades brings genuine, imported football boots and sports shoes to Pakistan
            &mdash; lightly used, carefully checked, and priced far below retail. Real quality
            you can actually afford.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
            >
              Shop All Shoes
            </Link>
            <a
              href={generalInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-bold uppercase tracking-wide text-paper transition hover:border-accent hover:text-accent"
            >
              Order on WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface"
        >
          <Image
            src="/images/imported-nike-sneaker-thrift-trades.webp"
            alt="Imported Nike sneaker on artificial turf at Thrift Trades in Taxila"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
