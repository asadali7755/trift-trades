"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORY_LINKS = [
  {
    heading: "Football Boots",
    subheading: "Firm ground, turf & indoor",
    imgSrc: "/images/imported-nike-football-boots-on-turf-thrift-trades.webp",
    href: "/football-boots",
  },
  {
    heading: "Running Shoes",
    subheading: "Everyday training miles",
    imgSrc: "/images/imported-running-shoes-collection-thrift-trades.webp",
    href: "/running-shoes",
  },
  {
    heading: "Casual Sneakers",
    subheading: "On and off the pitch",
    imgSrc: "/images/imported-puma-sneaker-on-turf-thrift-trades.webp",
    href: "/casual-sneakers",
  },
  {
    heading: "Kids' Shoes",
    subheading: "Same checks, kid-friendly prices",
    imgSrc: "/images/thrift-trades-shop-shelf-inspected-shoes.webp",
    href: "/kids-shoes",
  },
  {
    heading: "Slippers",
    subheading: "Everyday comfort, genuine brands",
    imgSrc: "/images/thrift-trades-shop-wall-shoe-display-collection.webp",
    href: "/slippers",
  },
];

type CategoryLink = (typeof CATEGORY_LINKS)[number];

export function CategoryHoverLinks({
  links = CATEGORY_LINKS,
}: {
  links?: CategoryLink[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <h2 className="font-display font-display-italic text-3xl text-paper sm:text-4xl">
        Shop By Category
      </h2>
      <div className="mt-6">
        {links.map((link) => (
          <CategoryLinkRow key={link.heading} {...link} />
        ))}
      </div>
    </section>
  );
}

function CategoryLinkRow({ heading, imgSrc, subheading, href }: CategoryLink) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    setHovered(false);
    x.set(0);
    y.set(0);
  }

  const hoverState = hovered ? "whileHover" : "initial";

  return (
    <Link
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-between border-b border-white/10 py-6 transition-colors duration-500 hover:border-accent/50 md:py-8"
    >
      <div>
        <motion.span
          animate={hoverState}
          variants={{ initial: { x: 0 }, whileHover: { x: -12 } }}
          transition={{ type: "spring", staggerChildren: 0.05, delayChildren: 0.15 }}
          className="font-display font-display-italic relative z-10 block text-3xl text-paper/60 transition-colors duration-500 group-hover:text-paper md:text-5xl"
        >
          {heading.split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={{ initial: { x: 0 }, whileHover: { x: 12 } }}
              transition={{ type: "spring" }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-sm text-paper/40 transition-colors duration-500 group-hover:text-paper/70">
          {subheading}
        </span>
      </div>

      <motion.img
        animate={hoverState}
        style={{ top, left, translateX: "-10%", translateY: "-50%" }}
        variants={{
          initial: { scale: 0, rotate: "-12deg" },
          whileHover: { scale: 1, rotate: "6deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        alt=""
        className="absolute z-0 hidden h-28 w-40 rounded-sm object-cover shadow-2xl shadow-black/50 sm:block md:h-48 md:w-64"
      />

      <div className="overflow-hidden">
        <motion.div
          animate={hoverState}
          variants={{
            initial: { x: "100%", opacity: 0 },
            whileHover: { x: "0%", opacity: 1 },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <ArrowRight className="size-7 text-accent md:size-10" />
        </motion.div>
      </div>
    </Link>
  );
}
