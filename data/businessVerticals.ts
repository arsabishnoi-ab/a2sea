export type Service = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  points: string[];
  /** lucide-style icon key, mapped in the Services component */
  icon:
    | "globe"
    | "hotel"
    | "coffee"
    | "cart"
    | "store"
    | "map"
    | "stars"
    | "code";
  /** Larger card in the bento grid */
  featured?: boolean;
  seoKeywords: string[];
};

export const services: Service[] = [
  {
    slug: "websites-web-apps",
    title: "Websites & web apps",
    tagline: "Fast, modern, built to convert",
    summary:
      "High-performance sites and web apps engineered from scratch — no bloated templates. Designed to load instantly, rank well, and turn visitors into customers.",
    points: ["Custom design", "SEO-ready", "Lightning fast", "Mobile-first"],
    icon: "globe",
    featured: true,
    seoKeywords: [
      "web developer Bangalore",
      "custom website development",
      "business website design",
      "next.js developer",
    ],
  },
  {
    slug: "hotels-hospitality",
    title: "Hotels & hospitality",
    tagline: "Booking engines & guest CRM",
    summary:
      "Full property sites with direct-booking flows that beat OTA pricing, plus guest CRM your team can actually run.",
    points: ["Direct booking", "Beat OTA prices", "Guest CRM"],
    icon: "hotel",
    seoKeywords: [
      "hotel website developer",
      "hotel booking website",
      "hospitality CRM",
      "direct booking engine",
    ],
  },
  {
    slug: "cafes-restaurants",
    title: "Cafés & restaurants",
    tagline: "Menus, ritual & retail",
    summary:
      "Editorial, fast café and restaurant sites — hours, menus, and online ordering designed like your counter.",
    points: ["Digital menus", "Online orders", "Brand-led"],
    icon: "coffee",
    seoKeywords: [
      "restaurant website design",
      "cafe website developer",
      "coffee shop website design",
    ],
  },
  {
    slug: "ecommerce",
    title: "Ecommerce",
    tagline: "Stores that convert",
    summary:
      "Product-led storefronts with clean merchandising, fast checkout, and performance tuned to how you sell.",
    points: ["Smooth checkout", "Payments", "Inventory"],
    icon: "cart",
    seoKeywords: [
      "ecommerce developer",
      "custom ecommerce website",
      "online store development",
    ],
  },
  {
    slug: "local-shops-brands",
    title: "Local shops & brands",
    tagline: "Identity-led presence",
    summary:
      "Polished sites for small and mid-scale retailers who need credibility, discoverability, and a clear brand story.",
    points: ["Brand identity", "Credibility", "Discoverable"],
    icon: "store",
    seoKeywords: [
      "small business website developer",
      "local shop website",
      "brand identity website",
    ],
  },
  {
    slug: "google-business-profile",
    title: "Google Business Profile & Maps",
    tagline: "Get found locally",
    summary:
      "We set up and optimise your Google Business Profile so you show up on Maps and local search — accurate listings, photos, hours, and posts that bring walk-ins and calls.",
    points: ["Profile setup", "Maps ranking", "Local SEO"],
    icon: "map",
    featured: true,
    seoKeywords: [
      "google business profile setup",
      "google maps listing optimization",
      "local seo Bangalore",
      "google my business",
    ],
  },
  {
    slug: "reviews-engagement",
    title: "Reviews & customer engagement",
    tagline: "Reputation that sells",
    summary:
      "Tools and flows to collect more 5-star reviews, reply faster, and keep customers coming back — WhatsApp, email, and review funnels wired in.",
    points: ["More reviews", "Faster replies", "Repeat customers"],
    icon: "stars",
    seoKeywords: [
      "online reviews management",
      "customer engagement tools",
      "reputation management",
      "whatsapp business automation",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom software & automation",
    tagline: "Any tech, built right",
    summary:
      "Dashboards, internal tools, integrations, automations, bots — if it's tech and it'll move your business forward, we build it.",
    points: ["Dashboards", "Integrations", "Automation"],
    icon: "code",
    seoKeywords: [
      "custom software development",
      "business automation",
      "internal tools development",
      "api integration",
    ],
  },
];

/** Back-compat alias */
export const businessVerticals = services;
