"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { generalInquiryLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink">
      <Image
        src="/images/thrift-trades-shop-wall-shoe-display-collection.webp"
        alt="Wall-to-wall display of imported football boots and sneakers at the Thrift Trades shop"
        fill
        sizes="100vw"
        className="object-cover opacity-90"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Imported &middot; Inspected &middot; Nationwide
          </span>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] text-paper sm:text-7xl lg:text-8xl">
            Genuine
            <br />
            <span className="font-display-italic text-accent">Import.</span>
            <br />
            Honest Price.
          </h1>
          <p className="mt-6 max-w-lg text-base text-paper/70 sm:text-lg">
            Branded football boots and sports shoes, sourced abroad and hand-checked before they
            reach you &mdash; delivered anywhere in Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-sm bg-accent px-7 py-3 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:bg-accent-dark"
            >
              Shop The Edit
            </Link>
            <a
              href={generalInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/20 px-7 py-3 text-xs font-extrabold uppercase tracking-widest text-paper transition hover:border-accent hover:text-accent"
            >
              Order on WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-sm bg-surface shadow-2xl shadow-black/50"
        >
          <Image
            src="/images/imported-nike-football-boots-on-turf-thrift-trades.webp"
            alt="Imported Nike football boots on artificial turf at Thrift Trades"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 right-6 w-40 rounded-sm border border-white/10 bg-ink/90 p-3 backdrop-blur"
          >
            <div className="relative h-24 w-full overflow-hidden rounded-sm">
              <Image
                src="/images/imported-puma-sneaker-on-turf-thrift-trades.webp"
                alt="Imported Puma sneaker on turf at Thrift Trades"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-paper/50">
              Just In
            </div>
            <div className="font-display font-display-italic text-lg text-paper">
              Puma Sneaker
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
