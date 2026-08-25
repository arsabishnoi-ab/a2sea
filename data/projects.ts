export type Project = {
  slug: string;
  name: string;
  sector: string;
  location: string;
  blurb: string;
  url: string;
  tags: string[];
  image?: string;
};

export type WorkSection = {
  id: string;
  title: string;
  description: string;
  primary?: boolean;
  projects: Project[];
};

export const workSections: WorkSection[] = [
  {
    id: "lawyers",
    title: "Lawyers & Legal",
    description: "Professional websites for advocates, chambers, and legal practices.",
    primary: true,
    projects: [
      {
        slug: "arvind-b-reddy-law-chambers",
        name: "Arvind B Reddy Law Chambers",
        sector: "Law chambers",
        location: "Bengaluru",
        blurb:
          "Adv. Arvind B. Reddy (B.E., LL.B.) — 10+ years across civil, criminal, constitutional, commercial, property, and family matters in Bengaluru.",
        url: "https://www.abrlawchambers.in/",
        tags: ["Chambers", "Advocate", "Consultation"],
        image: "/work/arvind-b-reddy-law-chambers.jpg",
      },
      {
        slug: "advocate-sujnaneshwari-shetty",
        name: "Advocate Sujnaneshwari Shetty",
        sector: "Legal",
        location: "Bengaluru",
        blurb:
          "Independent advocate site with practice areas, credentials, and direct consultation — 15+ years of active litigation.",
        url: "https://advocatesujnaneshwarishetty.com/",
        tags: ["Legal", "Profile", "Contact"],
        image: "/work/advocate-sujnaneshwari-shetty.jpg",
      },
      {
        slug: "kiran-thirumalesh",
        name: "Kiran Thirumalesh J.",
        sector: "Legal",
        location: "Bengaluru",
        blurb:
          "Advocate & legal consultant — family, civil, consumer, property, cheque bounce, and arbitration matters across Bengaluru.",
        url: "https://kiranthirumalesh.com/",
        tags: ["Legal", "Advocate", "Consultation"],
        image: "/work/kiran-thirumalesh.jpg",
      },
      {
        slug: "legal-sys-info",
        name: "Legal Sys Info",
        sector: "Legal",
        location: "India",
        blurb: "Legal services presence with structured information and contact pathways.",
        url: "https://legalsysinfo.com/",
        tags: ["Legal", "Services", "Info"],
        image: "/work/legal-sys-info.jpg",
      },
      {
        slug: "karthik-m-law-associates",
        name: "Karthik M Law Associates",
        sector: "Law firm",
        location: "Bengaluru",
        blurb: "Criminal defence and legal counsel — advocate profile with practice areas, cases, and consultation booking.",
        url: "https://karthikmlawassociates.in/",
        tags: ["Law firm", "Criminal defence", "Consult"],
        image: "/work/karthik-m-law-associates.jpg",
      },
      {
        slug: "advocate-selva-kumar",
        name: "Chambers of Advocate Selva Kumar",
        sector: "Legal",
        location: "BTM Layout, Bengaluru",
        blurb:
          "Advocate Selva Kumar. T (BBA LLB) — property, family, civil, criminal and documentation matters with Supreme Law Associates, BTM 1st Stage.",
        url: "https://advocatesk23.in/",
        tags: ["Advocate", "Property", "Consultation"],
        image: "/work/advocate-selva-kumar.jpg",
      },
      {
        slug: "advocate-jayashree-sridhar",
        name: "Chambers of Advocate Jayashree Sridhar",
        sector: "Legal",
        location: "Bengaluru",
        blurb:
          "39+ years at the Karnataka bar — civil litigation, property due diligence, family law, land acquisition, consumer matters, and wills.",
        url: "https://advocatejayashreesridhar.in/",
        tags: ["Advocate", "Civil", "Consultation"],
        image: "/work/advocate-jayashree-sridhar.jpg",
      },
      {
        slug: "vakil-chavadi",
        name: "Vakil Chavadi",
        sector: "Law chambers",
        location: "Hebbal, Bengaluru",
        blurb:
          "Advocate K. N. Praveen Kumar — 34 years at New Law Chambers, Hebbal. Civil, criminal, constitutional, family, arbitration, and High Court practice.",
        url: "https://vakilchavadi.in/",
        tags: ["Chambers", "Advocate", "Consultation"],
        image: "/work/vakil-chavadi.jpg",
      },
    ],
  },
  {
    id: "hotels-cafes",
    title: "Hotels & Cafés",
    description: "Booking-ready sites for hotels, residencies, resorts, and cafés.",
    projects: [
      {
        slug: "aurelia-grand",
        name: "Aurèlia Grand",
        sector: "Luxury hotel",
        location: "City Collection",
        blurb:
          "A cinematic luxury hotel site with live availability, direct-booking that undercuts OTA pricing, and an editorial suite showcase.",
        url: "https://anti01.vercel.app/",
        tags: ["Booking", "Direct rates", "Luxury"],
        image: "/work/aurelia-grand.jpg",
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
        image: "/work/hotel-kingston.jpg",
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
        image: "/work/rrr-residency-hd.jpg",
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
        image: "/work/white-house-hotel-hd.jpg",
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
        image: "/work/queens-coffee-hd.jpg",
      },
    ],
  },
  {
    id: "transport",
    title: "Transport Services",
    description: "Websites for logistics, fleet, and transport businesses.",
    projects: [
      {
        slug: "jjt-transport",
        name: "JJT Transport",
        sector: "Transport",
        location: "India",
        blurb: "Transport services site built to present routes, services, and booking enquiries clearly.",
        url: "https://jjt-seven.vercel.app/",
        tags: ["Transport", "Services", "Enquiries"],
        image: "/work/jjt-transport.jpg",
      },
    ],
  },
  {
    id: "furniture",
    title: "Furniture stores",
    description: "Showroom sites with catalogues, enquiry flows, and a retail presence that feels like the floor.",
    projects: [
      {
        slug: "mahaveer-marketing",
        name: "Mahaveer Marketing",
        sector: "Furniture retail",
        location: "Jayanagar, Bengaluru",
        blurb:
          "32-year shop on 4th Cross — chairs, cupboards, tables, beds, ladders, stands and mops. Own manufacturer, free delivery.",
        url: "https://mahaveer-marketing-teal.vercel.app/",
        tags: ["Showroom", "Catalogue", "Enquire"],
        image: "/work/mahaveer-marketing.jpg",
      },
      {
        slug: "royal-furniture",
        name: "Royal Furniture",
        sector: "Furniture & interiors",
        location: "Kengeri, Bengaluru",
        blurb:
          "Handmade in India since 1974 — sofas, recliners, theatre seating, carpets, curtains and floors from the Kengeri showroom.",
        url: "https://royal-furnitures-pi.vercel.app/",
        tags: ["Collections", "Showroom", "Craft"],
        image: "/work/royal-furniture.jpg",
      },
    ],
  },
  {
    id: "business",
    title: "Business groups",
    description: "Group and holding-company sites that present ventures, locations, and a single point of contact.",
    projects: [
      {
        slug: "bishnoi-group",
        name: "Bishnoi Group",
        sector: "Business group",
        location: "Hubballi · Goa · Bengaluru",
        blurb:
          "Holding company for distribution, hospitality and real estate — Bishnoi ventures across Hubballi, Goa, Bengaluru and Sanchore.",
        url: "https://bishnoigroup.com/",
        tags: ["Group", "Ventures", "Hospitality"],
        image: "/work/bishnoi-group.jpg",
      },
    ],
  },
  {
    id: "ecom",
    title: "Ecommerce Business",
    description: "Online stores, catalogues, and checkout flows for retail brands.",
    projects: [],
  },
];

/** Flat list of all live projects — useful for counts and SEO. */
export const allProjects = workSections.flatMap((section) => section.projects);
