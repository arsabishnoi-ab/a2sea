export type Project = {
  slug: string;
  name: string;
  sector: string;
  location: string;
  blurb: string;
  url: string;
  /** Highlights shown on the card */
  tags: string[];
  /** Local screenshot in /public; falls back to a live screenshot when omitted */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "aurelia-grand",
    name: "Aurèlia Grand",
    sector: "Luxury hotel",
    location: "City Collection",
    blurb:
      "A cinematic luxury hotel site with live availability, direct-booking that undercuts OTA pricing, and an editorial suite showcase.",
    url: "https://anti01.vercel.app/",
    tags: ["Booking", "Direct rates", "Luxury"],
    image: "/work/aurelia-grand.png",
  },
  {
    slug: "hotel-kingston",
    name: "Hotel Kingston",
    sector: "Hotel & banquet",
    location: "Hubballi",
    blurb:
      "Full property site with rooms, dining, banquet and conference, nearby attractions, and Google Maps connectivity for business travellers.",
    url: "https://kingston-mocha.vercel.app/",
    tags: ["Booking", "Maps", "Banquet"],
    image: "/work/hotel-kingston.png",
  },
  {
    slug: "rrr-residency",
    name: "RRR Residency",
    sector: "Hotel & residency",
    location: "Kalasipalyam, Bangalore",
    blurb:
      "A clean, conversion-focused residency site built to drive direct enquiries and bookings.",
    url: "https://rrrresidency.com",
    tags: ["Booking", "Direct enquiries"],
    image: "/work/rrr-residency.jpg",
  },
  {
    slug: "white-house-hotel",
    name: "White House Hotel & Resort",
    sector: "Hotel & resort",
    location: "Sanchore, Rajasthan",
    blurb:
      "Room lines, amenities, dining and guest reviews with WhatsApp + call booking and Google Maps directions baked in.",
    url: "https://www.whitehousehotelandresort.in/",
    tags: ["WhatsApp booking", "Maps", "Reviews"],
    image: "/work/white-house-hotel.jpg",
  },
  {
    slug: "queens-coffee",
    name: "Queen's Coffee",
    sector: "Café",
    location: "Chikmagalur",
    blurb:
      "Leesmith's Chikmagalur Queen's Coffee — an editorial café experience built around menu, ritual and retail.",
    url: "https://queens-coffe.vercel.app/",
    tags: ["Café", "Menu", "Brand"],
    image: "/work/queens-coffee.png",
  },
];
