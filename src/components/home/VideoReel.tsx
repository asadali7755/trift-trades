import Link from "next/link";

export function VideoReel() {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/thrift-trades-shop-floor-reel.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div className="relative flex h-full max-w-7xl flex-col justify-end gap-4 px-4 pb-14 mx-auto sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl text-paper sm:text-5xl">
          FROM OUR SHOP FLOOR TO YOUR FEET
        </h2>
        <p className="max-w-xl text-paper/80">
          Real shoes, real shop, real quality &mdash; see what&apos;s on our racks right now.
        </p>
        <Link
          href="/shop"
          className="w-fit rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
        >
          Browse The Collection
        </Link>
      </div>
    </section>
  );
}
