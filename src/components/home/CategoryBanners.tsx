import Link from "next/link";

const BANNERS = [
  {
    href: "/football-boots",
    title: "Football Boots",
    subtitle: "Firm ground, turf & indoor",
    image: "/hero-placeholder.jpg",
  },
  {
    href: "/running-shoes",
    title: "Running Shoes",
    subtitle: "Everyday training miles",
    image: "/hero-placeholder.jpg",
  },
];

export function CategoryBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {BANNERS.map((banner) => (
          <Link
            key={banner.href}
            href={banner.href}
            className="group relative flex h-64 items-end overflow-hidden rounded-3xl bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="relative p-6">
              <h3 className="font-display text-3xl text-paper">{banner.title}</h3>
              <p className="mt-1 text-sm text-paper/70">{banner.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
