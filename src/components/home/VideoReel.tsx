import Link from "next/link";

export function VideoReel() {
  return (
    <section className="border-y border-white/10 bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <h2 className="font-display text-4xl text-paper sm:text-5xl">
            FROM OUR SHOP FLOOR TO YOUR FEET
          </h2>
          <p className="max-w-xl text-paper/70">
            Real shoes, real shop, real quality &mdash; see what&apos;s on our racks right now.
          </p>
          <Link
            href="/shop"
            className="w-fit rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
          >
            Browse The Collection
          </Link>
        </div>
        <div className="order-1 mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-ink lg:order-2">
          <video
            className="h-full w-full object-cover"
            src="/videos/thrift-trades-shop-floor-reel.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
}
