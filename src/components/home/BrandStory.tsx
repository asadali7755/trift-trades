import Image from "next/image";

const STATS = [
  { label: "Shoes In Stock", value: "50+" },
  { label: "Cities Delivered To", value: "12+" },
  { label: "Happy Customers", value: "500+" },
];

export function BrandStory() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden rounded-3xl bg-surface">
        <Image
          src="/images/thrift-trades-shop-shelf-inspected-shoes.webp"
          alt="Shelves of hand-inspected imported shoes stacked at the Thrift Trades shop"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Our Story
        </span>
        <h2 className="mt-3 font-display text-4xl text-paper">
          IMPORTED. INSPECTED. HONEST PRICING.
        </h2>
        <p className="mt-4 text-paper/70">
          Thrift Trades sources genuine, branded football boots and sports shoes from abroad
          &mdash; lightly used but carefully checked before they ever reach our shelves. We
          believe real quality shouldn&apos;t cost you full retail price. Every pair we sell is
          inspected for comfort, durability, and authenticity, so you get performance-grade
          shoes at a fraction of the cost.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl text-accent">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-paper/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
