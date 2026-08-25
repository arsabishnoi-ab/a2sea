export type WorkLayer = {
  id: string;
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
  href: string;
  cta: string;
};

/**
 * Full-bleed layers after the hero. Order is the slide sequence.
 * Add the two extra layers here when you're ready — the slider picks them up automatically.
 */
export const workLayers: WorkLayer[] = [
  {
    id: "portfolios",
    place: "Selected work",
    title: "PORT",
    title2: "FOLIOS",
    description:
      "Professional sites for advocates, chambers, and practices — credentials, matters, and consultation, built to convert visitors into clients.",
    image: "/work/arvind-b-reddy-law-chambers.jpg",
    href: "#work",
    cta: "See the work",
  },
  {
    id: "furniture",
    place: "Retail",
    title: "FURNITURE",
    title2: "STORES",
    description:
      "Showroom sites with catalogues, enquiry flows, and a retail presence that feels like the floor — not a template shop.",
    image: "/work/mahaveer-marketing.jpg",
    href: "#furniture",
    cta: "See stores",
  },
  {
    id: "hotels",
    place: "Hospitality",
    title: "HOTELS",
    title2: "& STAYS",
    description:
      "Property sites with live availability, direct booking that undercuts OTAs, and an editorial showcase for rooms, dining, and banquet.",
    image: "/work/aurelia-grand.jpg",
    href: "#hotels-cafes",
    cta: "See hotels",
  },
  {
    id: "cafes",
    place: "Food & drink",
    title: "CAFÉS",
    title2: "& RITUAL",
    description:
      "Editorial café and restaurant sites — menus, hours, ritual, and retail — designed like the counter, built to bring people in.",
    image: "/work/queens-coffee-hd.jpg",
    href: "#hotels-cafes",
    cta: "See cafés",
  },
];
