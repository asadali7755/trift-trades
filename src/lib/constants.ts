export const SITE = {
  name: "Thrift Trades",
  tagline: "Imported Quality Sports Shoes",
  description:
    "Thrift Trades brings imported, lightly-used branded football boots and sports shoes to Pakistan — genuine quality at honest prices.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923000000000",
  address: {
    street: "Taxila Road", // TODO: confirm exact shop address text with owner
    city: "Taxila",
    region: "Punjab",
    country: "PK",
  },
  geo: {
    latitude: 33.8906832,
    longitude: 72.3214719,
  },
  // The shop's actual Google Business Profile listing (verified with the owner).
  mapsUrl: "https://www.google.com/maps/place/trift-trades/@33.8906832,72.3214719,17z",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.960031110881!2d72.32147189999999!3d33.8906832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df21d2b18ff8ad%3A0xa73fb07fe2932ef6!2strift-trades!5e0!3m2!1sen!2s!4v1789617831987!5m2!1sen!2s",
  hours: "Daily 10:00 AM - 9:00 PM",
} as const;

export const DELIVERY_CITIES = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Faisalabad",
  "Peshawar",
  "Multan",
  "Gujranwala",
  "Sialkot",
  "Wah Cantt",
  "Taxila",
  "Abbottabad",
] as const;
