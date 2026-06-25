import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/businessVerticals";

function jsonLdGraph() {
  const { url, brandName, seo, ogImagePath, location, contact } = siteConfig;
  const name = brandName.replace(/\.$/, "");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name,
        description: seo.description,
        inLanguage: "en",
        publisher: { "@id": `${url}/#business` },
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${url}/#business`,
        name,
        description: seo.description,
        url,
        email: contact.email,
        telephone: contact.phoneDisplay,
        image: `${url}${ogImagePath}`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.region,
          addressCountry: "IN",
        },
        areaServed: [location.city, "India", "Worldwide"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: contact.phoneDisplay,
          email: contact.email,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["en", "hi", "kn"],
        },
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.summary },
        })),
      },
    ],
  };
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }}
    />
  );
}
