"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";
import { generalInquiryLink } from "@/lib/whatsapp";
import { SHOE_SIZES } from "@/lib/shopOptions";
import type { Brand } from "@/lib/types";

const NAV_LINKS = [
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/kids", label: "Kids" },
  { href: "/shop", label: "All Shoes" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Location" },
];

const GENDERS: { href: "/men" | "/women" | "/kids"; label: string }[] = [
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/kids", label: "Kids" },
];

const OTHER_LINKS = [
  { href: "/shop", label: "All Shoes" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Location" },
];

export function Header({ brands = [] }: { brands?: Brand[] }) {
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  function closeAll() {
    setOpen(false);
    setOpenGender(null);
    setOpenSub(null);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle menu"
            className="flex items-center justify-center rounded-full p-1.5 text-paper transition hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/thrift-trades-logo-badge.webp"
              alt="Thrift Trades logo — football boots, casual sneakers, and running shoes badge"
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]"
              priority
            />
            <span className="font-display font-display-italic text-xl text-paper">
              Thrift Trades
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-paper/70 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={generalInquiryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent transition hover:bg-accent hover:text-ink sm:inline-flex"
        >
          <MessageCircle size={16} />
          Order on WhatsApp
        </a>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      {open && (
        <nav className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col gap-1 overflow-y-auto bg-ink px-4 py-4 shadow-2xl">
          <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-display font-display-italic text-xl text-paper">Menu</span>
            <button
              aria-label="Close menu"
              className="rounded-full p-1.5 text-paper/70 hover:bg-white/5"
              onClick={closeAll}
            >
              <X size={22} />
            </button>
          </div>
          {GENDERS.map((g) => {
            const isOpen = openGender === g.href;
            return (
              <div key={g.href} className="border-b border-white/5">
                <div className="flex items-center justify-between">
                  <Link
                    href={g.href}
                    onClick={closeAll}
                    className="flex-1 py-3 text-base font-semibold text-paper/90"
                  >
                    {g.label}
                  </Link>
                  <button
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${g.label}`}
                    onClick={() => {
                      setOpenGender(isOpen ? null : g.href);
                      setOpenSub(null);
                    }}
                    className="p-3 text-paper/50"
                  >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>

                {isOpen && (
                  <div className="pb-3 pl-3">
                    <SubAccordion
                      label="Shop by Brand"
                      open={openSub === `${g.href}-brand`}
                      onToggle={() =>
                        setOpenSub(openSub === `${g.href}-brand` ? null : `${g.href}-brand`)
                      }
                    >
                      {brands.length === 0 ? (
                        <p className="py-2 text-sm text-paper/40">No brands added yet.</p>
                      ) : (
                        brands.map((b) => (
                          <Link
                            key={b.id}
                            href={`${g.href}?brand=${b.slug}`}
                            onClick={closeAll}
                            className="block py-2 text-sm text-paper/70"
                          >
                            {b.name}
                          </Link>
                        ))
                      )}
                    </SubAccordion>

                    <SubAccordion
                      label="Shop by Size"
                      open={openSub === `${g.href}-size`}
                      onToggle={() =>
                        setOpenSub(openSub === `${g.href}-size` ? null : `${g.href}-size`)
                      }
                    >
                      <div className="flex flex-wrap gap-2 py-2">
                        {SHOE_SIZES.map((size) => (
                          <Link
                            key={size}
                            href={`${g.href}?size=${size}`}
                            onClick={closeAll}
                            className="rounded-full bg-surface-light px-3 py-1.5 text-xs font-semibold text-paper/80"
                          >
                            {size}
                          </Link>
                        ))}
                      </div>
                    </SubAccordion>
                  </div>
                )}
              </div>
            );
          })}

          {OTHER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className="rounded-lg px-1 py-3 text-base font-semibold text-paper/90 hover:bg-white/5"
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

function SubAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-left text-xs font-semibold uppercase tracking-wider text-paper/50"
      >
        {label}
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && <div className="pl-2">{children}</div>}
    </div>
  );
}
