import { DELIVERY_CITIES } from "@/lib/constants";

export function DeliveryCities() {
  return (
    <section className="border-t border-white/10 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl text-paper">WE DELIVER NATIONWIDE</h2>
        <p className="mt-2 max-w-xl text-paper/60">
          Order from anywhere in Pakistan &mdash; cash on delivery available in most cities.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {DELIVERY_CITIES.map((city) => (
            <div
              key={city}
              className="rounded-xl border border-white/10 bg-surface-light px-4 py-3 text-center text-sm font-medium text-paper/80"
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
