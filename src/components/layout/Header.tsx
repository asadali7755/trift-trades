"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { generalInquiryLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/shop", label: "All Shoes" },
  { href: "/football-boots", label: "Football Boots" },
  { href: "/running-shoes", label: "Running" },
  { href: "/casual-sneakers", label: "Casual" },
  { href: "/slippers", label: "Slippers" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Location" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-3xl tracking-wide text-paper">
          THRIFT <span className="text-accent">TRADES</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-paper/80 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={generalInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-accent-dark sm:inline-flex"
          >
            <MessageCircle size={16} />
            Order on WhatsApp
          </a>
          <button
            aria-label="Toggle menu"
            className="text-paper lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-ink px-4 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-paper/90 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={generalInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-ink"
          >
            <MessageCircle size={16} />
            Order on WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
