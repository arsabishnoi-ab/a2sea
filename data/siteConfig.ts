function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

/** Raw phone in international format, digits only — used for wa.me + tel: */
const PHONE_DIGITS = (process.env.NEXT_PUBLIC_PHONE?.trim() || "918310054529").replace(/[^\d]/g, "");
const PHONE_DISPLAY = "+91 83100 54529";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL?.trim() || "a2sea.in@gmail.com";

const WHATSAPP_MESSAGE =
  "Hi a2sea — I'd like to talk about building a website / system for my business.";

export const siteConfig = {
  url: getSiteUrl(),

  brandName: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "a2sea",

  brandTagline: "Built to Scale",

  brandLogoPath: "/brand/a2sea-lockup.png",

  ogImagePath: "/brand/a2sea-lockup.png",

  /** Full-bleed hero photography */
  heroBackgroundPath: "/hero/hero-cinematic.png",

  location: {
    city: "Bangalore",
    region: "Karnataka",
    country: "India",
    full: "Bangalore, Karnataka, India",
  },

  contact: {
    email: EMAIL,
    emailHref: `mailto:${EMAIL}`,
    phoneDisplay: PHONE_DISPLAY,
    phoneHref: `tel:+${PHONE_DIGITS}`,
    whatsappDisplay: PHONE_DISPLAY,
    whatsappHref: `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    /** Booking — defaults to WhatsApp until a Calendly/Cal.com link is set */
    bookingHref:
      process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ||
      `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
        "Hi a2sea — I'd like to book a quick call about my project.",
      )}`,
  },

  founder: {
    name: "Arvind Bishnoi",
    title: "Founder",
  },

  primaryCta: {
    label: "START A PROJECT",
    href: "#contact",
  },

  secondaryCta: {
    label: "VIEW WORK",
    href: "#work",
  },

  seo: {
    title:
      "a2sea — Websites, software & Google presence for hotels, cafés, shops & ecommerce",
    shortTitle: "Built to scale",
    description:
      "a2sea is a Bangalore web studio building premium, fast websites and software for hotels, cafés, restaurants, ecommerce and local shops — plus Google Business Profile setup, reviews and customer engagement, and custom tech of any kind. From pitch deck to production.",
    keywords: [
      "a2sea",
      "web developer Bangalore",
      "website designer Bangalore",
      "hotel website development",
      "hotel booking website",
      "restaurant website design",
      "cafe website",
      "coffee shop website",
      "ecommerce website developer",
      "small business website",
      "local shop web design",
      "google business profile setup",
      "google maps listing optimization",
      "local seo Bangalore",
      "online reviews management",
      "customer engagement tools",
      "custom software development",
      "business automation",
      "built to scale",
    ] as string[],
  },

  /** On-screen hero copy */
  hero: {
    badge: "Available for new projects",
    eyebrow: "WEBSITES · SOFTWARE · GOOGLE PRESENCE",
    headlinePrefix: "BUILT FOR",
    rotatingWords: ["HOTELS", "CAFÉS", "STORES", "BRANDS", "STARTUPS"],
    sub: "A Bangalore web studio building high-performance websites and software for hotels, cafés, shops and ecommerce — then making you findable on Google and loved by your customers. Built to scale.",
    chips: ["Custom-built", "SEO & Google Maps", "Booking & CRM", "Reviews & WhatsApp"],
  },

  stats: [
    { value: "17+", label: "Live builds" },
    { value: "6", label: "Sectors" },
    { value: "100%", label: "Custom" },
  ] as const,

  nav: [
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "PROCESS", href: "#process" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ] as const,
};
