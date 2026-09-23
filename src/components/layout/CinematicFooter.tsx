"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { generalInquiryLink } from "@/lib/whatsapp";
import { DELIVERY_CITIES } from "@/lib/constants";

const MARQUEE_ITEMS = [
  "Imported Quality",
  "Genuine Shoes",
  "Nationwide Delivery",
  "Cash On Delivery",
];

// A pill that drifts slightly toward the cursor, like a magnet — pure CSS
// transform driven by Framer Motion's spring, no new animation library.
function MagneticPill({
  href,
  external,
  primary,
  children,
}: {
  href: string;
  external?: boolean;
  primary?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:bg-accent-dark"
          : "inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-paper/70 backdrop-blur transition hover:border-accent/50 hover:text-accent"
      }
    >
      {children}
    </motion.div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["8vh", "0vh"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  const marquee = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    // The clip-path here isn't decorative — it's what makes the `fixed`
    // footer below position itself against THIS box instead of the real
    // viewport (any clip-path/transform/filter ancestor becomes the
    // containing block for a fixed descendant), which is what produces the
    // "curtain lifting" reveal as the page scrolls past this h-screen slot.
    <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: "inset(0)" }}>
      <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden border-t border-white/10 bg-ink text-paper">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundSize: "56px 56px",
            backgroundImage:
              "linear-gradient(to right, rgba(243,241,234,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,241,234,0.04) 1px, transparent 1px)",
            maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        />

        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          className="pointer-events-none absolute -bottom-[4vh] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-[0.75] text-paper/5"
        >
          Trades
        </motion.div>

        <div className="absolute top-24 w-full -rotate-1 overflow-hidden border-y border-white/10 py-3">
          <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
            {marquee.map((item, i) => (
              <span
                key={i}
                className="text-xs font-bold uppercase tracking-[0.2em] text-paper/40"
              >
                {item} <span className="text-accent">&middot;</span>
              </span>
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Genuine &middot; Imported &middot; Ready To Ship
          </span>
          <h2 className="mt-4 font-display font-display-italic text-5xl text-paper sm:text-6xl">
            Find Your Next Pair.
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticPill href={generalInquiryLink()} external primary>
              <MessageCircle size={16} />
              Order on WhatsApp
            </MagneticPill>
            <MagneticPill href="/shop">Browse All Shoes</MagneticPill>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <MagneticPill href="/men">Men</MagneticPill>
            <MagneticPill href="/women">Women</MagneticPill>
            <MagneticPill href="/kids">Kids</MagneticPill>
            <MagneticPill href="/about">Our Story</MagneticPill>
            <MagneticPill href="/contact">Visit Us</MagneticPill>
          </div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-4 px-6 pb-8 sm:flex-row sm:px-12">
          <p className="text-[10px] uppercase tracking-widest text-paper/40">
            &copy; {new Date().getFullYear()} Thrift Trades &mdash; delivering to{" "}
            {DELIVERY_CITIES.length}+ cities across Pakistan
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper/60 transition hover:border-accent hover:text-accent"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
