import type { Metadata } from "next";
import { generalInquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Thrift Trades imports genuine, lightly-used football boots and sports shoes into Pakistan and inspects every pair before it reaches you.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl text-paper">OUR STORY</h1>
      <div className="mt-8 aspect-[9/16] w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-surface">
        <video
          className="h-full w-full object-cover"
          src="/videos/thrift-trades-shop-story-intro.mp4"
          controls
          playsInline
        />
      </div>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-paper/80">
        <p>
          Thrift Trades started with a simple problem: genuine, branded football boots and
          sports shoes are expensive in Pakistan &mdash; often out of reach for players who just
          want to play the game they love in gear that actually performs.
        </p>
        <p>
          So we built a different model. We source imported shoes directly from abroad &mdash;
          lightly used, always genuine, never fake. Every single pair is checked by hand for
          wear, comfort, and authenticity before it ever goes up for sale. What you get is real
          performance-grade footwear at a fraction of retail price.
        </p>
        <p>
          Our shop is based near Taxila, Punjab, and we ship nationwide across Pakistan &mdash;
          from Karachi to Peshawar &mdash; with cash on delivery available in most cities.
        </p>
        <p>
          No middlemen, no markup games &mdash; just honest, imported quality, one pair at a
          time.
        </p>
      </div>

      <a
        href={generalInquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex w-fit rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-accent-dark"
      >
        Chat With Us on WhatsApp
      </a>
    </div>
  );
}
