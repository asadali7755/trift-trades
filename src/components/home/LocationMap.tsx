import { MapPin, Star } from "lucide-react";
import { SITE } from "@/lib/constants";

export function LocationMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display font-display-italic text-3xl text-paper sm:text-4xl">
            Visit Our Shop
          </h2>
          <p className="mt-3 flex items-start gap-2 text-paper/60">
            <MapPin className="mt-0.5 shrink-0 text-accent" size={18} />
            {SITE.address.street}, {SITE.address.city}, {SITE.address.region}, Pakistan
          </p>
          <p className="mt-1 text-paper/60">{SITE.hours}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-accent pb-1 text-xs font-semibold uppercase tracking-widest text-accent"
            >
              Get Directions On Google Maps &rarr;
            </a>
            <a
              href={SITE.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-accent pb-1 text-xs font-semibold uppercase tracking-widest text-accent"
            >
              <Star size={13} className="fill-accent" />
              Leave Us A Review
            </a>
          </div>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-sm">
          <iframe
            title="Thrift Trades location map"
            className="h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={SITE.mapsEmbedUrl}
          />
        </div>
      </div>
    </section>
  );
}
