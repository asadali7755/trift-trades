import Link from "next/link";
import { SITE, DELIVERY_CITIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-paper">
              THRIFT <span className="text-accent">TRADES</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">{SITE.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-paper/50">
              Shop
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li><Link href="/football-boots" className="hover:text-accent">Football Boots</Link></li>
              <li><Link href="/running-shoes" className="hover:text-accent">Running Shoes</Link></li>
              <li><Link href="/casual-sneakers" className="hover:text-accent">Casual Sneakers</Link></li>
              <li><Link href="/slippers" className="hover:text-accent">Slippers</Link></li>
              <li><Link href="/shop" className="hover:text-accent">All Shoes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-paper/50">
              Shop Info
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li><Link href="/about" className="hover:text-accent">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Visit Us</Link></li>
              <li>{SITE.hours}</li>
              <li>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {SITE.address.city}, {SITE.address.region}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-paper/50">
              We Deliver To
            </h3>
            <p className="mt-4 text-sm text-paper/70">{DELIVERY_CITIES.join(" · ")}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-paper/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Thrift Trades. All rights reserved.</p>
          <p>Imported quality sports shoes, delivered across Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
