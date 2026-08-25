import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { businessVerticals } from "@/data/businessVerticals";
import { siteConfig } from "@/data/siteConfig";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap",
});

const verticalKeywords = businessVerticals.flatMap((v) => v.seoKeywords);
const allKeywords = [...new Set([...siteConfig.seo.keywords, ...verticalKeywords])];

const metadataBase = new URL(siteConfig.url);
const brandTitle = siteConfig.brandName.replace(/\.$/, "");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${brandTitle} · ${siteConfig.seo.shortTitle}`,
    template: `%s · ${brandTitle}`,
  },
  description: siteConfig.seo.description,
  keywords: allKeywords,
  authors: [{ name: brandTitle }],
  creator: brandTitle,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: brandTitle,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1920,
        height: 1080,
        alt: `${brandTitle} — websites, software & Google presence for hotels, cafés, shops & ecommerce`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.ogImagePath],
  },
  icons: {
    icon: [
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
