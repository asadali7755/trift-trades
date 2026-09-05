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
    latitude: 33.8908272,
    longitude: 72.3214035,
  },
  mapsUrl:
    "https://www.google.com/maps/place/33%C2%B053'27.0%22N+72%C2%B019'17.1%22E/@33.8908272,72.3188286,17z",
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
