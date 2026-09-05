import type { Metadata } from "next";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";
import { generalInquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Visit Us",
  description: `Find Thrift Trades in ${SITE.address.city}, ${SITE.address.region} — imported football boots and sports shoes. Order on WhatsApp or visit in person.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl text-paper">VISIT US</h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex gap-4">
            <MapPin className="mt-1 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-paper">Shop Location</h3>
              <p className="text-paper/70">
                {SITE.address.street}, {SITE.address.city}, {SITE.address.region}, Pakistan
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-accent hover:underline"
              >
                Get directions on Google Maps &rarr;
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock className="mt-1 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-paper">Hours</h3>
              <p className="text-paper/70">{SITE.hours}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <MessageCircle className="mt-1 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-paper">Order Online</h3>
              <p className="text-paper/70">
                Can&apos;t visit in person? Order any shoe straight from the shop on WhatsApp.
              </p>
              <a
                href={generalInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
              >
                <MessageCircle size={16} />
                Chat Now
              </a>
            </div>
          </div>
        </div>

        <div className="aspect-square w-full overflow-hidden rounded-2xl lg:aspect-auto">
          <iframe
            title="Thrift Trades location map"
            className="h-full min-h-[320px] w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${SITE.geo.latitude},${SITE.geo.longitude}&hl=en&z=16&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}
